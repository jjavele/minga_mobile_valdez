import { createReducer } from "@reduxjs/toolkit";
import  inputActions from "../actions/mangas";

const initialState = {
  text: "",
  checks: [],
  page: 1,
};

const mangaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(inputActions.changeText, (state, action) => {
      state.text = action.payload;
    })
    .addCase(inputActions.changeChecks, (state, action) => {
      state.checks = action.payload;
    });
});

export default mangaReducer;
