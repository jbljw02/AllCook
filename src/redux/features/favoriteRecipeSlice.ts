import { createSlice } from "@reduxjs/toolkit";
import { Menu, RootState } from "../store";

export type FavoriteRecipe = {
    folderId: number,
    name: string,
    recipes: Menu[],
}

export type AddedRecipeInfo = {
    folderId: number,
    imgString: string,
    folderName: string,
}

const folderInitialState: FavoriteRecipe[] = [
    {
        folderId: 0,
        name: `최근 저장한 레시피`,
        recipes: [],
    }
];

const infoInitialState = {
    folderId: null,
    imgString: '',
    folderName: '',
}

export const favoriteRecipeSlice = createSlice({
    name: 'favoriteRecipe',
    initialState: folderInitialState,
    reducers: {
        setFavoriteRecipe: (state, action) => {
            return action.payload;
        },
        // 레시피 폴더를 추가
        addFavoriteRecipeFolder: (state, action) => {
            // ex)현재 배열에 요소가 2개 있다면 다음 id는 3, 0개 있다면 다음 id는 1
            const nextId = state.length > 0 ? state[state.length - 1].folderId + 1 : 1;
            const newReipe = {
                folderId: nextId,
                ...action.payload,
            }
            state.push(newReipe);
        },
        // 폴더 삭제
        removeFavoriteRecipeFolder: (state, action) => {
            return state.filter(item => item.folderId !== action.payload);
        },
        // 레시피를 폴더 내에 추가
        addRecipeToFolder: (state, action) => {
            const { folderId, recipe } = action.payload;
            const folder = state.find(item => item.folderId === folderId);
            if (folder) {
                const newRecipe = recipe;
                folder.recipes.push(newRecipe);
            }
        },
        // 폴더에서 레시피 삭제
        removeRecipeFromFolder: (state, action) => {
            const { forderId, recipeNum } = action.payload;
            const folder = state.find(folder => folder.folderId === forderId);
            if (folder) {
                folder.recipes = folder.recipes.filter(recipe => recipe.RCP_SEQ !== recipeNum);
            }
        }
    }
})

// 추가할 레시피의 상세 정보
export const addedRecipeInfoSlice = createSlice({
    name: 'addedRecipeInfo',
    initialState: infoInitialState,
    reducers: {
        setAddedRecipeInfo: (state, action) => {
            return action.payload;
        }
    }
})

export const recipeMoveModalSlice = createSlice({
    name: 'recipeMoveModal',
    initialState: false,
    reducers: {
        setRecipeMoveModal: (state, action) => {
            return action.payload;
        }
    }
})

export const { setFavoriteRecipe, addFavoriteRecipeFolder, removeFavoriteRecipeFolder, addRecipeToFolder, removeRecipeFromFolder } = favoriteRecipeSlice.actions;
export const { setAddedRecipeInfo } = addedRecipeInfoSlice.actions;
export const { setRecipeMoveModal } = recipeMoveModalSlice.actions;

const reducers = {
    favoriteRecipe: favoriteRecipeSlice.reducer,
    addedRecipeInfo: addedRecipeInfoSlice.reducer,
    recipeMoveModal: recipeMoveModalSlice.reducer,
}

export default reducers;