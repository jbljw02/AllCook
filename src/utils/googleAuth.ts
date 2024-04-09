import { auth } from "@/firebase/firebasedb";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from "next/router";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import sendUserInitialData from "./sendUserInitialData";

const googleAuth = async (initialFolder : FavoriteRecipe[]) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // 구글 인증 성공
            const user = result.user;
            if (user.displayName && user.email) {
                sendUserInitialData(user.email, initialFolder);
            }
            router.push('/')
            return user.displayName;
        })
        .catch((error) => {
            console.error("구글 인증 실패: ", error);
            throw error;
        });
};

export default googleAuth;