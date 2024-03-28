import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;

const reducers = {
    user: userSlice.reducer,
}

export default reducers;