import { createSlice } from "@reduxjs/toolkit";

// 어떤 기준을 통해 레시피들을 정렬할지에 대한 Slice
export const sortRuleSlice = createSlice({
    name: 'sortRule',
    initialState: '추천순',
    reducers: {
        setSortRule: (state, action) => {
            return action.payload;
        }
    }
})

export const { setSortRule } = sortRuleSlice.actions;

const reducers = {
    sortRule: sortRuleSlice.reducer,
}

export default reducers;