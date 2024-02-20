import { useDispatch, useSelector } from "react-redux";
import { Menu, RootState } from "../redux/store";
import { Nutrition } from "../redux/store";

type Key = 'sideDish' | 'specialDish' | 'stew' | 'dessert' | 'steam' | 'boil' | 'grill' | 'stir' | 'fry' | 'etc';
const keyToKorean = {
    sideDish: '반찬',
    specialDish: '일품',
    stew: '국&찌개',
    dessert: '후식',
    steam: '찌기',
    boil: '끓이기',
    grill: '굽기',
    stir: '볶기',
    fry: '튀기기',
    etc: '기타',
    car: '탄수화물',
    eng: '열량',
    fat: '지방',
    na: '나트륨',
    pro: '단백질',
};

export const filterMenu = (entries: [string, boolean][], filterKey: 'RCP_PAT2' | 'RCP_WAY2', allMenu: Menu[]) => {
    let filteredMenu: Menu[] = [];
    // 각 키마다 반복하여 검색한 뒤 배열에 중첩하여 할당
    entries.forEach(([key]) => {
        let koreanKey = keyToKorean[key as Key];
        let searchedMenu = allMenu.filter(item => item[filterKey] === koreanKey);
        filteredMenu = [...filteredMenu, ...searchedMenu];
    });
    return filteredMenu;
}

export const searchByRange = (filteredMenu: Menu[], nutritionInfo : Nutrition) => {
    const nutritionEntries = Object.entries(nutritionInfo);
    let finalFilteredMenu : Menu[] = [...filteredMenu];
    // 각 값마다 반복하여 최소값 및 최대값 범위에 있는 요소들을 분류하고, 중첩시킴
    nutritionEntries.forEach(([key, value]) => {
        console.log(value);
        finalFilteredMenu = finalFilteredMenu.filter(item => Number(value.min) <= item.INFO_CAR && item.INFO_CAR <= Number(value.max));
    });
    return finalFilteredMenu;
}