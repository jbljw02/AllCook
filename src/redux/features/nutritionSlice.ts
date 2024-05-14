import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    car: { min: 0, max: 1000 },  // 탄수화물
    eng: { min: 0, max: 1000 },  // 열량
    fat: { min: 0, max: 1000 },  // 지방
    na: { min: 0, max: 1000 },  // 나트륨
    pro: { min: 0, max: 1000 },  // 단백질
}

export type Nutrition = {
    car: { min: number, max: number },  // 탄수화물
    eng: { min: number, max: number },  // 열량
    fat: { min: number, max: number },  // 지방
    na: { min: number, max: number },  // 나트륨
    pro: { min: number, max: number },  // 단백질
}

export type NutritionKey = 'car' | 'eng' | 'fat' | 'na' | 'pro';

interface NutritionInfoPayload {
    name: NutritionKey;
    values: { min: number, max: number };
}

// 영양성분의 검색 범위를 지정하는 슬라이더의 Slice 
export const nutritionInfoSlice = createSlice({
    name: 'nutritionInfo',
    initialState: initialState,
    reducers: {
        setNutritionInfo: (state, action: PayloadAction<NutritionInfoPayload>) => {
            const { name, values } = action.payload;
            state[name] = values;
        },
        resetNutritionInfo: (state) => {
            (Object.keys(state) as Array<keyof typeof state>).forEach(key => {
                state[key].min = 0;
                state[key].max = 1000;
            });
        }
    },
});

// slider의 초기화를 위한 Slice
export const sliderResetSlice = createSlice({
    name: 'sliderReset',
    initialState: false,
    reducers: {
        setSliderReset: (state) => {
            return !state;
        }
    }
})

export const { setNutritionInfo } = nutritionInfoSlice.actions;
export const { resetNutritionInfo } = nutritionInfoSlice.actions;
export const { setSliderReset } = sliderResetSlice.actions;

const reducers = {
    nutritionInfo: nutritionInfoSlice.reducer,
    sliderReset: sliderResetSlice.reducer,
}

export default reducers;