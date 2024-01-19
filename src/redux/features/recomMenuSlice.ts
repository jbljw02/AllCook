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

export const { setRecomMenu } = recomMenuSlice.actions;
export default recomMenuSlice.reducer;