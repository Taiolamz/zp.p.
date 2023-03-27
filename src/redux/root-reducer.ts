import { combineReducers } from "@reduxjs/toolkit";
import {
  loginSliceReducer,
  authSliceReducer,
  logoutSliceReducer,
  getTransactionsSliceReducer,
} from "./slice";

const rootReducer = combineReducers({
  login: loginSliceReducer,
  auth: authSliceReducer,
  logout: logoutSliceReducer,
  getTransactions: getTransactionsSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
