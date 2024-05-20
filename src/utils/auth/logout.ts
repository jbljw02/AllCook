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
    }).catch((error) => {
        throw error;
    });
}