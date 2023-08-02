import { configureStore } from '@reduxjs/toolkit'
import authorReducer from './reducers/me_authors'
import mangasReducer from './reducers/mangas_news'
import mangaReducer from './reducers/manga'
import checkReducer  from "./reducers/mangas";
import chaptersReducer from "./reducers/chapters";
import authors from './reducers/authors';
import commentsReducer from './reducers/comments';

export const store = configureStore ({
  reducer: {
    manga:mangaReducer,
    author: authorReducer,
    mangas: mangasReducer,
    check:checkReducer,
    chapters: chaptersReducer,
    authors: authors,
    comments: commentsReducer,
  }
})