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
  deleteUserSavedBankSliceReducer,
  updateUserStatusSliceReducer,
  getUserProfileTransactionSliceReducer,
  getDocumentHistorySliceReducer,
  getUserSubAgentsSliceReducer,
  getAllTransactionsSliceReducer,
  downloadTransactionByIdSliceReducer,
  downloadTransactionsSliceReducer,
  getInternalUsersSliceReducer,
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
  deleteUserSavedBank: deleteUserSavedBankSliceReducer,
  updateUserStatus: updateUserStatusSliceReducer,
  getUserProfileTransaction: getUserProfileTransactionSliceReducer,
  getDocumentHistory: getDocumentHistorySliceReducer,
  getUserSubAgents: getUserSubAgentsSliceReducer,
  getAllTransactions: getAllTransactionsSliceReducer,
  downloadTransactionById: downloadTransactionByIdSliceReducer,
  downloadTransactions: downloadTransactionsSliceReducer,
  getInternalUsers: getInternalUsersSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
