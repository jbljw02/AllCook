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

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {
        setRecipe: (state, action) => {
            return action.payload;
        }
    }
})

export const { setRecipe } = recipeSlice.actions;

const reducers = {
    recipe: recipeSlice.reducer,
}

export default reducers;