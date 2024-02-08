import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import reducers from './features/menuSlice';

export type RootState = {
    recomMenu: Menu[],
    dessertMenu: Menu[],
    allMenu: Menu[],
}

export type Menu = {
    RCP_NM: string,
    ATT_FILE_NO_MK: string,
    ATT_FILE_NO_MAIN?: string,
    INFO_CAR: string,
    INFO_ENG: string,
    INFO_FAT: string,
    INFO_NA: string,
    INFO_PRO: string,
    MANUAL01: string,
    MANUAL02: string,
    MANUAL03: string,
    RCP_NA_TIP: string,
    RCP_PARTS_DTLS: string,
    RCP_PAT2: string,
    HASH_TAG: string,
}

// 각각의 기능을 가진 리듀서들을 병합
const combinedReducer = combineReducers({
    recomMenu: reducers.recomMenu,
    dessertMenu: reducers.dessertMenu,
    allMenu: reducers.allMenu,
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