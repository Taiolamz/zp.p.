import {
  loginSliceReducer,
  authSliceReducer,
  logoutSliceReducer,
  getTransactionsSliceReducer,
  getReconciliationAccountSliceReducer,
  reconcileAccountSliceReducer,
  getEscalationAgentsSliceReducer,
  createEscalationTicketSliceReducer,
  getTransactionByIdSliceReducer,
} from "./slice";
const state = {
  login: loginSliceReducer,
  auth: authSliceReducer,
  logout: logoutSliceReducer,
  getTransactions: getTransactionsSliceReducer,
  getReconciliationAccount: getReconciliationAccountSliceReducer,
  reconcileAccount: reconcileAccountSliceReducer,
  getEscalationAgents: getEscalationAgentsSliceReducer,
  createEscalationTicket: createEscalationTicketSliceReducer,
  getTransactionById: getTransactionByIdSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
