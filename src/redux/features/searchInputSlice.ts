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

export const { setSearchInput } = searchInputSlice.actions;

const reducers = {
    searchInput: searchInputSlice.reducer,
}

export default reducers;