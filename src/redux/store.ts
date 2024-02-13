import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import meneReducers from './features/menuSlice';
import ingredientReducers from './features/ingredientSlice';

export type RootState = {
    recomMenu: Menu[],
    dessertMenu: Menu[],
    allMenu: Menu[],
    carInfo: Ingredient,
    engInfo: Ingredient,
    fatInfo: Ingredient,
    naInfo: Ingredient,
    proInfo: Ingredient,
}

export type Menu = {
    RCP_NM: string,
    ATT_FILE_NO_MK: string,
    ATT_FILE_NO_MAIN?: string,
    INFO_CAR: string,  // 탄수화물
    INFO_ENG: string, // 열량
    INFO_FAT: string,  // 지방
    INFO_NA: string,  // 나트륨
    INFO_PRO: string,  // 단백질
    MANUAL01: string,
    MANUAL02: string,
    MANUAL03: string,
    RCP_NA_TIP: string,
    RCP_PARTS_DTLS: string,
    RCP_PAT2: string,
    HASH_TAG: string,
}

export type Ingredient = {
    min: number,
    max: number,
}

// 각각의 기능을 가진 리듀서들을 병합
const combinedReducer = combineReducers({
    recomMenu: meneReducers.recomMenu,
    dessertMenu: meneReducers.dessertMenu,
    allMenu: meneReducers.allMenu,
    carInfo: ingredientReducers.carInfo,
    engInfo: ingredientReducers.engInfo,
    fatInfo: ingredientReducers.engInfo,
    naInfo: ingredientReducers.naInfo,
    proInfo: ingredientReducers.proInfo,
});

// 전체 리듀서를 관리
const masterReducer = (state: any, action: {
    payload: any; type: any;
}) => {
    // 서버 사이드에서 생성된 state라면, 클라이언트에 병합
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
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