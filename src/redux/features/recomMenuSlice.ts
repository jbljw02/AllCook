import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

export const recomMenu = createSlice({
    name: 'recomMenu',
    initialState: '',
    reducers: {
        setRecomMenu: (state, action) => {
            return action.payload;
        }
    }
})

export const { setRecomMenu } = recomMenu.actions;
export default recomMenu.reducer;
