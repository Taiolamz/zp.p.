import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContainer, ActivityActionModal } from '../../atoms';

import {
  colors,
  routesPath,
  images,
  spacing,
  getAdminUserSelectedRoles,
  // files
  canViewDashboard,
  canViewSupport,
  canViewKyc,
  canViewSettlement,
  canViewUsers,
  canViewTransaction,
  canViewSettings,
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
import { createRoleRequest, createRoleReset } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { Switch, Picker, Input, Button } from '../../components';

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

  const [currentAccess, setCurrentAccess] = useState<string>(canViewDashboard);
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [roleNameValue, setRoleNameValue] = useState('');
  const [roleNameError, setRoleNameError] = useState('');

  // redux state
  const createRoleState = useAppSelector(state => state.createRole);
  const { status: createRoleStatus } = createRoleState;

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
    setSelectedUserRoles(allArrResult);
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

  const handleCreateRole = () => {
    if (roleNameValue.length < 2) {
      setRoleNameError('Enter role name');
    } else {
      setRoleNameError('');
      const payload = {
        role: roleNameValue,
        permissions: selectedUserRoles,
      };

      console.log(payload, 'payload');
      dispatch(createRoleRequest(payload));
    }
  };

  return (
    <AppContainer goBack={() => navigate(USERS)} navTitle={`USER CONTROL USERS`} navHelper="ROLE DETAILS">
      <div>
        <H2 left semiBold style={{ marginTop: spacing.small, marginBottom: spacing.small }}>
          Role Details
        </H2>
        <RoleDetailsNameContainer>
          <H3 style={{ marginRight: spacing.small }}>Role Name</H3>

          <Input
            label=""
            type="text"
            name="roleNameValue"
            placeholder="Enter Role Name"
            value={roleNameValue}
            onChange={(e: any) => {
              setRoleNameValue(e.target.value);
              setRoleNameError('');
            }}
            error={roleNameError}
            backgroundColor={colors.white}
            borderColor={colors.greyVariantTwo}
            marginBottom={'0px'}
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
              <Button
                onClick={handleCreateRole}
                type="submit"
                text="Create Role"
                disabled={createRoleStatus === 'loading'}
              />
              <Button
                onClick={() => {}}
                type="submit"
                text="Cancel"
                disabled={false}
                backgroundColor={'transparent'}
                color={colors.primary}
                borderColor={'transparent'}
              />
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

        <ActivityActionModal
          actionClick={() => {
            dispatch(createRoleReset());
            navigate(USERS);
          }}
          closeModal={() => {
            dispatch(createRoleReset());
            navigate(USERS);
          }}
          actionText="Close"
          isLoading={false}
          isModalVisible={createRoleStatus === 'succeeded'}
          text={'You have successfully created a new role'}
          image={images.check}
        />
      </div>
    </AppContainer>
  );
}

export default CreateRole;
