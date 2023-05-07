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
  exportTransactionByIdToMailSliceReducer,
  settlementAnalyticsSliceReducer,
  getKycsSliceReducer,
  getKycsAnalyticsSliceReducer,
  getKycCustomerSliceReducer,
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
  exportTransactionByIdToMail: exportTransactionByIdToMailSliceReducer,
  settlementAnalytics: settlementAnalyticsSliceReducer,
  getKycs: getKycsSliceReducer,
  getKycsAnalytics: getKycsAnalyticsSliceReducer,
  getKycCustomer: getKycCustomerSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
