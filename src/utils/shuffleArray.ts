import { Menu } from "@/redux/store";

// 피셔-예이츠 셔플 알고리즘
// 배열의 마지막 요소부터 처음 요소까지 반복, 각 반복에서 해당 요소와 그 이전의 무작위 위치의 요소를 교환
export default function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        // 0 이상 i(현재 요소의 인덱스) 이하의 무작위 정수를 얻음
        const j = Math.floor(Math.random() * (i + 1));
        // 요소의 위치를 교환
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}