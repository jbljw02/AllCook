import { auth } from "@/firebase/firebasedb";
import { signOut } from "firebase/auth";

export default function logout() {
    signOut(auth).then(() => {
        console.log("로그아웃 성공");

        // 로그아웃 시에 토큰 제거
        document.cookie = "authToken=; path=/; samesite=strict";
    }).catch((error) => {
        console.log("로그아웃 실패 : ", error);
    })
}