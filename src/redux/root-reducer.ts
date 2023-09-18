import { combineReducers } from '@reduxjs/toolkit';
import {
  loginSliceReducer,
  authSliceReducer,
  logoutSliceReducer,
  getTransactionsSliceReducer,
  getArticlesSliceReducer,
  getReconciliationAccountSliceReducer,
  getReconciliationAccountDetailSliceReducer,
  reconcileAccountSliceReducer,
  getEscalationAgentsSliceReducer,
  createEscalationTicketSliceReducer,
  getTransactionByIdSliceReducer,
  getArticleByIdSliceReducer,
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
  resetInternalUserPasswordSliceReducer,
  getRolesSliceReducer,
  createRoleSliceReducer,
  createArticleReducer,
  updateRoleSliceReducer,
  getSingleRoleSliceReducer,
  deleteRoleSliceReducer,

  updateArticleSliceReducer,
  deleteArticleSliceReducer,

  getAllFaqsSliceReducer,
  createFaqSliceReducer,
  getTagsSliceReducer,
  deleteFaqSliceReducer,
  updateFaqSliceReducer,
  getFaqSliceReducer,

  dashboardSliceReducer,
  customerGrowthInsightSliceReducer,
  transactionVolumeSliceReducer,

  getNotificationByIdSliceReducer,
  getNotificationSliceReducer,
  deleteNotificationSliceReducer,
  createNotificationSliceReducer,
  updateNotificationSliceReducer,
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
  resetInternalUserPassword: resetInternalUserPasswordSliceReducer,
  getRoles: getRolesSliceReducer,
  createRole: createRoleSliceReducer,
  createArticle: createArticleReducer,
  updateRole: updateRoleSliceReducer,
  getSingleRole: getSingleRoleSliceReducer,
  deleteRole: deleteRoleSliceReducer,
  getArticles: getArticlesSliceReducer,
  getArticleById: getArticleByIdSliceReducer,
  updateArticle: updateArticleSliceReducer,
  deleteArticle: deleteArticleSliceReducer,
  getAllFaqs: getAllFaqsSliceReducer,
  createFaq: createFaqSliceReducer,
  getTags: getTagsSliceReducer,
  deleteFaq: deleteFaqSliceReducer,
  updateFaq: updateFaqSliceReducer,
  getFaq: getFaqSliceReducer,
  dashboard: dashboardSliceReducer,
  customer_growth_insight: customerGrowthInsightSliceReducer,
  transaction_volume: transactionVolumeSliceReducer,
  getNotificationById: getNotificationByIdSliceReducer,
  getNotification: getNotificationSliceReducer,
  deleteNotification: deleteNotificationSliceReducer,
  createNotification: createNotificationSliceReducer,
  updateNotification: updateNotificationSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
