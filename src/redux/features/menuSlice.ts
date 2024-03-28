import { createSlice } from "@reduxjs/toolkit";

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