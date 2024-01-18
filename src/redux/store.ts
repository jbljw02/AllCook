import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import recomMenu from './features/recomMenuSlice';
import { debug } from "console";

export type RootState = {
    recomMenu: any,
}

const combinedReducer = combineReducers({
    recomMenu,
});

const masterReducer = (state: any, action: {
    payload: any; type: any;
}) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    }
    else {
        return combinedReducer(state, action);
    }
}

export const makeStore = () => {
    return configureStore({
        reducer: combinedReducer,
    })
}

export const wrapper = createWrapper(makeStore, { debug: true });