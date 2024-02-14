import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    car: { min: 0, max: 1000 },  // 탄수화물
    eng: { min: 0, max: 1000 },  // 열량
    fat: { min: 0, max: 1000 },  // 지방
    na: { min: 0, max: 1000 },  // 나트륨
    pro: { min: 0, max: 1000 },  // 단백질
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
    },
});

// 칼로리의 검색 범위를 정하는 슬라이더의 Slice
export const carInfoSlice = createSlice({
    name: 'carInfo',
    initialState: initialState,
    reducers: {
        setCarInfo: (state, action) => {
            return action.payload;
        }
    }
})

// 열량의 검색 범위를 정하는 슬라이더의 Slice
export const engInfoSlice = createSlice({
    name: 'engInfo',
    initialState: initialState,
    reducers: {
        setEngInfo: (state, action) => {
            return action.payload;
        }
    }
})

// 지방의 검색 범위를 정하는 슬라이더의 Slice
export const fatInfoSlice = createSlice({
    name: 'fatInfo',
    initialState: initialState,
    reducers: {
        setFatInfo: (state, action) => {
            return action.payload;
        }
    }
})

// 나트륨의 검색 범위를 정하는 슬라이더의 Slice
export const naInfoSlice = createSlice({
    name: 'naInfo',
    initialState: initialState,
    reducers: {
        setNaInfo: (state, action) => {
            return action.payload;
        }
    }
})

// 단백질의 검색 범위를 정하는 슬라이더의 Slice
export const proInfoSlice = createSlice({
    name: 'proInfo',
    initialState: initialState,
    reducers: {
        setProInfo: (state, action) => {
            return action.payload;
        }
    }
})

export const { setNutritionInfo } = nutritionInfoSlice.actions;
export const { setCarInfo } = carInfoSlice.actions;
export const { setEngInfo } = engInfoSlice.actions;
export const { setFatInfo } = fatInfoSlice.actions;
export const { setNaInfo } = naInfoSlice.actions;
export const { setProInfo } = proInfoSlice.actions;

const reducers = {
    nutritionInfo: nutritionInfoSlice.reducer,
    carInfo: carInfoSlice.reducer,
    engInfo: engInfoSlice.reducer,
    fatInfo: fatInfoSlice.reducer,
    naInfo: naInfoSlice.reducer,
    proInfo: proInfoSlice.reducer,
}

export default reducers;