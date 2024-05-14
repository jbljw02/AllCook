import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
    RCP_NM: '',
    ATT_FILE_NO_MK: '',
    INFO_CAR: '',
    INFO_ENG: '',
    INFO_FAT: '',
    INFO_NA: '',
    INFO_PRO: '',
    MANUAL01: '',
    MANUAL02: '',
    MANUAL03: '',
    RCP_NA_TIP: '',
    RCP_PARTS_DTLS: '',
    RCP_PAT2: '',
    RCP_SEQ: '',
}

// 홈 화면의 추천 메뉴에 대한 Slice
export const recomMenuSlice = createSlice({
    name: 'recomMenu',
    initialState: initialState,
    reducers: {
        setRecomMenu: (state, action) => {
            return action.payload;
        }
    }
})

// 홈 화면의 추천 후식에 대한 Slice
export const dessertMenuSlice = createSlice({
    name: 'dessertMenu',
    initialState: initialState,
    reducers: {
        setDessertMenu: (state, action) => {
            return action.payload;
        }
    }
})

// 전체 메뉴에 대한 Slice
export const allMenuSlice = createSlice({
    name: 'allMenu',
    initialState: initialState,
    reducers: {
        setAllMenu: (state, action) => {
            return action.payload;
        }
    }
})

// 화면에 보여지는 메뉴에 대한 Slice(모든 메뉴, 검색된 메뉴)
export const displayedMenuSlice = createSlice({
    name: 'displayedMenu',
    initialState: initialState,
    reducers: {
        setDisplayedMenu: (state, action) => {
            return action.payload;
        }
    }
})

export const { setRecomMenu } = recomMenuSlice.actions;
export const { setDessertMenu } = dessertMenuSlice.actions;
export const { setAllMenu } = allMenuSlice.actions;
export const { setDisplayedMenu } = displayedMenuSlice.actions;

const reducers = {
    recomMenu: recomMenuSlice.reducer,
    dessertMenu: dessertMenuSlice.reducer,
    displayedMenu: displayedMenuSlice.reducer,
    allMenu: allMenuSlice.reducer,
}

export default reducers;