import { auth } from "@/firebase/firebasedb";
import axios from "axios";

const getEmailToken = async () => {
    const user = auth.currentUser;

    if (user) {
        user.getIdToken().then(async (token) => {
            await axios.post('/api/auth/emailToken', { token: token }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
        });
    }
}

export default getEmailToken;