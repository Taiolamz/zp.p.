import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContainer, LoaderModal } from '../../atoms';

import {
  colors,
  routesPath,
  dateFormat,
  capitalizeFirstLetter,
  timeFormat,
  images,
  determineVericationDocState,
  spacing,
} from '../../utils';
import {
  RoleDetailsPermissionContainer,
  RoleDetailsPermissionContentOne,
  RoleDetailsPermissionContentTwo,
  RoleDetailsAccess,
  RoleDetailsUpdateContainer,
  RoleDetailsAllUsersContainer,
  RoleDetailsNameContainer,
  RoleDetailsHorizontalLine,
} from './style';
import { H2, H3 } from '../../styles';

import { getUserProfileRequest, getUserProfileReset } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { Dictionary } from '../../types';
import { Switch, BorderedText, Picker } from '../../components';
import { boolean } from 'yup';
const { USERS } = routesPath;

function CreateRole() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [toggleAllPermissions, setToggleAllPermissions] = useState<boolean>(false);
  //   dashboard
  const [toggleDashboard, setToggleDashboard] = useState<boolean>(false);
  // support
  const [toggleSupport, setToggleSupport] = useState(false);
  const [toggleCanEditSupport, setToggleCanEditSupport] = useState<boolean>(false);

  // kyc
  const [toggleKyc, setToggleKyc] = useState<boolean>(false);
  const [toggleAllKycAccessRight, setToggleAllKycAccessRight] = useState<boolean>(false);
  const [toggleCanAcceptKyc, setToggleCanAcceptKyc] = useState<boolean>(false);
  const [toggleCanRejectKyc, setToggleCanRejectKyc] = useState<boolean>(false);
  // settlement
  const [toggleSettlement, setToggleSettlement] = useState<boolean>(false);
  const [toggleAllSettlementAccessRight, setToggleAllSettlementAccessRight] = useState<boolean>(false);
  // reconcilation
  const [toggleReconciliation, setToggleReconciliation] = useState<boolean>(false);
  const [toggleCanReconcileAccount, setToggleCanReconcileAccount] = useState<boolean>(false);
  // users
  const [toggleUsers, setToggleUsers] = useState(false);
  const [toggleCanEditUsers, setToggleCanEditUsers] = useState<boolean>(false);
  // transaction
  const [toggleTransactions, setToggleTransactions] = useState<boolean>(false);
  // settings
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [toggleCanEditSettings, setToggleCanEditSettings] = useState<boolean>(false);

  const [currentAccess, setCurrentAccess] = useState<string>('');
  const [selectedUserType, setSelectedUserType] = useState('');

  const canViewDashboard = 'can view dashboard';
  //   support
  const canViewSupport = 'can view support';
  const canEditSupport = 'can edit support';
  //   kyc
  const canViewKyc = 'can view kyc';
  const canAcceptKyc = 'can accept kyc';
  const canRejectKyc = 'can reject kyc';
  // settlement
  const canViewSettlement = 'can view settlement';
  // reconciliation
  const canViewReconciliation = 'can view reconciliation';
  const canReconcileAccount = 'can reconcile account';
  // users
  const canViewUsers = 'can view users';
  const canEditUsers = 'can edit users';
  // transactions
  const canViewTransaction = 'can view transaction';
  // settings
  const canViewSettings = 'can view settings';
  const canEditSettings = 'can edit settings';

  // can vie all access rights

  function addStingToArray(arr: string[], string: string) {
    var index = arr.indexOf(string);

    if (index === -1) {
      arr.push(string); // String does not exist in the array, so add it
    } else {
      //   arr.splice(index, 1);
      arr = arr.filter(e => e !== string);
    }

    return arr;
  }

  function removeStingToArray(arr: string[], string: string) {
    arr = arr.filter(e => e !== string);
    // arr.splice(index, 1); // String exists in the array, so remove it

    return arr;
  }

  function getAdminUserSelectedRoles(
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
      console.log(resultArr, 'arr result');
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
    console.log(resultArr, 'final result');
    return resultArr;
  }

  useEffect(() => {
    const allArrResult = getAdminUserSelectedRoles(
      toggleAllPermissions,
      toggleDashboard,
      toggleSupport,
      toggleCanEditSupport,
      toggleKyc,
      toggleAllKycAccessRight,
      toggleCanAcceptKyc,
      toggleCanRejectKyc,
      toggleSettlement,
      toggleAllSettlementAccessRight,
      toggleReconciliation,
      toggleCanReconcileAccount,
      toggleUsers,
      toggleCanEditUsers,
      toggleTransactions,
      toggleSettings,
      toggleCanEditSettings,
    );

    console.log(allArrResult, 'allArrResult');
  }, [
    toggleAllPermissions,
    toggleDashboard,
    toggleSupport,
    toggleCanEditSupport,
    toggleKyc,
    toggleAllKycAccessRight,
    toggleCanAcceptKyc,
    toggleCanRejectKyc,
    toggleSettlement,
    toggleAllSettlementAccessRight,
    toggleReconciliation,
    toggleCanReconcileAccount,
    toggleUsers,
    toggleCanEditUsers,
    toggleTransactions,
    toggleSettings,
    toggleCanEditSettings,
  ]);

  return (
    <AppContainer goBack={() => navigate(USERS)} navTitle={`USER CONTROL USERS`} navHelper="ROLE DETAILS">
      <div>
        <H2 left semiBold style={{ marginTop: spacing.small, marginBottom: spacing.small }}>
          Role Details
        </H2>
        <RoleDetailsNameContainer>
          <H3 style={{ marginRight: spacing.small }}>Role Name</H3>
          <BorderedText
            color={colors.primary}
            text="Executive Access"
            backgroundColor="transparent"
            borderColor={colors.primary}
          />
        </RoleDetailsNameContainer>
        <RoleDetailsHorizontalLine />

        <H3 left semiBold style={{ marginBottom: spacing.small }}>
          Permissions
        </H3>

        <RoleDetailsPermissionContainer>
          <RoleDetailsPermissionContentOne>
            <Switch
              borderRadius={false}
              backgroundColor={'transparent'}
              borderColor={'transparent'}
              custom
              onChange={checked => {
                setToggleAllPermissions(!toggleAllPermissions);
                setCurrentAccess(canViewDashboard);
                if (checked) {
                  setToggleAllPermissions(true);
                  setToggleDashboard(true);
                  setToggleSupport(true);
                  setToggleCanEditSupport(true);
                  setToggleKyc(true);
                  setToggleAllKycAccessRight(true);
                  setToggleCanAcceptKyc(true);
                  setToggleCanRejectKyc(true);
                  setToggleSettlement(true);
                  setToggleAllSettlementAccessRight(true);
                  setToggleReconciliation(true);
                  setToggleCanReconcileAccount(true);
                  setToggleUsers(true);
                  setToggleCanEditUsers(true);
                  setToggleTransactions(true);
                  setToggleSettings(true);
                  setToggleCanEditSettings(true);
                } else {
                  setToggleAllPermissions(false);
                  setToggleDashboard(false);
                  setToggleSupport(false);
                  setToggleCanEditSupport(false);
                  setToggleKyc(false);
                  setToggleAllKycAccessRight(false);
                  setToggleCanAcceptKyc(false);
                  setToggleCanRejectKyc(false);
                  setToggleSettlement(false);
                  setToggleAllSettlementAccessRight(false);
                  setToggleReconciliation(false);
                  setToggleCanReconcileAccount(false);
                  setToggleUsers(false);
                  setToggleCanEditUsers(false);
                  setToggleTransactions(false);
                  setToggleSettings(false);
                  setToggleCanEditSettings(false);
                }
              }}
              checked={toggleAllPermissions}
              label="Toggle All"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => {
                setToggleDashboard(!toggleDashboard);
                setCurrentAccess(canViewDashboard);
              }}
              checked={toggleDashboard}
              label="Dashboard"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={checked => {
                setToggleKyc(!toggleKyc);
                setCurrentAccess(canViewKyc);
                if (!checked) {
                  setToggleAllKycAccessRight(false);
                  setToggleCanAcceptKyc(false);
                  setToggleCanRejectKyc(false);
                }
              }}
              checked={toggleKyc}
              label="KYC"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={checked => {
                setToggleSupport(!toggleSupport);
                setCurrentAccess(canViewSupport);
                if (!checked) {
                  setToggleCanEditSupport(false);
                }
              }}
              checked={toggleSupport}
              label="Support"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={checked => {
                setToggleSettlement(!toggleSettlement);
                setCurrentAccess(canViewSettlement);
                if (!checked) {
                  setToggleAllSettlementAccessRight(false);
                  setToggleReconciliation(false);
                  setToggleCanReconcileAccount(false);
                }
              }}
              checked={toggleSettlement}
              label="Settlements"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={checked => {
                setToggleUsers(!toggleUsers);
                setCurrentAccess(canViewUsers);
                if (!checked) {
                  setToggleCanEditUsers(false);
                }
              }}
              checked={toggleUsers}
              label="User Control"
              marginBottom={spacing.xxsmall}
            />

            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => {
                setToggleTransactions(!toggleTransactions);
                setCurrentAccess(canViewTransaction);
              }}
              checked={toggleTransactions}
              label="Transactions"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={colors.purpleVariantThree}
              borderColor={colors.greyVariantSix}
              custom
              onChange={checked => {
                setToggleSettings(!toggleSettings);
                setCurrentAccess(canViewSettings);
                if (!checked) {
                  setToggleCanEditSettings(false);
                }
              }}
              checked={toggleSettings}
              label="App Contents"
              marginBottom={spacing.xxsmall}
              labelColor={colors.white}
            />

            <RoleDetailsUpdateContainer>
              <BorderedText color={colors.white} text="Update Role" backgroundColor={colors.primary} />
              <BorderedText color={colors.greyDark} text="Cancel" backgroundColor="transparent" />
            </RoleDetailsUpdateContainer>
          </RoleDetailsPermissionContentOne>

          {/* second part */}
          {/* dashbord */}
          {currentAccess === canViewDashboard && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={() => setToggleDashboard(!toggleDashboard)}
                  checked={toggleDashboard}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleDashboard)}
                  checked={toggleDashboard}
                  label="Can View dashboard"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}

          {/* kyc */}
          {currentAccess === canViewKyc && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={checked => {
                    setToggleAllKycAccessRight(!toggleAllKycAccessRight);
                    if (checked) {
                      setToggleCanAcceptKyc(true);
                      setToggleCanRejectKyc(true);
                    } else {
                      setToggleCanAcceptKyc(false);
                      setToggleCanRejectKyc(false);
                    }
                  }}
                  checked={toggleAllKycAccessRight}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleCanAcceptKyc(!toggleCanAcceptKyc)}
                  checked={toggleCanAcceptKyc}
                  label="Can Accept KYC"
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleCanRejectKyc(!toggleCanRejectKyc)}
                  checked={toggleCanRejectKyc}
                  label="Can Reject KYC"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}

          {/* support */}
          {currentAccess === canViewSupport && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={() => setToggleCanEditSupport(!toggleCanEditSupport)}
                  checked={toggleCanEditSupport}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleCanEditSupport(!toggleCanEditSupport)}
                  checked={toggleCanEditSupport}
                  label="Access Support"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}

          {/* settlement */}
          {currentAccess === canViewSettlement && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={checked => {
                    setToggleAllSettlementAccessRight(!toggleAllSettlementAccessRight);
                    if (checked) {
                      setToggleReconciliation(true);
                      setToggleCanReconcileAccount(true);
                    } else {
                      setToggleReconciliation(false);
                      setToggleCanReconcileAccount(false);
                    }
                  }}
                  checked={toggleAllSettlementAccessRight}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleReconciliation(!toggleReconciliation)}
                  checked={toggleReconciliation}
                  label="View Reconciliation"
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleCanReconcileAccount(!toggleCanReconcileAccount)}
                  checked={toggleCanReconcileAccount}
                  label="Can Reconcile Account"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}

          {/* users */}
          {currentAccess === canViewUsers && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={() => setToggleCanEditUsers(!toggleCanEditUsers)}
                  checked={toggleCanEditUsers}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleCanEditUsers(!toggleCanEditUsers)}
                  checked={toggleCanEditUsers}
                  label="Can edit Users controls"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}

          {/* transactions */}
          {currentAccess === canViewTransaction && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={() => setToggleTransactions(!toggleTransactions)}
                  checked={toggleTransactions}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleTransactions(!toggleTransactions)}
                  checked={toggleTransactions}
                  label="Access Transactions"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}

          {/* settings */}
          {currentAccess === canViewSettings && (
            <RoleDetailsPermissionContentTwo>
              <RoleDetailsAllUsersContainer>
                <Picker
                  label=" "
                  selectedValue={setSelectedUserType}
                  placeholder="All Users"
                  options={[
                    { label: 'All Users', value: 'all-users' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />

                <Switch
                  borderRadius={false}
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  custom
                  onChange={() => setToggleCanEditSettings(!toggleCanEditSettings)}
                  checked={toggleCanEditSettings}
                  label="Toggle All"
                  marginBottom={spacing.xxsmall}
                  labelRightSpace
                />
              </RoleDetailsAllUsersContainer>

              <RoleDetailsAccess>
                <Switch
                  borderRadius={true}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={colors.greyVariantTwo}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleDashboard(!toggleAllPermissions)}
                  checked={toggleAllPermissions}
                  label="Access Right"
                  labelTwo={'Status'}
                />
                <Switch
                  borderRadius={false}
                  paddingVertical={spacing.xsmall}
                  backgroundColor={'white'}
                  borderColor={colors.greyVariantTwo}
                  paddingLeft={spacing.small}
                  paddingRight={spacing.medium}
                  custom
                  onChange={() => setToggleCanEditSettings(!toggleCanEditSettings)}
                  checked={toggleCanEditSettings}
                  label="Can edit settings"
                />
              </RoleDetailsAccess>
            </RoleDetailsPermissionContentTwo>
          )}
        </RoleDetailsPermissionContainer>
      </div>
    </AppContainer>
  );
}

export default CreateRole;
