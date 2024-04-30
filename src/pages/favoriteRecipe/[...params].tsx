import Footer from "@/components/Footer";
import MenuTable from "@/components/MenuTable";
import RecipeThumbnail from "@/components/favoriteRecipe/RecipeThumbnail";
import Header from "@/components/header/Header";
import HeaderOnContents from "@/components/header/HeaderOnContents";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { setRecipe } from "@/redux/features/recipeSlice";
import { RootState } from "@/redux/store";
import moveToDetail from "@/utils/moveToDetail";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FolderDetail() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [scrollPassContent, setScrollPassContent] = useState(false);  // 스크롤이 컨텐츠 영역을 지났는지
    const [headerSlide, setHeaderSlide] = useState(false);  // 헤더의 슬라이드를 처리하기 위함
    const contentsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 헤더가 배너 영역에 도달하면 스타일을 바꾸기 위한 함수
        const checkScrollLocation = () => {
            const margin = 50;
            if (contentsRef.current !== null) {
                if (!scrollPassContent && window.scrollY > contentsRef.current.offsetTop + margin) {
                    setScrollPassContent(true);
                    setHeaderSlide(false)
                }
                else if (scrollPassContent && window.scrollY <= contentsRef.current.offsetTop - margin) {
                    setHeaderSlide(true)
                    setTimeout(() => {
                        setScrollPassContent(false);
                    }, 300);
                }
            }
        };

        window.addEventListener('scroll', checkScrollLocation);
        return () => {
            window.removeEventListener('scroll', checkScrollLocation);
        };
    }, [scrollPassContent]);

    const favoriteRecipe = useSelector((state: RootState) => state.favoriteRecipe);
    const [selectedFolder, setSelectedFolder] = useState<FavoriteRecipe>();

    const { folderId } = router.query;
    const numericFolderId = Number(folderId);

    // 폴더 ID가 일치하는 폴더를 state에 할당
    useEffect(() => {
        let folderItem = favoriteRecipe.find(item => item.folderId === numericFolderId);
        setSelectedFolder(folderItem);
    }, []);

    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    // 특정 메뉴를 클릭하면 해당 메뉴의 레시피 페이지로 이동
    const menuClick = (name: string, seq: string) => {
        const selectedMenu = moveToDetail(name, seq, displayedMenu);
        dispatch(setRecipe(selectedMenu));
    }

    return (
        <>
            <div className="container">
                <div ref={contentsRef} className="contents-ref" />
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
                                        size={320}
                                    />
                                }
                            </div>
                            <div className="folder-title-section">
                                {
                                    selectedFolder &&
                                    <>
                                        <div className="folder-title">{selectedFolder.folderName}</div>
                                        <div className="folder-length">{selectedFolder.recipes.length}개의 항목</div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="folder-recipes-section">
                            {
                                selectedFolder &&
                                <MenuTable
                                    menu={selectedFolder.recipes}
                                    category=""
                                    menuClick={menuClick}
                                />

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
                    height: 100%;
                }
                .folder-top-section {
                    display: flex;
                    flex-direction: row;
                    align-self: flex-start;
                }
                .folder-thumbnail {
                    background-color: #f4f5f6;
                    border-radius: 3px;
                }
                .folder-title-section {
                    margin-left: 35px;
                }
                .folder-title {
                    font-size: 29px;
                }
                .folder-length {
                    font-size: 16px;
                    color: #5c5c5c;
                    margin-top: 4px;
                    margin-left: 2px;
                }
                .folder-recipes-section {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    margin-top: 90px;
                    margin-left: 5px;
                    
                }
            `}</style>
        </>

    )
}