/**
 * References:
 * https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
 * https://stackoverflow.com/questions/69978434/persist-reducer-function-giving-type-error-to-my-reducer-in-typescript
 */

import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {rootReducer} from "./Reducers";
import {createLogger} from "redux-logger";

const persistConfig = {
  "key": "root",
  storage,
  "stateReconciler": autoMergeLevel2,
  "debug": process.env.NODE_ENV === "development",
  "whitelist": [
    "wallet",
    "language",
    "transactionSettings"
  ]
};

const logger = createLogger({
  "colors": {
    "title": () => "#3ab925",
    "prevState": () => "#c0e014",
    "action": () => "#c0e014",
    "nextState": () => "#c0e014",
    "error": () => "#ff0000"
  },
  "collapsed": () => true,
  "duration": true
});

type Type_RootState = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<Type_RootState>(persistConfig, rootReducer);
const store = configureStore({
  "reducer": persistedReducer,
  "devTools": process.env.NODE_ENV === "development",
  "middleware": (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      "serializableCheck": {
        "ignoredActions": [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });
    if (process.env.NODE_ENV === "development") {
      middlewares.push(logger);
    }

    return middlewares;
  }
});
type Type_AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
const useAppDispatch = () => useDispatch<Type_AppDispatch>();
const useAppSelector: TypedUseSelectorHook<Type_RootState> = useSelector;

export {store, persistor, useAppDispatch, useAppSelector, rootReducer};
export * from "./Actions";
