import { admin } from "@/firebase/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

// 이메일로 로그인시 생성된 토큰을 검증
const emailToken = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.body.token;

        const decodedToken = await admin.auth().verifyIdToken(token);

        console.log("토큰 검증 성공");
        res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
    } catch (error) {
        console.error("토큰 검증 실패: ", error);
        res.status(500).json({ error: "토큰 검증 실패" });
    }
}

export default emailToken;