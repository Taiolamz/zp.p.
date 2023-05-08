import { combineReducers } from "@reduxjs/toolkit";
import {
  loginSliceReducer,
  authSliceReducer,
  logoutSliceReducer,
  getTransactionsSliceReducer,
  getReconciliationAccountSliceReducer,
  getReconciliationAccountDetailSliceReducer,
  reconcileAccountSliceReducer,
  getEscalationAgentsSliceReducer,
  createEscalationTicketSliceReducer,
  getTransactionByIdSliceReducer,
  exportTransactionByIdToMailSliceReducer,
  settlementAnalyticsSliceReducer,
  getKycsSliceReducer,
  getKycsAnalyticsSliceReducer,
  getKycCustomerSliceReducer,
  kycVerificationSliceReducer,
} from "./slice";

const rootReducer = combineReducers({
  login: loginSliceReducer,
  auth: authSliceReducer,
  logout: logoutSliceReducer,
  getTransactions: getTransactionsSliceReducer,
  getReconciliationAccount: getReconciliationAccountSliceReducer,
  getReconciliationAccountDetail: getReconciliationAccountDetailSliceReducer,
  reconcileAccount: reconcileAccountSliceReducer,
  getEscalationAgents: getEscalationAgentsSliceReducer,
  createEscalationTicket: createEscalationTicketSliceReducer,
  getTransactionById: getTransactionByIdSliceReducer,
  exportTransactionByIdToMail: exportTransactionByIdToMailSliceReducer,
  settlementAnalytics: settlementAnalyticsSliceReducer,
  getKycs: getKycsSliceReducer,
  getKycsAnalytics: getKycsAnalyticsSliceReducer,
  getKycCustomer: getKycCustomerSliceReducer,
  kycVerification: kycVerificationSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
