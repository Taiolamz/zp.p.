import { addStingToArray, removeStingToArray } from './';
// access types
export const canViewDashboard = 'can view dashboard';
//   support
export const canViewSupport = 'can view support';
export const canEditSupport = 'can edit support';
//   kyc
export const canViewKyc = 'can view kyc';
export const canAcceptKyc = 'can accept kyc';
export const canRejectKyc = 'can reject kyc';
// settlement
export const canViewSettlement = 'can view settlement';
// reconciliation
export const canViewReconciliation = 'can view reconciliation';
export const canReconcileAccount = 'can reconcile account';
// users
export const canViewUsers = 'can view users';
export const canEditUsers = 'can edit users';
// transactions
export const canViewTransaction = 'can view transaction';
// settings
export const canViewSettings = 'can view settings';
export const canEditSettings = 'can edit settings';

export function getAdminUserSelectedRoles(
  toggleAllPermissions: boolean,
  toggleDashboard: boolean,
  toggleSupport: boolean,
  toggleCanEditSupport: boolean,
  toggleKyc: boolean,
  toggleAllKycAccessRight: boolean,
  toggleCanAcceptKyc: boolean,
  toggleCanRejectKyc: boolean,
  toggleSettlement: boolean,
  toggleAllSettlementAccessRight: boolean,
  toggleReconciliation: boolean,
  toggleCanReconcileAccount: boolean,
  toggleUsers: boolean,
  toggleCanEditUsers: boolean,
  toggleTransactions: boolean,
  toggleSettings: boolean,
  toggleCanEditSettings: boolean,
) {
  let resultArr: string[] = [];
  if (toggleAllPermissions) {
    resultArr = [
      canViewDashboard,
      canViewSupport,
      canViewKyc,
      canViewSettlement,
      canViewReconciliation,
      canViewUsers,
      canViewTransaction,
      canViewSettings,
    ];
  }
  if (!toggleAllPermissions) {
    resultArr = [];
  }

  if (toggleDashboard) {
    addStingToArray(resultArr, canViewDashboard);
  }
  if (!toggleDashboard) {
    removeStingToArray(resultArr, canViewDashboard);
  }
  if (toggleSupport) {
    addStingToArray(resultArr, canViewSupport);
    addStingToArray(resultArr, canEditSupport);
  }
  if (!toggleSupport) {
    removeStingToArray(resultArr, canViewSupport);
    removeStingToArray(resultArr, canEditSupport);
  }
  if (toggleCanEditSupport) {
    addStingToArray(resultArr, canEditSupport);
  }
  if (!toggleCanEditSupport) {
    removeStingToArray(resultArr, canEditSupport);
  }
  if (toggleKyc) {
    addStingToArray(resultArr, canViewKyc);
  }
  if (!toggleKyc) {
    removeStingToArray(resultArr, canViewKyc);
    removeStingToArray(resultArr, canAcceptKyc);
    removeStingToArray(resultArr, canRejectKyc);
  }
  if (toggleAllKycAccessRight) {
    addStingToArray(resultArr, canAcceptKyc);
    addStingToArray(resultArr, canRejectKyc);
  }
  if (!toggleAllKycAccessRight) {
    removeStingToArray(resultArr, canAcceptKyc);
    removeStingToArray(resultArr, canRejectKyc);
  }
  if (toggleCanAcceptKyc) {
    addStingToArray(resultArr, canAcceptKyc);
  }
  if (!toggleCanAcceptKyc) {
    removeStingToArray(resultArr, canAcceptKyc);
  }
  if (toggleCanRejectKyc) {
    addStingToArray(resultArr, canRejectKyc);
  }
  if (!toggleCanRejectKyc) {
    removeStingToArray(resultArr, canRejectKyc);
  }
  if (toggleSupport) {
    addStingToArray(resultArr, canViewSupport);
  }
  if (!toggleSupport) {
    removeStingToArray(resultArr, canViewSupport);
    removeStingToArray(resultArr, canEditSupport);
  }
  if (toggleCanEditSupport) {
    addStingToArray(resultArr, canEditSupport);
  }
  if (!toggleCanEditSupport) {
    removeStingToArray(resultArr, canEditSupport);
  }
  if (toggleSettlement) {
    addStingToArray(resultArr, canViewSettlement);
  }
  if (!toggleSettlement) {
    removeStingToArray(resultArr, canViewSettlement);
  }
  if (toggleAllSettlementAccessRight) {
    addStingToArray(resultArr, canViewReconciliation);
    addStingToArray(resultArr, canReconcileAccount);
  }
  if (!toggleAllSettlementAccessRight) {
    removeStingToArray(resultArr, canViewReconciliation);
    removeStingToArray(resultArr, canReconcileAccount);
  }
  if (toggleReconciliation) {
    addStingToArray(resultArr, canViewReconciliation);
  }
  if (!toggleReconciliation) {
    removeStingToArray(resultArr, canViewReconciliation);
  }
  if (toggleCanReconcileAccount) {
    addStingToArray(resultArr, canReconcileAccount);
  }
  if (!toggleCanReconcileAccount) {
    removeStingToArray(resultArr, canReconcileAccount);
  }
  if (toggleUsers) {
    addStingToArray(resultArr, canViewUsers);
  }
  if (!toggleUsers) {
    removeStingToArray(resultArr, canViewUsers);
    removeStingToArray(resultArr, canEditUsers);
  }
  if (toggleCanEditUsers) {
    addStingToArray(resultArr, canEditUsers);
  }
  if (!toggleCanEditUsers) {
    removeStingToArray(resultArr, canEditUsers);
  }
  if (toggleTransactions) {
    addStingToArray(resultArr, canViewTransaction);
  }
  if (!toggleTransactions) {
    removeStingToArray(resultArr, canViewTransaction);
  }
  if (toggleSettings) {
    addStingToArray(resultArr, canViewSettings);
  }
  if (!toggleSettings) {
    removeStingToArray(resultArr, canViewSettings);
    removeStingToArray(resultArr, canEditSettings);
  }
  if (toggleCanEditSettings) {
    addStingToArray(resultArr, canEditSettings);
  }
  if (!toggleCanEditSettings) {
    removeStingToArray(resultArr, canEditSettings);
  }

  return resultArr;
}
