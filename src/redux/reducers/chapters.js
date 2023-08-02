import { createReducer } from "@reduxjs/toolkit";
import { setChapterData, setPageCounter, setNextChapterId } from "../actions/chapters";

const initialState = {
    number: 0,
    title: "",
    pageCounter: 1,
    manga_id: "",
    nextChapterId: null,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setChapterData, (state, action) => {
            const newState = {...state}
            const { number, title, manga_id } = action.payload;
            newState.number = number;
            newState.title = title;
            newState.manga_id = manga_id;
            return newState;
        })
        .addCase(setPageCounter, (state, action) => {
            const newState = {...state}
            newState.pageCounter = action.payload;
            return newState;

        })
        .addCase(setNextChapterId, (state, action) => {
            const newState = {...state}
            newState.nextChapterId = action.payload;
            return newState;

        });
});

export default reducer;