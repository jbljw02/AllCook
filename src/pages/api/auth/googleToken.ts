// pages/api/verifyToken.js 파일
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@/firebase/firebaseAdmin";

// 구글 인증 후에 토큰 검증
const googleToken = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.body.token;
        
        // 성공적으로 토큰을 검증할 시 decodedToken에 사용자의 정보 저장
        const decodedToken = await admin.auth().verifyIdToken(token);

        console.log("토큰 인증 성공");
        res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
    } catch (error) {
        console.error("인증 실패: ", error);
        res.status(401).json({ error: '인증 실패' });
    }
};

export default googleToken;