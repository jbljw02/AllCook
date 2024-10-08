import { FavoriteRecipe, removeFolder, removeRecipeFromFolder, resetIsCheckedFolder, resetIsCheckedRecipe, setFavoriteRecipe, setIsCheckedFolder, setIsCheckedRecipe, setIsFavFolderDelete, setIsFavRecipeDelete, setSelectedFolder } from "@/redux/features/favoriteRecipeSlice";
import { RootState } from "@/redux/store";
import folderDeleteRequest from "@/utils/fetch/folderDeleteRequest";
import recipeDeleteRequest from "@/utils/fetch/recipeDeleteRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import NProgress from "nprogress";
import requestFavRecipes from "@/utils/fetch/requestFavRecipes";

export default function ModifyNav({ category }: { category: string }) {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);

    const isFavRecipeDelete = useSelector((state: RootState) => state.isFavRecipeDelete);
    const selectedFolder = useSelector((state: RootState) => state.selectedFolder);
    const isCheckedRecipe = useSelector((state: RootState) => state.isCheckedRecipe);

    const isFavFolderDelete = useSelector((state: RootState) => state.isFavFolderDelete);
    const isCheckedFolder = useSelector((state: RootState) => state.isCheckedFolder);

    // 전체 선택 여부
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const startDeleteWork = () => {
        if (category === 'recipe') {
            dispatch(setIsFavRecipeDelete(true));
        }
        if (category === 'folder') {
            dispatch(setIsFavFolderDelete(true));
        }
    }

    // 폴더 내에 있는 레시피 전체 체크
    const checkAllRecipe = () => {
        setIsChecked(!isChecked);

        if (category === 'recipe') {
            // RCP_SEQ에 해당하는 값들만 빼서 배열로 만듦
            const allCheckedIndex = selectedFolder.recipes.map(item => item.RCP_SEQ);

            // 만든 배열을 요소 모두 dispatch
            allCheckedIndex.map(item => {
                dispatch(setIsCheckedRecipe(item));
            });
        }
        if (category === 'folder') {
            // 폴더 ID를 추출해서 배열로 만듦(0번 폴더 제외)
            const allCheckedIndex = favoriteRecipe
                .filter(item => item.folderId !== 0)
                .map(item => item.folderId);

            // 폴더 ID를 모두 dispatch
            allCheckedIndex.map(item => {
                dispatch(setIsCheckedFolder(item));
            });
        }
    }

    const deleteFavRecipe = async () => {
        if (category === 'recipe') {
            try {
                NProgress.start();
                // 레시피 삭제 요청 전송
                await recipeDeleteRequest(user.email, selectedFolder.folderId, isCheckedRecipe);
                dispatch(removeRecipeFromFolder({ folderId: selectedFolder.folderId, recipeNums: isCheckedRecipe }));

                cancelDelete();

                NProgress.done();
            } catch (error) {
                throw error;
            } finally {
                NProgress.done();
            }

        }
        if (category === 'folder') {
            try {
                NProgress.start();

                // 폴더 삭제 요청 전송
                await folderDeleteRequest(user.email, isCheckedFolder);
                dispatch(removeFolder(isCheckedFolder));

                cancelDelete();

                NProgress.done();
            } catch (error) {
                throw error;
            } finally {
                NProgress.done();
            }

        }
    }

    // 레시피 삭제 작업을 취소
    const cancelDelete = () => {
        if (category === 'recipe') {
            dispatch(setIsFavRecipeDelete(false));
            dispatch(resetIsCheckedRecipe());
            setIsChecked(false);
        }
        if (category === 'folder') {
            dispatch(setIsFavFolderDelete(false));
            dispatch(resetIsCheckedFolder());
            setIsChecked(false);
        }
    }

    // 컴포넌트가 마운트 될 때, 삭제 작업을 초기화
    useEffect(() => {
        if (isFavRecipeDelete === true) {
            dispatch(setIsFavRecipeDelete(false));
            dispatch(setIsFavFolderDelete(false));
        }
    }, []);

    return (
        <>
            <div className="modify-container">
                <label
                    className="cursor-pointer no-drag"
                    style={{
                        visibility: category === 'recipe' ?
                            (!isFavRecipeDelete ? 'hidden' : undefined) :
                            !isFavFolderDelete ? 'hidden' : undefined
                    }}>
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        checked={isChecked}
                        onChange={checkAllRecipe} />
                    전체선택
                </label>
                {
                    category === 'recipe' ?
                        (
                            !isFavRecipeDelete ?
                                <div
                                    className="toggle-div cursor-pointer"
                                    onClick={startDeleteWork}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none">
                                        <path d="M11.0189 17H3L2.88338 17.0067C2.38604 17.0645 2 17.4872 2 18C2 18.5523 2.44772 19 3 19H11.1739C11.0602 18.5185 11 18.0163 11 17.5C11 17.3318 11.0064 17.165 11.0189 17Z" fill="#212121" />
                                        <path d="M11.4982 15H3C2.44772 15 2 14.5523 2 14C2 13.4872 2.38604 13.0645 2.88338 13.0067L3 13H12.8096C12.2573 13.5755 11.8099 14.2524 11.4982 15Z" fill="#212121" />
                                        <path d="M3 11C2.44772 11 2 10.5523 2 10C2 9.48716 2.38604 9.06449 2.88338 9.00673L3 9H21C21.5523 9 22 9.44772 22 10C22 10.5128 21.614 10.9355 21.1166 10.9933L21 11H3Z" fill="#212121" />
                                        <path d="M21 5H3L2.88338 5.00673C2.38604 5.06449 2 5.48716 2 6C2 6.55228 2.44772 7 3 7H21L21.1166 6.99327C21.614 6.93551 22 6.51284 22 6C22 5.44772 21.5523 5 21 5Z" fill="#212121" />
                                        <path d="M17.4998 12C17.7929 12 18.0804 12.0245 18.3606 12.0717L18.5339 12.7878C18.7929 13.8616 19.8733 14.5221 20.9471 14.2631L21.0449 14.2369L21.646 14.058C22.0086 14.525 22.299 15.0546 22.4997 15.6285L22.0524 16.0588C21.2984 16.7844 21.2368 17.9589 21.8836 18.7573L22.0249 18.9142L22.4997 19.3715C22.2991 19.945 22.009 20.4742 21.6468 20.941L21.0449 20.7631C19.9856 20.4501 18.8731 21.0551 18.5602 22.1144L18.5339 22.2122L18.3606 22.9282C18.0804 22.9755 17.7929 23 17.4998 23C17.2064 23 16.9186 22.9754 16.6381 22.9281L16.4657 22.2122C16.2067 21.1384 15.1263 20.4779 14.0525 20.7369L13.9548 20.7631L13.3529 20.941C12.9907 20.4742 12.7006 19.945 12.5 19.3715L12.9472 18.9412C13.7432 18.1753 13.7676 16.9092 13.0017 16.1133L12.9472 16.0588L12.5 15.6285C12.7006 15.055 12.9907 14.5258 13.3529 14.059L13.9548 14.2369C15.0141 14.5499 16.1265 13.9449 16.4395 12.8856L16.4657 12.7878L16.6381 12.0719C16.9186 12.0246 17.2064 12 17.4998 12ZM17.4998 16C16.6992 16 16.0502 16.6716 16.0502 17.5C16.0502 18.3284 16.6992 19 17.4998 19C18.3005 19 18.9495 18.3284 18.9495 17.5C18.9495 16.6716 18.3005 16 17.4998 16Z" fill="#212121" />
                                    </svg>
                                    <div className="modify-text no-drag">
                                        편집
                                    </div>
                                </div> :
                                <div className="is-delete-div">
                                    <div
                                        className="delete-text cursor-pointer no-drag"
                                        onClick={deleteFavRecipe}>
                                        삭제
                                    </div>
                                    <div
                                        className="cancel-text cursor-pointer"
                                        onClick={cancelDelete}>
                                        취소
                                    </div>
                                </div>
                        ) :
                        (
                            !isFavFolderDelete ?
                                <div
                                    className="toggle-div cursor-pointer"
                                    onClick={startDeleteWork}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none">
                                        <path d="M11.0189 17H3L2.88338 17.0067C2.38604 17.0645 2 17.4872 2 18C2 18.5523 2.44772 19 3 19H11.1739C11.0602 18.5185 11 18.0163 11 17.5C11 17.3318 11.0064 17.165 11.0189 17Z" fill="#212121" />
                                        <path d="M11.4982 15H3C2.44772 15 2 14.5523 2 14C2 13.4872 2.38604 13.0645 2.88338 13.0067L3 13H12.8096C12.2573 13.5755 11.8099 14.2524 11.4982 15Z" fill="#212121" />
                                        <path d="M3 11C2.44772 11 2 10.5523 2 10C2 9.48716 2.38604 9.06449 2.88338 9.00673L3 9H21C21.5523 9 22 9.44772 22 10C22 10.5128 21.614 10.9355 21.1166 10.9933L21 11H3Z" fill="#212121" />
                                        <path d="M21 5H3L2.88338 5.00673C2.38604 5.06449 2 5.48716 2 6C2 6.55228 2.44772 7 3 7H21L21.1166 6.99327C21.614 6.93551 22 6.51284 22 6C22 5.44772 21.5523 5 21 5Z" fill="#212121" />
                                        <path d="M17.4998 12C17.7929 12 18.0804 12.0245 18.3606 12.0717L18.5339 12.7878C18.7929 13.8616 19.8733 14.5221 20.9471 14.2631L21.0449 14.2369L21.646 14.058C22.0086 14.525 22.299 15.0546 22.4997 15.6285L22.0524 16.0588C21.2984 16.7844 21.2368 17.9589 21.8836 18.7573L22.0249 18.9142L22.4997 19.3715C22.2991 19.945 22.009 20.4742 21.6468 20.941L21.0449 20.7631C19.9856 20.4501 18.8731 21.0551 18.5602 22.1144L18.5339 22.2122L18.3606 22.9282C18.0804 22.9755 17.7929 23 17.4998 23C17.2064 23 16.9186 22.9754 16.6381 22.9281L16.4657 22.2122C16.2067 21.1384 15.1263 20.4779 14.0525 20.7369L13.9548 20.7631L13.3529 20.941C12.9907 20.4742 12.7006 19.945 12.5 19.3715L12.9472 18.9412C13.7432 18.1753 13.7676 16.9092 13.0017 16.1133L12.9472 16.0588L12.5 15.6285C12.7006 15.055 12.9907 14.5258 13.3529 14.059L13.9548 14.2369C15.0141 14.5499 16.1265 13.9449 16.4395 12.8856L16.4657 12.7878L16.6381 12.0719C16.9186 12.0246 17.2064 12 17.4998 12ZM17.4998 16C16.6992 16 16.0502 16.6716 16.0502 17.5C16.0502 18.3284 16.6992 19 17.4998 19C18.3005 19 18.9495 18.3284 18.9495 17.5C18.9495 16.6716 18.3005 16 17.4998 16Z" fill="#212121" />
                                    </svg>
                                    <div className="modify-text no-drag">
                                        편집
                                    </div>
                                </div> :
                                <div className="is-delete-div">
                                    <div
                                        className="delete-text cursor-pointer no-drag"
                                        onClick={deleteFavRecipe}>
                                        삭제
                                    </div>
                                    <div
                                        className="cancel-text cursor-pointer"
                                        onClick={cancelDelete}>
                                        취소
                                    </div>
                                </div>
                        )
                }
            </div>
            <style jsx>{`
                .modify-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                label {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    margin-left: 2px;
                    font-size: 14px;
                    margin-top: 8px;
                }
                input {
                    margin-top: 5.5px;
                    margin-right: 4px;
                }
                .is-delete-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    margin-right: 16px;
                }
                .toggle-div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0px 11px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    transition: border-color 0.3s ease;
                    height: 30px;
                    margin-right: 16px;
                }
                .toggle-div:hover {
                    border-color: rgb(130, 130, 130);
                }
                svg {
                    margin-right: 4px;
                }
                .modify-text, .delete-text {
                    font-size: 13px;
                }
                .delete-text {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0px 11px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    transition: border-color 0.3s ease;
                    height: 30px;
                }
                .delete-text:hover {
                    border-color: rgb(130, 130, 130);
                }
                .cancel-text {
                    margin-left: 7px;
                    font-size: 13px;
                }
                .cancel-text:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    )
}