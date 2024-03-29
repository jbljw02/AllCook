import { auth } from "@/firebase/firebasedb";
import { signOut } from "firebase/auth";

export default function logout() {
    signOut(auth).then(() => {
        console.log("로그아웃 성공");
    }).catch((error) => {
        console.log("로그아웃 실패 : ", error);
    })
}