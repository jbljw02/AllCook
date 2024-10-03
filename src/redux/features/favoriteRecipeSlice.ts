import { createSlice } from "@reduxjs/toolkit";
import { Menu } from "./menuSlice";

export type FavoriteRecipe = {
    folderId: number,
    folderName: string,
    recipes: Menu[],
}

export type AddedRecipeInfo = {
    folderId: number,
    folderName: string,
    ATT_FILE_NO_MK: string,
    ATT_FILE_NO_MAIN: string,
}

const folderInitialState: FavoriteRecipe[] = [
    {
        folderId: 0,
        folderName: `내가 좋아하는 레시피`,
        recipes: [],
    }
];

const infoInitialState = {
    folderId: null,
    ATT_FILE_NO_MK: '',
    ATT_FILE_NO_MAIN: '',
    folderName: '',
}

const isCheckedRecipeInit: string[] = [];

const isCheckedFolderInit: number[] = [];


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
        removeFolder: (state, action) => {
            const folderIds = action.payload;
            return state.filter(folder => !folderIds.includes(folder.folderId));
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
            const { folderId, recipeNums } = action.payload;
            const folder = state.find(folder => folder.folderId === folderId);
            if (folder) {
                folder.recipes = folder.recipes.filter(recipe =>
                    !recipeNums.includes(recipe.RCP_SEQ));
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

export const recipeAddModalSlice = createSlice({
    name: 'recipeAddModal',
    initialState: false,
    reducers: {
        setRecipeAddModal: (state, action) => {
            return action.payload;
        }
    }
})

// 선택된 폴더를 관리
export const selectedFolderSlice = createSlice({
    name: 'selectedFolder',
    initialState: folderInitialState,
    reducers: {
        setSelectedFolder: (state, action) => {
            return action.payload;
        }
    }
})

// 레시피를 삭제중인지 여부
export const isFavRecipeDeleteSlice = createSlice({
    name: 'isFavRecipeDelete',
    initialState: false,
    reducers: {
        setIsFavRecipeDelete: (state, action) => {
            return action.payload;
        }
    }
})

// 삭제할 레시피들의 체크 여부를 저장
export const isCheckedRecipeSlice = createSlice({
    name: 'isCheckedRecipe',
    initialState: isCheckedRecipeInit,
    reducers: {
        setIsCheckedRecipe: (state, action) => {
            const param = action.payload;
            const index = state.findIndex(item => item === param);

            // 인덱스를 찾지 못하면 -1을 반환함. 즉, 요소가 존재하지 않는다면 요소를 배열에 추가
            if (index === -1) {
                state.push(param);
            }
            else {
                // 요소가 이미 존재한다면 요소를 제거(index부터 1개를 제거, 즉 index와 일치하는 요소 제거)
                state.splice(index, 1)
            }
        },
        resetIsCheckedRecipe: () => {
            return [];
        }
    }
})

// 폴더를 삭제중인지 여부
export const isFavFolderDeleteSlice = createSlice({
    name: 'isFavFolderDelete',
    initialState: false,
    reducers: {
        setIsFavFolderDelete: (state, action) => {
            return action.payload;
        }
    }
})

// 삭제할 폴더들의 체크 여부를 저장
export const isCheckedFolderSlice = createSlice({
    name: 'isCheckedFolder',
    initialState: isCheckedFolderInit,
    reducers: {
        setIsCheckedFolder: (state, action) => {
            const param = action.payload;
            const index = state.findIndex(item => item === param);

            // 인덱스를 찾지 못하면 -1을 반환함. 즉, 요소가 존재하지 않는다면 요소를 배열에 추가
            if (index === -1) {
                state.push(param);
            }
            else {
                // 요소가 이미 존재한다면 요소를 제거(index부터 1개를 제거, 즉 index와 일치하는 요소 제거)
                state.splice(index, 1)
            }
        },
        resetIsCheckedFolder: () => {
            return [];
        }
    }
})

export const { setFavoriteRecipe, addFavoriteRecipeFolder, removeFolder, addRecipeToFolder, removeRecipeFromFolder } = favoriteRecipeSlice.actions;
export const { setAddedRecipeInfo } = addedRecipeInfoSlice.actions;
export const { setRecipeMoveModal } = recipeMoveModalSlice.actions;
export const { setRecipeAddModal } = recipeAddModalSlice.actions;
export const { setSelectedFolder } = selectedFolderSlice.actions;
export const { setIsFavRecipeDelete } = isFavRecipeDeleteSlice.actions;
export const { setIsCheckedRecipe } = isCheckedRecipeSlice.actions;
export const { resetIsCheckedRecipe } = isCheckedRecipeSlice.actions;
export const { setIsFavFolderDelete } = isFavFolderDeleteSlice.actions;
export const { setIsCheckedFolder } = isCheckedFolderSlice.actions;
export const { resetIsCheckedFolder } = isCheckedFolderSlice.actions;

const reducers = {
    favoriteRecipe: favoriteRecipeSlice.reducer,
    addedRecipeInfo: addedRecipeInfoSlice.reducer,
    recipeMoveModal: recipeMoveModalSlice.reducer,
    recipeAddModal: recipeAddModalSlice.reducer,
    selectedFolder: selectedFolderSlice.reducer,
    isFavRecipeDelete: isFavRecipeDeleteSlice.reducer,
    isCheckedRecipe: isCheckedRecipeSlice.reducer,
    isFavFolderDelete: isFavFolderDeleteSlice.reducer,
    isCheckedFolder: isCheckedFolderSlice.reducer,
}

export default reducers;