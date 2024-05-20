import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

const withdrawl = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // 쿠키에서 authToken 삭제
        res.setHeader('Set-Cookie', cookie.serialize('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0), // 쿠키의 만료 시간을 과거로 설정하여 삭제
            sameSite: 'strict',
            path: '/',
        }));

        res.status(200).json({ success: "탈퇴 및 토큰 삭제 성공" });
    } catch (error) {
        res.status(500).json({ error: "탈퇴 및 토큰 삭제 실패" });
    }
}

export default withdrawl;