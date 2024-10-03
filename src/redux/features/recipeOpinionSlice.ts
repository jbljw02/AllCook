import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from 'firebase/firestore';

export type Opinions = {
    id: string,
    RCP_SEQ: string,
    email: string,
    name: string,
    comment: string,
    rating: number,
    dateTime: Timestamp,
    isEdited: boolean,
}

type SortRule = '등록순' | '최신순';

export type RecipeOpinion = {
    opinions: Opinions[],
    sortRule: SortRule,
}

const initialState: RecipeOpinion = {
    opinions: [],
    sortRule: '등록순',
};

export const recipeOpinionSlice = createSlice({
    name: 'recipeOpinion',
    initialState: initialState,
    reducers: {
        setRecipeOpinion: (state, action) => {
            state.opinions = action.payload;
        },
        // 오름차순 정렬
        sortRecipeOpinionAsc: (state) => {
            state.sortRule = '등록순';
            state.opinions.sort((a, b) => (a.dateTime.seconds - b.dateTime.seconds) || (a.dateTime.nanoseconds - b.dateTime.nanoseconds));
        },
        // 내림차순 정렬
        sortRecipeOpinionDesc: (state) => {
            state.sortRule = '최신순';
            state.opinions.sort((a, b) => (b.dateTime.seconds - a.dateTime.seconds) || (b.dateTime.nanoseconds - a.dateTime.nanoseconds));
        },
        addOpinion: (state, action) => {
            const newOpinion = action.payload;
            state.opinions.push(newOpinion);
        },
        deleteOpinion: (state, action) => {
            const id = action.payload;
            state.opinions = state.opinions.filter(opinion => opinion.id !== id);
        },
        editOpinion: (state, action) => {
            const { id, comment, rating } = action.payload;
            const opinion = state.opinions.find(opinion => opinion.id === id);
            if (opinion) {
                opinion.comment = comment;
                opinion.rating = rating;
                opinion.isEdited = true;
            }
        }
    }
})

export const isEditingSlice = createSlice({
    name: 'isEditing',
    initialState: false,
    reducers: {
        setIsEditing: (state, action) => {
            return action.payload;
        }
    }
})

export const { setRecipeOpinion, sortRecipeOpinionAsc, sortRecipeOpinionDesc, addOpinion, deleteOpinion, editOpinion } = recipeOpinionSlice.actions;
export const { setIsEditing } = isEditingSlice.actions;

const reducers = {
    recipeOpinion: recipeOpinionSlice.reducer,
    isEditing: isEditingSlice.reducer,
}

export default reducers;