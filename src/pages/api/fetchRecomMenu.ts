import firebasedb from "@/firebase/firebasedb";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'
import { addDoc, collection } from "firebase/firestore";

const fetchRecomMenu = async (req: NextApiRequest, res: NextApiResponse) => {
    const API_KEY = process.env.API_KEY;
    const API_KEY2 = process.env.API_KEY2;

    const { RCP_PAT2_1, RCP_PAT2_2 } = req.query; // 클라이언트로부터 두 개의 인자를 받음

    // 한글 문자열을 URL에 삽입하기 위해 인코딩
    const encodedDessert = encodeURIComponent(RCP_PAT2_1 as string);
    const encodedRecom = encodeURIComponent(RCP_PAT2_2 as string);
    try {
        // Promise.all을 이용하여 두 번의 API가 호출이 완료되기 전까지 다음 작업으로 넘어가지 않음
        const [dessertResponse, recomResponse] = await Promise.all([
            axios.get(`http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_PAT2=${RCP_PAT2_1}`),
            axios.get(`http://openapi.foodsafetykorea.go.kr/api/${API_KEY2}/COOKRCP01/json/1/1000/RCP_PAT2=${RCP_PAT2_2}`)
        ])

        const dessertResult = dessertResponse.data.COOKRCP01.row;
        const recomResult = recomResponse.data.COOKRCP01.row;

        return res.status(200).json({
            RCP_PAT2_1: dessertResult,
            RCP_PAT2_2: recomResult,
        });
    } catch (error) {
        console.log("API 호출 실패 : ", error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export default fetchRecomMenu;