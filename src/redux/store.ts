import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import menuReducers, { Menu } from './features/menuSlice';
import NutritionReducers, { Nutrition } from './features/nutritionSlice';
import SortReducers from './features/sortSlice';
import RecipeReducers from './features/recipeSlice';
import UserReducers, { User } from './features/userSlice';
import FavoriteRecipeReducers, { FavoriteRecipe, AddedRecipeInfo } from './features/favoriteRecipeSlice';
import RecipeOpinionReducers from './features/recipeOpinionSlice';
import { RecipeOpinion } from "./features/recipeOpinionSlice";
import RecipePageSlice from './features/recipePageSlice';
import scrollReducers from './features/scrollSlice';
import cookWayReducers, { CookWay } from './features/cookWaySlice';
import foodTypeReducers, { FoodType } from './features/foodTypeSlice';
import SearchInputReducers from './features/searchInputSlice';

export type RootState = {
    recomMenu: Menu[],
    dessertMenu: Menu[],
    allMenu: Menu[],
    displayedMenu: Menu[],
    searchedMenu: Menu[],
    nutritionInfo: Nutrition,
    sliderReset: boolean,
    minValue: number,
    maxValue: number,
    sortRule: '가나다순' | '추천순' | '저열량순' | '저지방순' | '저나트륨순' | '고단백질순',
    recipe: Menu,
    user: User,
    favoriteRecipe: FavoriteRecipe[],
    addedRecipeInfo: AddedRecipeInfo,
    recipeMoveModal: boolean,
    recipeAddModal: boolean,
    selectedFolder: FavoriteRecipe,
    recipeOpinion: RecipeOpinion[],
    isFavRecipeDelete: boolean,
    isCheckedRecipe: string[],
    isFavFolderDelete: boolean,
    isCheckedFolder: number[],
    currentPage: number,
    scrollPassContent: false,
    headerSlide: false,
    foodType: FoodType,
    cookWay: CookWay,
    servings: number,
    nutritionVisible: boolean,
    searchInput: string,
}

// 각각의 기능을 가진 리듀서들을 병합
const combinedReducer = combineReducers({
    recomMenu: menuReducers.recomMenu,
    dessertMenu: menuReducers.dessertMenu,
    allMenu: menuReducers.allMenu,
    displayedMenu: menuReducers.displayedMenu,
    nutritionInfo: NutritionReducers.nutritionInfo,
    sliderReset: NutritionReducers.sliderReset,
    sortRule: SortReducers.sortRule,
    recipe: RecipeReducers.recipe,
    user: UserReducers.user,
    favoriteRecipe: FavoriteRecipeReducers.favoriteRecipe,
    addedRecipeInfo: FavoriteRecipeReducers.addedRecipeInfo,
    recipeMoveModal: FavoriteRecipeReducers.recipeMoveModal,
    recipeAddModal: FavoriteRecipeReducers.recipeAddModal,
    selectedFolder: FavoriteRecipeReducers.selectedFolder,
    recipeOpinion: RecipeOpinionReducers.recipeOpinion,
    isFavRecipeDelete: FavoriteRecipeReducers.isFavRecipeDelete,
    isCheckedRecipe: FavoriteRecipeReducers.isCheckedRecipe,
    isFavFolderDelete: FavoriteRecipeReducers.isFavFolderDelete,
    isCheckedFolder: FavoriteRecipeReducers.isCheckedFolder,
    currentPage: RecipePageSlice.currentPage,
    scrollPassContent: scrollReducers.scrollPassContent,
    headerSlide: scrollReducers.headerSlide,
    foodType: foodTypeReducers.foodType,
    cookWay: cookWayReducers.cookWay,
    servings: RecipeReducers.servings,
    nutritionVisible: RecipeReducers.nutritionVisible,
    searchInput: SearchInputReducers.searchInput,
});

// 전체 리듀서를 관리
const masterReducer = (state: any, action: {
    payload: any; type: any;
}) => {
    // 액션의 타입이 HYDRATE일 경우, 즉 서버 사이드 렌더링이 발생할 때
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,  // 현재 클라이언트의 상태를 그대로 가져옴
            // ...action.payload,  // 모든 state를 SSR에서 가져와서 클라이언트에 병합(SSR에서 설정해주지 않은 값은 초기값으로 세팅됨)
            // 각 메뉴를 SSR에서 가져와서 클라이언트에 병합
            allMenu: action.payload.allMenu,
            recomMenu: action.payload.recomMenu,
            dessertMenu: action.payload.dessertMenu,
        };
        return nextState;
    }
    // 클라이언트에서 발생한 액션은, 각각의 리듀서에 의해 처리
    else {
        return combinedReducer(state, action);
    }
}

// 스토어를 생성
export const makeStore = () => {
    return configureStore({
        reducer: masterReducer,
    })
}

// export const wrapper = createWrapper(makeStore, { debug: true });
export const wrapper = createWrapper(makeStore);