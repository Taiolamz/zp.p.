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
  kycVerificationSliceReducer,
  getSuperAgentsSliceReducer,
  getUsersSliceReducer,
  getUserProfileSliceReducer,
  getUserVerificationsSliceReducer,
  getProfileViewHistorySliceReducer,
  getLoginHistorySliceReducer,
  getUserTransactionsSliceReducer,
  getUserSavedBanksSliceReducer,
} from './slice';
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
  kycVerification: kycVerificationSliceReducer,
  getSuperAgents: getSuperAgentsSliceReducer,
  getUsers: getUsersSliceReducer,
  getUserProfile: getUserProfileSliceReducer,
  getUserVerifications: getUserVerificationsSliceReducer,
  getProfileViewHistory: getProfileViewHistorySliceReducer,
  getLoginHistory: getLoginHistorySliceReducer,
  getUserTransactions: getUserTransactionsSliceReducer,
  getUserSavedBanks: getUserSavedBanksSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
