import {store, rootReducer} from "@/MyRedux";

export type Type_RootState = ReturnType<typeof rootReducer>;
export type Type_AppDispatch = typeof store.dispatch;
