import { auth } from "@/firebase/firebasedb";
import axios from "axios";
import { signOut } from "firebase/auth";

export default function logout() {
    signOut(auth).then(async () => {
        await axios.post('/api/auth/logout', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        console.log("로그아웃 성공");
    }).catch((error) => {
        console.error("로그아웃 실패 : ", error);
    })
}