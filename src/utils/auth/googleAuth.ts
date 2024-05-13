import { auth } from "@/firebase/firebasedb";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from "next/router";
import { FavoriteRecipe } from "@/redux/features/favoriteRecipeSlice";
import sendUserInitialData from "./sendUserInitialData";
import axios from "axios";

interface UserInfo {
    name: string;
    email: string;
}

interface Response {
    user: UserInfo,
}

const googleAuth = async (initialFolder: FavoriteRecipe[]) => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
            throw new Error("사용자 정보 존재 X");
        }

        const user = result.user;
        const token = await user.getIdToken(); // 구글 토큰 생성

        if (user.displayName && user.email && token) {
            sendUserInitialData(user.email, initialFolder);
            router.push('/');

            try {
                // 파이어베이스를 통해 생성된 토큰의 인증을 요청
                await axios.post('/api/auth/googleToken', { token: token }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                });

                return { user: { name: user.displayName, email: user.email } };
            } catch (error) {
                console.error("토큰 인증 실패: ", error);
                return;
            }
        }
        else {
            throw new Error("사용자 이름 혹은 이메일 존재 X");
        }
    } catch (error) {
        console.error("구글 인증 실패: ", error);
        return;
    }
};

export default googleAuth;