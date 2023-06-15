import { combineReducers } from '@reduxjs/toolkit';
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
  getRolesDropDownSliceReducer,
  createInternalUserSliceReducer,
  updateInternalUserSliceReducer,
} from './slice';

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
  getRolesDropDown: getRolesDropDownSliceReducer,
  createInternalUser: createInternalUserSliceReducer,
  updateInternalUser: updateInternalUserSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
