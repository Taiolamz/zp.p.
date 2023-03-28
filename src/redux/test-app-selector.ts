import {
  loginSliceReducer,
  authSliceReducer,
  logoutSliceReducer,
  getTransactionsSliceReducer,
  getReconciliationAccountSliceReducer,
  reconcileAccountSliceReducer,
} from "./slice";
const state = {
  login: loginSliceReducer,
  auth: authSliceReducer,
  logout: logoutSliceReducer,
  getTransactions: getTransactionsSliceReducer,
  getReconciliationAccount: getReconciliationAccountSliceReducer,
  reconcileAccount: reconcileAccountSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
