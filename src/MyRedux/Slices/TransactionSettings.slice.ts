import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITF_TransactionSettings} from "@/TS";

const initialState: ITF_TransactionSettings = {
  "slippage": "0.5",
  "deadline": "60",
  "maxGasFee": "20000"
};
const slice = createSlice({
  "name": "transactionSettings",
  initialState,
  "reducers": {
    "set": (state, action: PayloadAction<Partial<ITF_TransactionSettings>>) => {
      state = {...state, ...action.payload};

      return state;
    }
  }
});

export const TransactionSettingsActions = slice.actions;

export const TransactionSettingsReducer = slice.reducer;
