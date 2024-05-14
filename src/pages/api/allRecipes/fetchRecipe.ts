import { firestore } from '@/firebase/firebasedb';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Menu } from '@/redux/features/menuSlice';

// API를 통해 받아온 전체 레시피를 DB에 저장
const fetchRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
    const API_KEY = process.env.API_KEY;

    // 포함하지 않을 문자열을 필터링하는 정규식
    // 미완된 음식의 이미지나, 워터마크가 있는 이미지를 필터링하기 위함
    const regex =
        /(uploadimg\/(2014|2015|2019|2020|2021|2023)|common\/ecmFileView\.do\?)/;
    const excludeSeqs = ['2981', '886', '3217', '977', '745', '760'];

    try {
        const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000`);
        const recipes = response.data.COOKRCP01.row;

        // 레시피를 필터링
        const filteredRecipes = recipes.filter((item: Menu) => {
            // ATT_FILE_NO_MK 값에서 정규식과 일치하는 부분을 찾음
            // match 함수를 이용해 정규식과 일치한다면 배열로 반환하고, 일치하지 않는다면 null
            const match = item.ATT_FILE_NO_MK.match(regex);
            // match가 null인 경우에만 item 반환
            // ** filter 함수가 true일 때 item을 반환하고, false일 땐 반환하지 않는 것을 이용 **
            return match === null && !excludeSeqs.includes(item.RCP_SEQ);
        })

        // 필터링한 레시피들을 DB에 추가
        const promises = filteredRecipes.map((item: Menu) => {
            // DB에 'recipes'라는 컬렉션에 레시피 배열들을 하나씩 추가
            const docRef = doc(firestore, 'recipes', item.RCP_SEQ);
            setDoc(docRef, item);
        })

        // 배열 중 하나라도 실패하면 거부(병렬 실행)
        await Promise.all(promises);

        return res.status(200).json({ msg: "레시피 추가 완료" })
    } catch (error) {
        return res.status(500).json({ msg: "레시피 추가 실패" })
    }

}

export default fetchRecipe;