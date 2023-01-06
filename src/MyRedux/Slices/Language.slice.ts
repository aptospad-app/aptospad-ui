import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string = "en";
const slice = createSlice({
  "name": "language",
  initialState,
  "reducers": {
    "setLanguage": (state, action: PayloadAction<string>) => {
      state = action.payload;

      return state;
    }
  }
});

export const LanguageActions = slice.actions;

export const LanguageReducer = slice.reducer;
