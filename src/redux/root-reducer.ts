import { combineReducers } from "@reduxjs/toolkit";
import {
  loginSliceReducer,
  authSliceReducer,
  logoutSliceReducer,
  getTransactionsSliceReducer,
  getReconciliationAccountSliceReducer,
  getReconciliationAccountDetailSliceReducer,
  reconcileAccountSliceReducer,
} from "./slice";

const rootReducer = combineReducers({
  login: loginSliceReducer,
  auth: authSliceReducer,
  logout: logoutSliceReducer,
  getTransactions: getTransactionsSliceReducer,
  getReconciliationAccount: getReconciliationAccountSliceReducer,
  getReconciliationAccountDetail: getReconciliationAccountDetailSliceReducer,
  reconcileAccount: reconcileAccountSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
