import {combineReducers} from "@reduxjs/toolkit";
import {LoadingSpinnerReducer} from "./Slices/LoadingSpinner.slice";
import {LanguageReducer} from "./Slices/Language.slice";

export const rootReducer = combineReducers({
  "loadingSpinner": LoadingSpinnerReducer,
  "language": LanguageReducer
});
