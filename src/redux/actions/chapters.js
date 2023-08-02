import { createAction } from "@reduxjs/toolkit";

export const setChapterData = createAction("SET_CHAPTER_DATA", ({number, title, manga_id}) => {
    return {
        payload: {
            number: number,
            title: title,
            manga_id
        },
    };
});

export const setPageCounter = createAction("SET_PAGE_COUNTER", (counter) => {
    return {
        payload: counter,
    };
});

export const setNextChapterId = createAction("SET_NEXT_CHAPTER_ID", (nextChapterId) => {
    return {
        payload: nextChapterId,
    };
});