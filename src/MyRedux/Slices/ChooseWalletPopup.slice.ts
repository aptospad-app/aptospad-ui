import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: boolean = false;
const slice = createSlice({
  "name": "chooseWalletPopup",
  initialState,
  "reducers": {
    "toggleChooseWalletPopup": (state, action: PayloadAction<boolean>) => {
      state = action.payload;

      return state;
    }
  }
});

export const ChooseWalletPopupActions = slice.actions;

export const ChooseWalletPopupReducer = slice.reducer;
