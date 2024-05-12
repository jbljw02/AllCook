import { createSlice } from "@reduxjs/toolkit";

export const scrollPassContentSlice = createSlice({
    name: 'scrollPassContent',
    initialState: false,
    reducers: {
        setScrollPassContent: (state, action) => {
            return action.payload;
        }
    }
})

export const headerSlideSlice = createSlice({
    name: 'headerSlide',
    initialState: false,
    reducers: {
        setHeaderSlide: (state, action) => {
            return action.payload;
        }
    }
})

export const { setScrollPassContent } = scrollPassContentSlice.actions;
export const { setHeaderSlide } = headerSlideSlice.actions;

const reducers = {
    scrollPassContent: scrollPassContentSlice.reducer,
    headerSlide: headerSlideSlice.reducer,
}

export default reducers;