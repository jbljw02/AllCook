import { createSlice } from "@reduxjs/toolkit";


export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: 1,
    reducers: {
        setCurrentPage: (state, action) => {
            return action.payload;
        }
    }
})

export const {setCurrentPage} = currentPageSlice.actions;

const reducers = {
    currentPage: currentPageSlice.reducer,
}

export default reducers;