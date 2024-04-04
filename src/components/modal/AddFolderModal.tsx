import { addRecipeToFolder } from '@/redux/features/favoriteRecipeSlice';
import { RootState } from '@/redux/store';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

interface modalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function AddFolderModal({ isModalOpen, setIsModalOpen }: modalProps) {
    const dispatch = useDispatch();

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);
    const recipe = useSelector((state: RootState) => state.recipe);

    const addFavoriteRecipe = async (id: number) => {
        await dispatch(addRecipeToFolder({ id, recipe }));
        setIsModalOpen(false);
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
                                        onClick={() => addFavoriteRecipe(item.id)}
                                        key={item.id}
                                    >
                                        <div className='folder-thumbnail'></div>
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
                    margin-bottom: 12px;
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