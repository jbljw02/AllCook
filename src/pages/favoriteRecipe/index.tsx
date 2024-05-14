import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FolderList from "@/components/favoriteRecipe/FolderList";
import Header from "@/components/header/Header";
import HeaderOnContents from "@/components/header/HeaderOnContents";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import ModifyNav from "@/components/favoriteRecipe/ModifyNav";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { admin } from "@/firebase/firebaseAdmin";

export default function favoriteRecipe() {
    const dispatch = useDispatch();

    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    const headerSlide = useSelector((state: RootState) => state.headerSlide);

    const user = useSelector((state: RootState) => state.user);

    // 컴포넌트가 마운트되기 전, DB로부터 사용자의 관심 레시피 정보를 받아옴
    useEffect(() => {
        (async () => {
            if (user.email) {
                const response = await axios.post('/api/userFavorite/recipe/reciveFavRecipes', {
                    email: user.email,
                });

                const favRecipeFromStore: FavoriteRecipe[] = response.data.favoriteRecipe;
                dispatch(setFavoriteRecipe(favRecipeFromStore));
            }
        })();
    }, [user]);

    const isFavFolderDelete = useSelector((state: RootState) => state.isFavFolderDelete);

    return (
        <>
            <Seo title="관심 레시피" />
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
                        {
                            !isFavFolderDelete ?
                                <div className="nav">
                                    <div className="title">내가 저장한 레시피</div>
                                    <ModifyNav category="folder" />
                                </div> :
                                <>
                                    <div className="title">내가 저장한 레시피</div>
                                    <div className="nav-modify-on">
                                        <ModifyNav category="folder" />
                                    </div>
                                </>
                        }
                        {/* 폴더 목록을 정렬 */}
                        <FolderList />
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
                    margin-left: auto;
                    margin-right: auto;
                    width: 1180px;
                }
                .nav {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                    margin-bottom: 15px;
                }
                .nav-modify-on {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    margin-bottom: 15px;
                }
                .title {
                    display: flex;
                    flex-direction: row;
                    align-self: flex-start;
                    font-size: 28px;
                    width: 100%;
                }
            `}</style>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const cookies = parseCookies(context);
        const authToken = cookies.authToken;

        // 인증 완료 시 현재 페이지를 보여줌
        await admin.auth().verifyIdToken(authToken);
        return {
            props: {}
        };
    } catch (error) {
        // 인증 실패 시 로그인 화면으로 이동
        return {
            redirect: {
                destination: '/signIn',
                parmanent: false,
            }
        }
    }
}