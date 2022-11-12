import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITF_Wallet} from "@/TS";

const initialState: ITF_Wallet = {
  "walletName": "",
  "accountAddress": "",
  "chainId": ""
};
const slice = createSlice({
  "name": "wallet",
  initialState,
  "reducers": {
    "connectWallet": (state, action: PayloadAction<ITF_Wallet>) => {
      state = {...state, ...action.payload};

      return state;
    },
    "disconnectWallet": (state, action: PayloadAction) => {
      state = {...initialState};

      return state;
    }
  }
});

export const WalletActions = slice.actions;

export const WalletReducer = slice.reducer;
