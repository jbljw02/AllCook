import { addFavoriteRecipeFolder, addRecipeToFolder, removeRecipeFromFolder, setAddedRecipeInfo, setRecipeMoveModal } from '@/redux/features/favoriteRecipeSlice';
import { RootState } from '@/redux/store';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import RecipeThumbnail from '../favoriteRecipe/RecipeThumbnail';

interface modalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isMoving?: boolean,
    prevFolderId?: number,
}

export default function AddFolderModal({ isModalOpen, setIsModalOpen, isMoving, prevFolderId }: modalProps) {
    const dispatch = useDispatch();

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);
    const recipe = useSelector((state: RootState) => state.recipe);
    const recipeMoveModal = useSelector((state: RootState) => state.recipeMoveModal);
    console.log("모달 : ", recipeMoveModal);

    // 레시피를 다른 폴더로 이동시킴
    const moveRecipeToAnotherFolder = async (newFolderId: number) => {
        // 레시피를 추가한 이전 폴더에서 레시피를 삭제
        await dispatch(removeRecipeFromFolder({
            forderId: prevFolderId,
            recipeNum: recipe.RCP_SEQ,
        }))
        // 이동시킬 폴더에 레시피를 추가
        await dispatch(addRecipeToFolder({
            folderId: newFolderId,
            recipe: recipe
        }))
        dispatch(setRecipeMoveModal(false));
    }

    // 레시피를 폴더에 추가하고 모달을 닫음
    const addFavoriteRecipe = async (id: number, folderName: string) => {
        await dispatch(addRecipeToFolder({
            folderId: id,
            recipe: recipe
        }));
        // 추가한 레시피의 상세 정보를 업데이트(팝업을 띄우기 위해)
        await dispatch(setAddedRecipeInfo({
            folderId: id,
            imgString: recipe.ATT_FILE_NO_MAIN,
            folderName: folderName,
        }))
        setIsModalOpen(false);
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
        if (e.key == 'Enter') {
            if (newFolderName.trim() !== '') {
                dispatch(addFavoriteRecipeFolder({ name: newFolderName, recipes: [] }));
                setNewFolderName('');
                setIsAddFolder(false);
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
                                    <div
                                        className='folder-section'
                                        onClick={() => {
                                            isMoving ?
                                                moveRecipeToAnotherFolder(item.folderId) :
                                                addFavoriteRecipe(item.folderId, item.name)
                                        }}
                                        key={item.folderId}>
                                        <div className='folder-thumbnail'>
                                            <RecipeThumbnail recipes={item.recipes} />
                                        </div>
                                        <div className='folder-title-section'>
                                            <div className='folder-title'>
                                                {item.name}
                                            </div>
                                            <div className='folder-subtitle'>
                                                {
                                                    Array.isArray(item.recipes) &&
                                                    item.recipes.length
                                                }
                                                개의 항목
                                            </div>
                                        </div>
                                    </div>
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
                            className='folder-section dotted-folder'
                            onClick={addNewFolder}>
                            <svg className='plus' xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" fill="white" />
                                <path d="M12 6V18" stroke="#949A9F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 12H18" stroke="#949A9F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div>새 폴더 만들기</div>
                        </div>
                    </div>
                    {/* <div className='pop-up-footer'>
                        <div
                            className="close-btn"
                            onClick={() => setIsModalOpen(false)}>닫기</div>
                    </div> */}
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
                .folder-section:last-child {
                    margin-bottom: 0px;
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
                .dotted-folder {
                    border: 1px dotted #d7d7d7;
                    color: #949A9F;
                    justify-content: center;
                    font-size: 15px;
                    padding-top: 17px;
                    padding-bottom: 17px;
                    cursor: pointer;
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