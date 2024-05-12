import { createSlice } from "@reduxjs/toolkit";

export type CookWay = {
    steam: boolean, 
    boil: boolean, 
    grill: boolean, 
    stir: boolean, 
    fry: boolean, 
    etc: boolean, 
}

const initialState = {
    steam: false, // 찌기
    boil: false, // 끓이기
    grill: false, // 굽기
    stir: false, // 볶기
    fry: false, // 튀기기
    etc: false, // 기타
}

export const cookWaySlice = createSlice({
    name: 'cookWay',
    initialState: initialState,
    reducers: {
        setCookWay: (state, action) => {
            return action.payload;
        }
    }
})

export const { setCookWay } = cookWaySlice.actions;

const reducers = {
    cookWay: cookWaySlice.reducer,
}

export default reducers;