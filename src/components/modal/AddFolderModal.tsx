import { FavoriteRecipe, addFavoriteRecipeFolder, addRecipeToFolder, removeRecipeFromFolder, setAddedRecipeInfo, setFavoriteRecipe, setRecipeAddModal, setRecipeMoveModal } from '@/redux/features/favoriteRecipeSlice';
import { RootState } from '@/redux/store';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import RecipeThumbnail from '../favoriteRecipe/RecipeThumbnail';
import sendNewFolder from '@/utils/fetch/sendNewFolder';
import sendNewRecipe from '@/utils/fetch/sendNewRecipe';
import recipeDeleteRequest from '@/utils/fetch/recipeDeleteRequest';
import React from 'react';
import NProgress from "nprogress";
import requestFavRecipes from '@/utils/fetch/requestFavRecipes';
import { debounce } from 'lodash';
import Loading from '../Loading';

interface modalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isMoving?: boolean,
}

export default function AddFolderModal({ isModalOpen, setIsModalOpen, isMoving }: modalProps) {
    const dispatch = useDispatch();

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);
    const user = useSelector((state: RootState) => state.user);
    const recipe = useSelector((state: RootState) => state.recipe);

    // 컴포넌트가 마운트되기 전, DB로부터 사용자의 관심 레시피 정보를 받아옴
    useEffect(() => {
        (async () => {
            const favRecipeFromStore = await requestFavRecipes(user);
            dispatch(setFavoriteRecipe(favRecipeFromStore));
        })();
    }, [user, dispatch]);

    // 폴더 내에 동일한 레시피가 존재하는지 판별
    const isDuplicatedRecipe = (id: number) => {
        const targetFolder = favoriteRecipe.find(folder => folder.folderId === id);
        const targetRecipe = targetFolder?.recipes.find(item => item.RCP_SEQ === recipe.RCP_SEQ);

        // 폴더 내에 중복된 레시피가 없는 경우
        if (targetRecipe === undefined) {
            return false;
        }
        // 중복된 레시피가 있는 경우
        else {
            return true;
        }
    }

    // N번 폴더에 이미 레시피가 존재하는지 여부
    const [isRecipeDuplicated, setIsRecipeDuplicated] = useState({
        folderId: 0,
        duplicated: false,
    });

    const addedRecipeInfo = useSelector((state: RootState) => state.addedRecipeInfo);

    // 레시피를 다른 폴더로 이동시킴
    // 300ms의 디바운싱을 적용하여 중복 실행 방지
    const moveRecipeToAnotherFolder = debounce(async (newFolderId: number) => {
        const isDuplicated = isDuplicatedRecipe(newFolderId);
        if (!isDuplicated) {
            try {
                setIsLoading(true);

                // 레시피를 추가한 이전 폴더에서 레시피를 삭제하는 요청 전송
                await recipeDeleteRequest(user.email, addedRecipeInfo.folderId, recipe);

                // 레시피 추가를 요청 
                const response = await sendNewRecipe(user.email, newFolderId, recipe);
                const favRecipeFromStore = response.data.favoriteRecipe;
                dispatch(setFavoriteRecipe(favRecipeFromStore));

                NProgress.done();

                // 레시피 위치 변경 모달을 닫음
                dispatch(setRecipeMoveModal(false));
            } catch (error) {
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
        else {
            setIsRecipeDuplicated({
                folderId: newFolderId,
                duplicated: true,
            });
        }
    }, 300);

    // 레시피를 폴더에 추가하고 모달을 닫음
    // 300ms의 디바운싱을 적용하여 중복 실행 방지
    const addFavoriteRecipe = debounce(async (id: number, folderName: string) => {
        const isDuplicated = isDuplicatedRecipe(id);

        if (!isDuplicated) {
            try {
                setIsLoading(true);

                // 레시피 추가를 요청 
                const response = await sendNewRecipe(user.email, id, recipe);
                const favRecipeFromStore = response.data.favoriteRecipe;
                dispatch(setFavoriteRecipe(favRecipeFromStore));

                // 추가한 레시피의 상세 정보를 업데이트(팝업을 띄우기 위해)
                dispatch(setAddedRecipeInfo({
                    folderId: id,
                    ATT_FILE_NO_MK: recipe.ATT_FILE_NO_MK,
                    ATT_FILE_NO_MAIN: recipe.ATT_FILE_NO_MAIN,
                    folderName: folderName,
                }));

                // 중복값 없이 레시피가 추가되었으므로 중복 제거
                setIsRecipeDuplicated({
                    folderId: id,
                    duplicated: false,
                });

                // 레시피를 추가하는 모달을 닫음
                dispatch(setRecipeAddModal(false));
            } catch (error) {
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
        else {
            setIsRecipeDuplicated({
                folderId: id,
                duplicated: true,
            });
        }
    }, 300);

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false); // 현재 새 폴더를 추가중인지
    const [newFolderName, setNewFolderName] = useState<string>(''); // 새 폴더의 이름
    const nameRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 새 폴더의 이름을 변경
    const newFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value);
    }

    // 새 폴더의 이름을 state에 push
    const newFolderSave = async (e: { key: string; }) => {
        // 이름을 입력하고 엔터키를 누른 경우, 폴더가 추가됨
        if (e.key === 'Enter') {
            if (newFolderName.trim() !== '') {
                try {
                    setIsLoading(true);

                    // ex)현재 배열에 요소가 2개 있다면 다음 id는 3, 0개 있다면 다음 id는 1
                    const nextFolderId = favoriteRecipe.length > 0 ? favoriteRecipe[favoriteRecipe.length - 1].folderId + 1 : 1;
                    // DB에 새로운 폴더를 추가
                    await sendNewFolder(user.email, nextFolderId, newFolderName, []);
                    // 폴더를 추가했으니 관심 레시피 정보를 새로 받음
                    const favRecipeFromStore = await requestFavRecipes(user);
                    dispatch(setFavoriteRecipe(favRecipeFromStore));

                    setNewFolderName('');
                    setIsAddFolder(false);

                    setIsLoading(false);
                } catch (error) {
                    throw error;
                }
            }
        }
        // ESC 키를 누를 경우, 폴더 추가 작업이 취소
        else if (e.key === 'Escape') {
            setIsAddFolder(false);
            setNewFolderName('');
        }
    }

    // 포커스를 input 밖으로 두면 폴더 추가 작업 취소
    const newFolderBlur = () => {
        setIsAddFolder(false);
        setNewFolderName('');
    }

    // 폴더 추가 작업을 시작
    const addNewFolder = () => {
        setIsAddFolder(true);
    }

    // 폴더 추가 작업이 실행되면, 입력 포커스를 새 폴더의 input으로 이동
    useEffect(() => {
        if (isAddFolder && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isAddFolder]);

    // 모달을 닫으면서 중복 여부는 초기 상태로 되돌림
    const closeModal = () => {
        setIsModalOpen(false);
        setIsRecipeDuplicated({
            ...isRecipeDuplicated,
            duplicated: false,
        });
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        position: 'absolute',
                        left: '50%',
                        top: '48%',
                        width: 350,
                        height: 600,
                        transform: 'translate(-50%, -50%)',
                    }
                }}>
                {
                    isLoading &&
                    <Loading />
                }
                <div className="pop-up-container">
                    <div className='pop-up-title-section'>
                        <div className='pop-up-title'>폴더에 레시피를 저장</div>
                        <svg id="close-svg" onClick={(event) => {
                            event.stopPropagation();
                            closeModal();
                        }} xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" fill="white" />
                            <path d="M7 17L16.8995 7.10051" stroke="#111111" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 7.00001L16.8995 16.8995" stroke="#111111" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className='pop-up-folder-list'>
                        <div className='title-all-folder'>모든 폴더</div>
                        {
                            favoriteRecipe.map((item) => {
                                return (
                                    <React.Fragment key={item.folderId}>
                                        <div
                                            className='folder-section'
                                            id={(isRecipeDuplicated.folderId === item.folderId &&
                                                isRecipeDuplicated.duplicated) ?
                                                'duplicated-border' :
                                                ''}
                                            onClick={() => {
                                                isMoving ?
                                                    moveRecipeToAnotherFolder(item.folderId) :
                                                    addFavoriteRecipe(item.folderId, item.folderName);
                                            }}>
                                            <div className='folder-thumbnail'>
                                                <RecipeThumbnail
                                                    recipes={item.recipes}
                                                    size={44}
                                                />
                                            </div>
                                            <div className='folder-title-section'>
                                                <div className='folder-title'>
                                                    {item.folderName}
                                                </div>
                                                <div className='folder-subtitle'>
                                                    {Array.isArray(item.recipes) && item.recipes.length}개의 항목
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            (isRecipeDuplicated.folderId === item.folderId &&
                                                isRecipeDuplicated.duplicated) &&
                                            <div className='duplicated-recipe'>폴더 내에 이미 동일한 레시피가 존재합니다</div>
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                        {
                            // 폴더를 추가하려는 상태일 때만 보이도록 함
                            isAddFolder &&
                            <div className='folder-section'>
                                <div className='folder-thumbnail'></div>
                                <div className='folder-title-section'>
                                    <input
                                        className="new-folder-input"
                                        type="text"
                                        ref={nameRef}
                                        value={newFolderName}
                                        onChange={newFolderNameChange}
                                        onKeyDown={newFolderSave}
                                        onBlur={newFolderBlur}
                                        placeholder="폴더명을 정해주세요!"
                                    />
                                </div>
                            </div>
                        }
                        <div
                            className='dotted-folder'
                            onClick={addNewFolder}>
                            <svg className='plus' xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" fill="white" />
                                <path d="M12 6V18" stroke="#949A9F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 12H18" stroke="#949A9F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>새 폴더 만들기</div>
                        </div>
                    </div>
                </div>
            </Modal >
            <style jsx>{`
                .pop-up-container {
                    margin: 17px 15px;
                }
                .pop-up-title-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                .pop-up-title {
                    font-size: 22px;
                    font-weight: 400;
                }
                #close-svg {
                    position: relative;
                    left: 15px;
                    bottom: 3px;
                    cursor: pointer;
                }
                .title-all-folder {
                    font-size: 14.5px;
                    margin-bottom: 15px;
                }
                .pop-up-folder-list {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-top: 30px;
                }
                .folder-section {
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;
                    margin-bottom: 15px;
                    align-items: center;
                    width: 100%;
                    border: 1px solid #f4f5f6;
                    padding: 10px 0px 10px 15px;
                    border-radius: 10px;
                    margin-left: -4px;
                    transition: border-color 0.2s ease;
                }
                .folder-section:hover {
                    border-color: rgb(130, 130, 130);
                }
                .folder-section:last-of-type {
                    margin-bottom: 0px;
                }
                #duplicated-border {
                    border: 1px solid #ff0000;
                }
                .folder-title-section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    font-size: 14px;
                    margin-left: 16px;
                }
                .new-folder-input {
                    outline: none;
                    font-size: 14.5px;
                    border: 1px solid transparent;
                }
                .folder-thumbnail {
                    width: 44px;
                    height: 44px;
                    background-color: #f4f5f6;
                    border: 1px solid transparent;
                    border-radius: 3px;
                }
                .folder-subtitle {
                    color: #949A9F;
                    font-weight: 300;
                }
                .duplicated-recipe {
                    margin-top: -9px;
                    margin-bottom: 13px;
                    font-size: 12.5px;
                    color: #FF0000;
                }
                .dotted-folder {
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;
                    align-items: center;
                    width: 100%;
                    padding: 17px 0px 17px 15px;
                    border-radius: 10px;
                    margin-left: -4px;
                    transition: border-color 0.2s ease;
                    border: 1px dotted #d7d7d7;
                    color: #949A9F;
                    justify-content: center;
                    font-size: 15px;
                    cursor: pointer;
                }
                .dotted-folder:hover {
                    border-color: rgb(97, 97, 97);
                }
                .dotted-folder div {
                    margin-left: 4px;
                    margin-right: 20px;
                }
                .plus {
                    position: relative;
                    top: 1px;
                }
            `}</style>
        </>
    )
}