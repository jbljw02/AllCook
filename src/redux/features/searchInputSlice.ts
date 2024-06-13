import { createSlice } from "@reduxjs/toolkit";

export const searchInputSlice = createSlice({
    name: 'searchInput',
    initialState: '',
    reducers: {
        setSearchInput: (state, action) => {
            return action.payload;
        }
    }
})

export const isVisibleSlice = createSlice({
    name: 'isVisible',
    initialState: false,
    reducers: {
        setIsVisible: (state, action) => {
            return action.payload;
        }
    }
})

export const { setSearchInput } = searchInputSlice.actions;
export const { setIsVisible } = isVisibleSlice.actions;

const reducers = {
    searchInput: searchInputSlice.reducer,
    isVisible: isVisibleSlice.reducer,
}

export default reducers;