import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import menuReducers from './features/menuSlice';
import NutritionReducers from './features/nutritionSlice';
import SortReducers from './features/sortSlice';
import RecipeReducers from './features/recipeSlice';
import UserReducers from './features/userSlice';
import FavoriteRecipeReducers, { FavoriteRecipe, AddedRecipeInfo } from './features/favoriteRecipeSlice';

export type RootState = {
    recomMenu: Menu[],
    dessertMenu: Menu[],
    allMenu: Menu[],
    displayedMenu: Menu[],
    searchedMenu: Menu[],
    nutritionInfo: Nutrition,
    sliderReset: boolean,
    minValue: number,
    maxValue: number,
    sortRule: '가나다순' | '추천순' | '저열량순' | '저지방순' | '저나트륨순' | '고단백질순',
    recipe: Menu,
    user: string,
    favoriteRecipe: FavoriteRecipe[],
    addedRecipeInfo: AddedRecipeInfo,
    recipeMoveModal: boolean,
}

export type Menu = {
    RCP_NM: string,
    RCP_WAY2: string,
    ATT_FILE_NO_MK: string,
    ATT_FILE_NO_MAIN: string,
    INFO_CAR: number,  // 탄수화물
    INFO_ENG: number, // 열량
    INFO_FAT: number,  // 지방
    INFO_NA: number,  // 나트륨
    INFO_PRO: number,  // 단백질
    MANUAL01?: string,
    MANUAL02?: string,
    MANUAL03?: string,
    MANUAL04?: string,
    MANUAL05?: string,
    MANUAL06?: string,
    MANUAL07?: string,
    MANUAL08?: string,
    MANUAL09?: string,
    MANUAL10?: string,
    RCP_NA_TIP: string,
    RCP_PARTS_DTLS: string,
    RCP_PAT2: string,
    HASH_TAG: string,
    RCP_SEQ: string,
    MANUAL_IMG02: string,
    INFO_WGT: string,
    [key: string]: string | number | undefined,
}

export type Nutrition = {
    car: { min: number, max: number },  // 탄수화물
    eng: { min: number, max: number },  // 열량
    fat: { min: number, max: number },  // 지방
    na: { min: number, max: number },  // 나트륨
    pro: { min: number, max: number },  // 단백질
}

// 각각의 기능을 가진 리듀서들을 병합
const combinedReducer = combineReducers({
    recomMenu: menuReducers.recomMenu,
    dessertMenu: menuReducers.dessertMenu,
    allMenu: menuReducers.allMenu,
    displayedMenu: menuReducers.displayedMenu,
    nutritionInfo: NutritionReducers.nutritionInfo,
    sliderReset: NutritionReducers.sliderReset,
    sortRule: SortReducers.sortRule,
    recipe: RecipeReducers.recipe,
    user: UserReducers.user,
    favoriteRecipe: FavoriteRecipeReducers.favoriteRecipe,
    addedRecipeInfo: FavoriteRecipeReducers.addedRecipeInfo,
    recipeMoveModal: FavoriteRecipeReducers.recipeMoveModal,
});

// 전체 리듀서를 관리
const masterReducer = (state: any, action: {
    payload: any; type: any;
}) => {
    // 액션의 타입이 HYDRATE일 경우, 즉 서버 사이드 렌더링이 발생할 때
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,  // 현재 클라이언트의 상태를 그대로 가져옴
            // ...action.payload,  // 모든 state를 SSR에서 가져와서 클라이언트에 병합(SSR에서 설정해주지 않은 값은 초기값으로 세팅됨)
            // 각 메뉴를 SSR에서 가져와서 클라이언트에 병합
            allMenu: action.payload.allMenu,
            recomMenu: action.payload.recomMenu,
            dessertMenu: action.payload.dessertMenu,
        };
        return nextState;
    }
    // 클라이언트에서 발생한 액션은, 각각의 리듀서에 의해 처리
    else {
        return combinedReducer(state, action);
    }
}

// 스토어를 생성
export const makeStore = () => {
    return configureStore({
        reducer: masterReducer,
    })
}

export const wrapper = createWrapper(makeStore, { debug: true });
// export const wrapper = createWrapper(makeStore);