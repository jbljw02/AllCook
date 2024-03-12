import { mailOptions, transporter } from '@/utils/nodemailer/nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'

const sendForm = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const data = request.body;

        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: "AllCook 문의 메시지",
                text: data.content
            });

            // return res.status(200).json({ success: "성공했어요" });
            return response.status(200).send("이메일 전송 성공")
        } catch (error) {
            console.log("error : ", error);
            return response.status(400).send("이메일 전송에 실패");
        }
    }
    else {
        return response.status(405).send("허용되지 않는 요청 방법");
    }
}

export default sendForm;