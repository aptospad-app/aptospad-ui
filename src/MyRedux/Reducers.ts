import {combineReducers} from "@reduxjs/toolkit";
import {LoadingSpinnerReducer} from "./Slices/LoadingSpinner.slice";
import {LanguageReducer} from "./Slices/Language.slice";
import {ChooseWalletPopupReducer} from "./Slices/ChooseWalletPopup.slice";
import {WalletReducer} from "./Slices/Wallet.slice";

export const rootReducer = combineReducers({
  "loadingSpinner": LoadingSpinnerReducer,
  "language": LanguageReducer,
  "chooseWalletPopup": ChooseWalletPopupReducer,
  "wallet": WalletReducer
});
