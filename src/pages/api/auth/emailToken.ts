import { admin } from "@/firebase/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

// 이메일로 로그인시 생성된 토큰을 검증
const emailToken = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.body.token;

        const decodedToken = await admin.auth().verifyIdToken(token);

        res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // 개발 환경이 아닐 때에만 secure 적용
            maxAge: 3600, // 유효 시간(1시간)
            sameSite: 'strict', // CSRF 공격 방지
            path: '/',
        }));

        res.status(200).json({ success: "토큰 인증 성공 및 JWT 쿠키 설정 완료" });
    } catch (error) {
        console.error("토큰 검증 실패: ", error);
        res.status(500).json({ error: "토큰 검증 실패" });
    }
}

export default emailToken;