import { setDessertMenu } from "@/redux/features/menuSlice";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'

const fetchRecomMenu = async (request: NextApiRequest, res: NextApiResponse) => {
    const API_KEY = process.env.API_KEY;

    // 후식의 인덱스 중에서 최소 거리의 4개의 인덱스만 뽑는 함수
    function findEfficientRandomRangeWithFourNumbers(numbers: number[]) {
        // 결과를 저장할 배열
        let minimalRanges = [];

        for (let i = 0; i <= numbers.length - 4; i++) { // 최소 네 개의 숫자가 필요하므로, 길이 - 4까지 반복
            let start = numbers[i];
            let end = numbers[i + 3]; // 시작점에서 세 칸 뒤의 숫자가 네 번째 숫자가 됨

            // 이 범위는 항상 네 개의 숫자를 포함함
            minimalRanges.push([start, end]);
        }

        if (minimalRanges.length === 0) {
            return "적절한 범위를 찾을 수 없습니다.";
        }

        // 무작위로 하나의 범위 선택
        const randomIndex = Math.floor(Math.random() * minimalRanges.length);
        return minimalRanges[randomIndex];
    }

    // const dessertArray = [15, 29, 56, 70, 141, 215, 221, 226, 244, 246, 247, 250, 300, 301, 306, 313, 389, 390, 397, 430, 451, 452, 481, 487, 493, 504, 543, 581, 582, 583, 620, 725, 726, 727, 742, 749, 765, 769, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 795, 822, 827, 834, 844, 845, 846, 847, 848, 849, 850, 851, 852, 867, 869, 884, 904, 908, 916, 925, 926, 927, 928, 929, 930, 931, 973, 974, 984, 987, 995, 996, 997, 998, 999, 1000];
    // const arrayResult = findEfficientRandomRangeWithFourNumbers(dessertArray);

    try {
        const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_PAT2=후식`);
        const result = response.data.COOKRCP01.row;
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("API 호출 실패 : ", error);
        return res.status(500).json({ error: error })
    }
}

export default fetchRecomMenu;