import { auth, firestore } from "@/firebase/firebasedb";
import axios from "axios";

const getEmailToken = async () => {
    const user = auth.currentUser;

    if (user) {
        user.getIdToken().then(async (token) => {
            const response = await axios.post('/api/auth/emailToken', { token: token }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            const jwtToken = response.data;

            // JWT를 쿠키에 저장
            document.cookie = `authToken=${jwtToken}; path=/; max-age=3600; samesite=strict`;
        });
    }
}

export default getEmailToken;