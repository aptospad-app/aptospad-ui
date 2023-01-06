import {combineReducers} from "@reduxjs/toolkit";
import {LoadingSpinnerReducer} from "./Slices/LoadingSpinner.slice";
import {LanguageReducer} from "./Slices/Language.slice";
import {PopupsReducer} from "./Slices/Popups.slice";
import {WalletReducer} from "./Slices/Wallet.slice";
import {TransactionSettingsReducer} from "./Slices/TransactionSettings.slice";

export const rootReducer = combineReducers({
  "loadingSpinner": LoadingSpinnerReducer,
  "language": LanguageReducer,
  "popups": PopupsReducer,
  "wallet": WalletReducer,
  "transactionSettings": TransactionSettingsReducer
});
