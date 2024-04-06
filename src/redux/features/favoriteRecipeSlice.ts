import { createSlice } from "@reduxjs/toolkit";
import { Menu, RootState } from "../store";

export type FavoriteRecipe = {
    id: number,
    name: string,
    recipes: Menu[],
}

const initialState: FavoriteRecipe[] = [
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
        // 레시피 폴더를 추가
        addFavoriteRecipeFolder: (state, action) => {
            // ex)현재 배열에 요소가 2개 있다면 다음 id는 3, 0개 있다면 다음 id는 1
            const nextId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
            const newReipe = {
                id: nextId,
                ...action.payload,
            }
            state.push(newReipe);
        },
        // 폴더 삭제
        removeFavoriteRecipeFolder: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        // 레시피를 폴더 내에 추가
        addRecipeToFolder: (state, action) => {
            const { id, recipe } = action.payload;
            const folder = state.find(item => item.id === id);
            if (folder) {
                const newRecipe = recipe;
                folder.recipes.push(newRecipe);
            }
        },
    }
})

export const { addFavoriteRecipeFolder, removeFavoriteRecipeFolder, addRecipeToFolder } = favoriteRecipeSlice.actions;

const reducers = {
    favoriteRecipe: favoriteRecipeSlice.reducer,
}

export default reducers;