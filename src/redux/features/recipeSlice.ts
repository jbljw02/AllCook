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

// 현재 선택된 레시피
export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {
        setRecipe: (state, action) => {
            return action.payload;
        }
    }
})

// 몇 인분인지를 관리
export const servingsSlice = createSlice({
    name: 'servings',
    initialState: 1,
    reducers: {
        setServings: (state, action) => {
            return action.payload;
        }
    }
})

// 영양성분 박스가 보일지를 관리
export const nutritionVisibleSlice = createSlice({
    name: 'nutritionVisible',
    initialState: false,
    reducers: {
        setNutritionVisible: (state, action) => {
            return action.payload;
        }
    }
})

export const { setRecipe } = recipeSlice.actions;
export const { setServings } = servingsSlice.actions;
export const { setNutritionVisible } = nutritionVisibleSlice.actions;

const reducers = {
    recipe: recipeSlice.reducer,
    servings: servingsSlice.reducer,
    nutritionVisible: nutritionVisibleSlice.reducer,
}

export default reducers;