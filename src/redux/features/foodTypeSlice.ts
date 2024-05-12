import { createSlice } from "@reduxjs/toolkit";

export type FoodType = {
    rice: boolean,
    sideDish: boolean,
    specialDish: boolean,
    stew: boolean,
    dessert: boolean,
}

const initialState = {
    rice: false, // 밥
    sideDish: false, // 반찬
    specialDish: false, // 일품
    stew: false, // 국&찌개
    dessert: false, // 후식
}

export const foodTypeSlice = createSlice({
    name: 'foodType',
    initialState: initialState,
    reducers: {
        setFoodType: (state, action) => {
            return action.payload;
        }
    }
})

export const { setFoodType } = foodTypeSlice.actions;

const reducers = {
    foodType: foodTypeSlice.reducer,
}

export default reducers;