import Footer from "@/components/Footer";
import MenuTable from "@/components/table/MenuTable";
import EmptyFolder from "@/components/favoriteRecipe/EmptyFolder";
import RecipeThumbnail from "@/components/favoriteRecipe/RecipeThumbnail";
import Header from "@/components/header/Header";
import HeaderOnContents from "@/components/header/HeaderOnContents";
import { FavoriteRecipe, setFavoriteRecipe, setSelectedFolder } from "@/redux/features/favoriteRecipeSlice";
import { setRecipe } from "@/redux/features/recipeSlice";
import { RootState } from "@/redux/store";
import moveToDetail from "@/utils/moveToDetail";
import sendNewFolderName from "@/utils/sendNewFolderName";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FolderDetail() {
    const dispatch = useDispatch();
    const router = useRouter();

    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    const headerSlide = useSelector((state: RootState) => state.headerSlide);

    const user = useSelector((state: RootState) => state.user);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    // 컴포넌트가 마운트 될 때 관심 레시피 호출
    useEffect(() => {
        (async () => {
            try {
                if (user.email) {
                    const response = await axios.post('/api/reciveFavRecipes', {
                        email: user.email,
                    });

                    const favRecipeFromStore: FavoriteRecipe[] = response.data.favoriteRecipe;
                    dispatch(setFavoriteRecipe(favRecipeFromStore));
                }
            } catch (error) {
                throw Error;
            }
        })();
    }, [user]);

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);
    const selectedFolder = useSelector((state: RootState) => state.selectedFolder);

    const { folderId } = router.query;
    const numericFolderId = Number(folderId);

    // 폴더 ID가 일치하는 폴더를 state에 할당
    useEffect(() => {
        let folderItem = favoriteRecipe.find(item => item.folderId === numericFolderId);
        if (folderItem) {
            dispatch(setSelectedFolder(folderItem));
        }
    }, [favoriteRecipe]);

    // 특정 메뉴를 클릭하면 해당 메뉴의 레시피 페이지로 이동
    const menuClick = (name: string, seq: string) => {
        const selectedMenu = moveToDetail(name, seq, displayedMenu);
        dispatch(setRecipe(selectedMenu));
    }

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false); // 현재 새 폴더를 추가중인지
    const [newFolderName, setNewFolderName] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);

    const newFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value);
    }

    // 폴더명 변경 작업이 실행되면, 입력 포커스를 폴더의 input으로 이동
    useEffect(() => {
        if (isAddFolder && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isAddFolder]);

    // 폴더명을 변경하는 작업
    const newFolderNameUpdate = async (e: { key: string; }) => {
        // 이름을 입력하고 엔터키를 누른 경우, 폴더가 추가됨
        if (e.key === 'Enter') {
            if (newFolderName !== '') {
                if (user.email && selectedFolder) {
                    // DB에서 동일한 폴더를 찾아 폴더명을 변경
                    const resFolderName = await sendNewFolderName(user.email, selectedFolder?.folderId, newFolderName)
                    setNewFolderName(resFolderName.data.newFolderName);

                    // 폴더명이 변경됐으므로 배열 전체 업데이트
                    const resFavRecipe = await axios.post('/api/reciveFavRecipes', {
                        email: user.email,
                    });
                    const favRecipeFromStore: FavoriteRecipe[] = resFavRecipe.data.favoriteRecipe;
                    dispatch(setFavoriteRecipe(favRecipeFromStore));

                    // 모든 작업이 완료된 후 작업 마침
                    setIsAddFolder(false);
                }
            }
        }
        else if (e.key === 'Escape') {
            setIsAddFolder(false);
        }
    }

    // 포커스를 input 밖으로 두면 폴더 변경 작업 취소
    const newFolderNameBlur = () => {
        setIsAddFolder(false);
    }

    // 폴더명 변경 작업을 시작
    const addNewFolderName = () => {
        setIsAddFolder(true);
    }

    return (
        <>
            <div className="container">
                <div className="container-float-top">
                    <div className="header-container">
                        {
                            // 스크롤이 contents-container 영역을 지나치면 헤더가 사라지도록 설정
                            !scrollPassContent ?
                                <Header
                                    position="relative"
                                    backgroundColor="#ffffff"
                                    color="#111111"
                                    borderColor="#e8e8e8"
                                    svgFill="#000000"
                                    lightLogo={false}
                                    inputBackgroundColor="#f2f2f2" /> :
                                <>
                                    <Header
                                        position="relative"
                                        backgroundColor="#ffffff"
                                        color="#111111"
                                        borderColor="#e8e8e8"
                                        svgFill="#000000"
                                        lightLogo={false}
                                        inputBackgroundColor="#f2f2f2" />
                                    <HeaderOnContents
                                        className={
                                            !headerSlide ?
                                                'slide-down' :
                                                'slide-up'
                                        }
                                    />
                                </>
                        }
                    </div>
                    <div className="contents-container">
                        <div className="folder-top-section">
                            <div className="folder-thumbnail">
                                {
                                    selectedFolder &&
                                    <RecipeThumbnail
                                        recipes={selectedFolder.recipes}
                                        size={310}
                                    />
                                }
                            </div>
                            <div className="folder-title-section">
                                {
                                    selectedFolder &&
                                    <>
                                        <div className="folder-title">
                                            {
                                                isAddFolder ?
                                                    <input
                                                        type="text"
                                                        ref={nameRef}
                                                        value={newFolderName}
                                                        onChange={newFolderNameChange}
                                                        onKeyDown={newFolderNameUpdate}
                                                        onBlur={newFolderNameBlur}
                                                        placeholder="폴더명을 입력해주세요!"
                                                    /> :
                                                    (
                                                        newFolderName === '' ?
                                                            selectedFolder.folderName :
                                                            newFolderName
                                                    )
                                            }
                                        </div>
                                        <div className="folder-length">
                                            {
                                                Array.isArray(selectedFolder.recipes) &&
                                                selectedFolder.recipes.length
                                            }
                                            개의 항목
                                        </div>
                                        <div className="folder-name-modify cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="17px" height="17px" viewBox="0 0 32 32" version="1.1">
                                                <path d="M30.133 1.552c-1.090-1.044-2.291-1.573-3.574-1.573-2.006 0-3.47 1.296-3.87 1.693-0.564 0.558-19.786 19.788-19.786 19.788-0.126 0.126-0.217 0.284-0.264 0.456-0.433 1.602-2.605 8.71-2.627 8.782-0.112 0.364-0.012 0.761 0.256 1.029 0.193 0.192 0.45 0.295 0.713 0.295 0.104 0 0.208-0.016 0.31-0.049 0.073-0.024 7.41-2.395 8.618-2.756 0.159-0.048 0.305-0.134 0.423-0.251 0.763-0.754 18.691-18.483 19.881-19.712 1.231-1.268 1.843-2.59 1.819-3.925-0.025-1.319-0.664-2.589-1.901-3.776zM22.37 4.87c0.509 0.123 1.711 0.527 2.938 1.765 1.24 1.251 1.575 2.681 1.638 3.007-3.932 3.912-12.983 12.867-16.551 16.396-0.329-0.767-0.862-1.692-1.719-2.555-1.046-1.054-2.111-1.649-2.932-1.984 3.531-3.532 12.753-12.757 16.625-16.628zM4.387 23.186c0.55 0.146 1.691 0.57 2.854 1.742 0.896 0.904 1.319 1.9 1.509 2.508-1.39 0.447-4.434 1.497-6.367 2.121 0.573-1.886 1.541-4.822 2.004-6.371zM28.763 7.824c-0.041 0.042-0.109 0.11-0.19 0.192-0.316-0.814-0.87-1.86-1.831-2.828-0.981-0.989-1.976-1.572-2.773-1.917 0.068-0.067 0.12-0.12 0.141-0.14 0.114-0.113 1.153-1.106 2.447-1.106 0.745 0 1.477 0.34 2.175 1.010 0.828 0.795 1.256 1.579 1.27 2.331 0.014 0.768-0.404 1.595-1.24 2.458z" />
                                            </svg>
                                            <div
                                                className="no-drag"
                                                onClick={addNewFolderName}>
                                                폴더명 수정
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="folder-recipes-section">
                            {
                                selectedFolder.recipes && (
                                    selectedFolder.recipes.length > 0 ?
                                        <MenuTable
                                            menu={selectedFolder.recipes}
                                            category="modify"
                                            menuClick={menuClick}
                                            isModify={true}
                                        /> :
                                        <EmptyFolder />
                                )

                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <style jsx>{`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: #111111;
                    margin-top: 80px;
                    margin-bottom: 80px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 1080px;
                }
                .folder-top-section {
                    display: flex;
                    flex-direction: row;
                    align-self: flex-start;
                    width: 100%;
                    margin-bottom: 30px;
                }
                .folder-thumbnail {
                    background-color: #f4f5f6;
                    border-radius: 3px;
                }
                .folder-title-section {
                    display: flex;
                    flex-direction: column;
                    margin-left: 35px;
                    margin-top: 4px;
                }
                .folder-title {
                    font-size: 30px;
                }
                .folder-title input {
                    font-size: 30px;
                    border: none;
                    outline: none;
                    padding: 0px;
                }
                .folder-length {
                    font-size: 16px;
                    color: #5c5c5c;
                    margin-top: 5px;
                    margin-left: 4px;
                }
                .folder-name-modify {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: 30px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    width: 99px;
                    font-size: 14.5px;
                    padding: 6px 12px;
                    transition: border-color 0.3s ease;
                }
                .folder-name-modify:hover {
                    border-color: rgb(130, 130, 130);
                }
                .folder-name-modify svg {
                    margin-top: 3px;
                }
                .folder-name-modify div {
                    margin-left: 10px;
                }
                .folder-recipes-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    margin-left: 5px;
                }
            `}</style>
        </>

    )
}