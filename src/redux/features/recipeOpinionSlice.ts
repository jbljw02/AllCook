import { createSlice } from "@reduxjs/toolkit";

export type RecipeOpinion = {
    RCP_SEQ: string,
    email: string,
    comment: string,
    rating: number,
}

const initialState: RecipeOpinion[] = [];

export const recipeOpinionSlice = createSlice({
    name: 'recipeOpinion',
    initialState: initialState,
    reducers: {
        setRecipeOpinion: (state, action) => {
            return action.payload;
        }
    }
})

export const { setRecipeOpinion } = recipeOpinionSlice.actions;

const reducers = {
    recipeOpinion: recipeOpinionSlice.reducer,
}

export default reducers;