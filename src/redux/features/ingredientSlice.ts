import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    min: 0,
    max: 1000,
}

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

export const { setCarInfo } = carInfoSlice.actions;
export const { setEngInfo } = engInfoSlice.actions;
export const { setFatInfo } = fatInfoSlice.actions;
export const { setNaInfo } = naInfoSlice.actions;
export const { setProInfo } = proInfoSlice.actions;

const reducers = {
    carInfo: carInfoSlice.reducer,
    engInfo: engInfoSlice.reducer,
    fatInfo: fatInfoSlice.reducer,
    naInfo: naInfoSlice.reducer,
    proInfo: proInfoSlice.reducer,
}

export default reducers;