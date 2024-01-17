import { configureStore, createSlice } from "@reduxjs/toolkit";

export type RootState = {
    temp: string,
}

const temp = createSlice({
    name: 'temp',
    initialState: '123',
    reducers: {
        setTemp: (state, action) => {
            return action.payload;
        }
    }
})

export const { setTemp } = temp.actions;

const store = () => configureStore({
    reducer: {
        temp: temp.reducer
    }
})

export default store;