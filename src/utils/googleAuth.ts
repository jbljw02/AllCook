import { auth } from "@/firebase/firebasedb";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from "next/router";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import sendUserInitialData from "./sendUserInitialData";

interface UserInfo {
    name: string;
    email: string;
}

const googleAuth = async (initialFolder: FavoriteRecipe[]): Promise<UserInfo> => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user.displayName && user.email) {
            sendUserInitialData(user.email, initialFolder);
            router.push('/');

            return { name: user.displayName, email: user.email };
        }
        else {
            throw new Error("사용자 이름 혹은 이메일 존재 X");
        }
    } catch (error) {
        console.error("구글 인증 실패: ", error);
        throw error;
    }
};

export default googleAuth;