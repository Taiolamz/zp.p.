import storage from "redux-persist/lib/storage";
import { configureStore, Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import rootReducer, { RootState } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
