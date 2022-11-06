import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: boolean = false;
const slice = createSlice({
  "name": "loadingSpinner",
  initialState,
  "reducers": {
    "toggleLoadingSpinner": (state, action: PayloadAction<boolean>) => {
      state = action.payload;

      return state;
    }
  }
});

export const LoadingSpinnerActions = slice.actions;

export const LoadingSpinnerReducer = slice.reducer;
