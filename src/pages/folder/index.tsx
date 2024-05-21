import Seo from "@/components/Seo";
import FolderList from "@/components/favoriteRecipe/FolderList";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import ModifyNav from "@/components/favoriteRecipe/ModifyNav";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { admin } from "@/firebase/firebaseAdmin";
import requestFavRecipes from "@/utils/fetch/requestFavRecipes";

export default function Folder() {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

    // 컴포넌트가 마운트되기 전, DB로부터 사용자의 관심 레시피 정보를 받아옴
    useEffect(() => {
        (async () => {
            const favRecipeFromStore = await requestFavRecipes(user);
            dispatch(setFavoriteRecipe(favRecipeFromStore));
        })();
    }, [user, dispatch]);

    const isFavFolderDelete = useSelector((state: RootState) => state.isFavFolderDelete);

    return (
        <>
            <Seo title="관심 레시피" />
            <div className="container-float-top">
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