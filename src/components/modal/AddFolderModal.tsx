import { FavoriteRecipe, addFavoriteRecipeFolder, addRecipeToFolder, removeRecipeFromFolder, setAddedRecipeInfo, setFavoriteRecipe, setRecipeAddModal, setRecipeMoveModal } from '@/redux/features/favoriteRecipeSlice';
import { RootState } from '@/redux/store';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import RecipeThumbnail from '../favoriteRecipe/RecipeThumbnail';
import sendNewFolder from '@/utils/sendNewFolder';
import axios from 'axios';
import sendNewRecipe from '@/utils/sendNewRecipe';
import recipeDeleteRequest from '@/utils/recipeDeleteRequest';

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
            if (user && user.email) {
                const response = await axios.post('/api/reciveFavRecipes', {
                    email: user.email,
                });

                const favRecipeFromStore: FavoriteRecipe[] = response.data.favoriteRecipe;
                dispatch(setFavoriteRecipe(favRecipeFromStore));
            }
        })();
    }, [user]);

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
    const moveRecipeToAnotherFolder = async (newFolderId: number) => {
        const isDuplicated = isDuplicatedRecipe(newFolderId);
        if (!isDuplicated) {
            // 레시피를 추가한 이전 폴더에서 레시피를 삭제하는 요청 전송
            await recipeDeleteRequest(user.email, addedRecipeInfo.folderId, recipe);
            // 레시피를 state에서 삭제
            dispatch(removeRecipeFromFolder({
                forderId: addedRecipeInfo.folderId,
                recipeNum: recipe.RCP_SEQ,
            }));

            // 레시피 추가를 요청 
            await sendNewRecipe(user.email, newFolderId, recipe);
            // 이동시킬 폴더에 레시피를 추가
            dispatch(addRecipeToFolder({
                folderId: newFolderId,
                recipe: recipe
            }))

            // 레시피 위치 변경 모달을 닫음
            dispatch(setRecipeMoveModal(false));
        }
        else {
            setIsRecipeDuplicated({
                folderId: newFolderId,
                duplicated: true,
            });
        }
    }

    // 레시피를 폴더에 추가하고 모달을 닫음
    const addFavoriteRecipe = async (id: number, folderName: string) => {
        const isDuplicated = isDuplicatedRecipe(id);

        if (!isDuplicated) {
            // 레시피 추가를 요청 
            await sendNewRecipe(user.email, id, recipe);
            // 이동시킬 폴더에 레시피를 추가
            dispatch(addRecipeToFolder({
                folderId: id,
                recipe: recipe
            }));

            // 추가한 레시피의 상세 정보를 업데이트(팝업을 띄우기 위해)
            dispatch(setAddedRecipeInfo({
                folderId: id,
                imgString: recipe.ATT_FILE_NO_MAIN,
                folderName: folderName,
            }));

            // 중복값 없이 레시피가 추가되었으므로 중복 제거
            setIsRecipeDuplicated({
                folderId: id,
                duplicated: false,
            });
            // 레시피를 추가하는 모달을 닫음
            dispatch(setRecipeAddModal(false));
        }
        else {
            setIsRecipeDuplicated({
                folderId: id,
                duplicated: true,
            });
        }
    }

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false); // 현재 새 폴더를 추가중인지
    const [newFolderName, setNewFolderName] = useState<string>(''); // 새 폴더의 이름
    const nameRef = useRef<HTMLInputElement>(null);

    // 새 폴더의 이름을 변경
    const newFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value);
    }

    // 새 폴더의 이름을 state에 push
    const newFolderSave = (e: { key: string; }) => {
        // 이름을 입력하고 엔터키를 누른 경우, 폴더가 추가됨
        if (e.key === 'Enter') {
            if (newFolderName.trim() !== '') {
                dispatch(addFavoriteRecipeFolder({ folderName: newFolderName, recipes: [] }));
                setNewFolderName('');
                setIsAddFolder(false);

                // ex)현재 배열에 요소가 2개 있다면 다음 id는 3, 0개 있다면 다음 id는 1
                const nextFolderId = favoriteRecipe.length > 0 ? favoriteRecipe[favoriteRecipe.length - 1].folderId + 1 : 1;
                // DB에 새로운 폴더를 추가
                sendNewFolder(user.email, nextFolderId, newFolderName, []);
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
    }, [isAddFolder])

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
                }}
            >
                <div className="pop-up-container">
                    <div className='pop-up-title-section'>
                        <div className='pop-up-title'>폴더에 레시피를 저장</div>
                        <svg id="close-svg" onClick={(event) => {
                            event.stopPropagation();
                            setIsModalOpen(false)
                        }} xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" fill="white" />
                            <path d="M7 17L16.8995 7.10051" stroke="#111111" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7 7.00001L16.8995 16.8995" stroke="#111111" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className='pop-up-folder-list'>
                        <div className='title-all-folder'>모든 폴더</div>
                        {
                            favoriteRecipe.map((item) => {
                                return (
                                    <>
                                        <div
                                            className='folder-section'
                                            id={(isRecipeDuplicated.folderId === item.folderId && isRecipeDuplicated.duplicated) ?
                                                'duplicated-border' :
                                                ''}
                                            onClick={() => {
                                                isMoving ?
                                                    moveRecipeToAnotherFolder(item.folderId) :
                                                    addFavoriteRecipe(item.folderId, item.folderName)
                                            }}
                                            key={item.folderId}>
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
                                            (isRecipeDuplicated.folderId === item.folderId
                                                && isRecipeDuplicated.duplicated) &&
                                            <div className='duplicated-recipe'>폴더 내에 이미 동일한 레시피가 존재합니다</div>
                                        }
                                    </>
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
                                        placeholder="폴더의 이름을 정해주세요!"
                                    />
                                </div>
                            </div>
                        }
                        <div
                            className='dotted-folder'
                            onClick={addNewFolder}>
                            <svg className='plus' xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" fill="white" />
                                <path d="M12 6V18" stroke="#949A9F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 12H18" stroke="#949A9F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
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
                    {/* padding-top: 22px;
                    border-top: 1px solid #dbdbdb; */}
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
                {/* .pop-up-footer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    border-top: 1px solid rgb(232, 232, 232);
                }
                .close-btn {
                    width: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 5px;
                    margin-right: 0px;
                    padding: 12px 0px;
                } */}
            `}</style>
        </>
    )
}