import { createSlice } from "@reduxjs/toolkit";
import { Menu, RootState } from "../store";

export type FavoriteRecipes = {
    id: number,
    name: string,
    recipes: Menu[],
}

const initialState: FavoriteRecipes[] = [
    {
        id: 0,
        name: `최근 저장한 레시피`,
        recipes: [],
    }
];

export const favoriteRecipeSlice = createSlice({
    name: 'favoriteRecipe',
    initialState: initialState,
    reducers: {
        setFavoriteRecipe: (state, action) => {
            // ex)현재 배열에 요소가 2개 있다면 다음 id는 3, 0개 있다면 다음 id는 1
            const nextId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
            const newReipe = {
                id: nextId,
                ...action.payload,
            }
            state.push(newReipe);
        },
        removeFavoriteRecipe: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        }
    }
})

export const { setFavoriteRecipe } = favoriteRecipeSlice.actions;

const reducers = {
    favoriteRecipe: favoriteRecipeSlice.reducer,
}

export default reducers;