import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  AppContainer,
  CountInfo,
  TabView,
  LoaderModal,
  MoreIconView,
  CreateInternalUserModal,
  SuccessActionModal,
  ActivityActionModal,
  ProfileActivationToggleModal,
  LoginHistoryOnlyModal,
} from '../../atoms';
import {
  capitalizeFirstLetter,
  colors,
  dateFormat,
  routesPath,
  spacing,
  arrayToString,
  images,
  getWordFromString,
  lowerCaseFirstLetter,
  timeFormat,
} from '../../utils';
import {
  SearchInput,
  UsersTable,
  Pagination,
  BorderedText,
  InternaUsersTable,
  RolesAndPermissionTable,
} from '../../components';
import {
  InternalUserTop,
  InternalUsersContainer,
  SearchContainer,
  TableContainer,
  UserContainer,
  UsersContainer,
} from './style';

import { loginHistoryDataHeader, internalUsersDataHeader, userDataHeader, rolesAndPermissionDataHeader } from './data';
import { Dictionary } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
  getUsersRequest,
  getUsersReset,
  getSuperAgentsRequest,
  getSuperAgentsReset,
  getInternalUsersRequest,
  getRolesDropDownRequest,
  createInternalUserRequest,
  createInternalUserReset,
  updateInternalUserRequest,
  updateInternalUserReset,
  resetInternalUserPasswordRequest,
  resetInternalUserPasswordReset,
  updateUserStatusRequest,
  updateUserStatusReset,
  getLoginHistoryRequest,
  getRolesRequest,
} from '../../redux/slice';

const { USERDETAILS, USERROLES, CREATEUSERROLES } = routesPath;

const activeUser = 'active';
const inActiveUser = 'inactive';

const namedEdit = 'Edit';
const namedDeactivate = 'Deactivate';
const namedReactivate = 'Reactivate';
const namedResetPassword = 'Reset Password';
const namedViewLoginHistory = 'View Login History';

const roleDetails = 'Role Details';
const roleDeleteRole = 'Delete Role';

const userTypeToFetchByActivity = (data: Dictionary) => {
  let result: string = '';
  if (!data?.hasOwnProperty('id') || data?.id === 1) {
    result = activeUser;
  }

  if (data?.id === 3) {
    result = inActiveUser;
  }

  return result;
};

function Users() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [tabViewUsersSelectedIndex, setTabViewUsersSelectedIndex] = useState<any[number]>(1);
  const [selectedUsersCard, setSelectedUsersCard] = useState<Dictionary>({
    id: 1,
    count: 0,
    title: 'Active Users',
  });

  const [tabViewUsersData, setTabViewUsersData] = useState([
    { id: 1, isSelected: true, text: 'Customers' },
    { id: 2, isSelected: false, text: 'Internal Users' },
    { id: 3, isSelected: false, text: 'Roles and permission' },
  ]);
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userCountData, setUserCountData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [usersDataSuperAgent, setUsersDataSuperAgent] = useState<any[]>([]);
  const [selectedInternalUserItem, setSelectedInternalUserItem] = useState<Dictionary>({});
  const [selectedRoleItem, setSelectedRoleItem] = useState<Dictionary>({});
  const [moreIconIsVisible, setMoreIconIsVisible] = useState(false);
  const [roleMoreIconIsVisible, setRoleMoreIconIsVisible] = useState(false);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [selectedTransactionActionText, setSelectedTransactionActionText] = useState('');
  const [selectedRoleActionText, setSelectedRoleActionText] = useState('');
  const [searchInternalUserValue, setSearchInternalUserValue] = useState('');
  const [firstMount, setFirstMount] = useState(true);
  const [internalUsersData, setInternalUsersData] = useState<any[]>([]);
  const [internalUsersDataList, setInternalUsersDataList] = useState<any[]>([]);
  const [createInternalUserIsModalVisible, setCreateInternalUserIsModalVisible] = useState(false);
  const [editInternalUserIsModalVisible, setEditInternalUserIsModalVisible] = useState(false);
  const [rolesData, setRolesData] = useState([
    {
      value: 'admin',
      label: 'Admin',
    },
  ]);
  const [createUserSuccessModalVisible, setCreateUserSuccessModalVisible] = useState(false);
  const [toggleGetInternalUser, setToggleGetInternalUser] = useState(false);
  const [resetPasswordSuccessModalVisible, setResetPasswordSuccessModalVisible] = useState(false);
  const [profileActivationSuccessIsModalVisible, setProfileActivationSuccessIsModalVisible] = useState(false);
  const [profileActivationIsModalVisible, setProfileActivationIsModalVisible] = useState(false);
  const [userAccountStatus, setUserAccountStatus] = useState('');
  const [deactiveMessage, setDeactiveMessage] = useState('');
  const [loginHistoryIsModalVisible, setLoginHistoryIsModalVisible] = useState(false);
  const [loginHistoryData, setLoginHistoryData] = useState<any[]>([]);
  const [userRolesData, setUserRolesData] = useState<any[]>([]);

  const decideUserCurrentStatus: string = userAccountStatus === 'active' ? namedDeactivate : namedReactivate;
  //More Icon for Internal Users
  const moreIconOption = [namedEdit, decideUserCurrentStatus, namedResetPassword, namedViewLoginHistory];
  const roleMoreIconOption = [roleDetails, roleDeleteRole];

  // redux state
  const usersState = useAppSelector(state => state.getUsers);
  const { status: usersStatus } = usersState;

  const superAgentsState = useAppSelector(state => state.getSuperAgents);
  const { status: superAgentsStatus } = superAgentsState;

  const internalUsersState = useAppSelector(state => state.getInternalUsers);
  const { status: internalUsersStatus } = internalUsersState;

  const rolesDropDownState = useAppSelector(state => state.getRolesDropDown);
  const { status: rolesDropDownStatus } = rolesDropDownState;

  const createInternalUserState = useAppSelector(state => state.createInternalUser);
  const { status: createInternalUserStatus } = createInternalUserState;

  const updateInternalUserState = useAppSelector(state => state.updateInternalUser);
  const { status: updateInternalUserStatus } = updateInternalUserState;

  const resetInternalUserPasswordState = useAppSelector(state => state.resetInternalUserPassword);
  const { status: resetInternalUserPasswordStatus } = resetInternalUserPasswordState;

  const updateUserStatusState = useAppSelector(state => state.updateUserStatus);
  const { status: updateUserStatusStatus } = updateUserStatusState;

  const loginHistoryState = useAppSelector(state => state.getLoginHistory);
  const { status: loginHistoryStatus } = loginHistoryState;

  const rolesState = useAppSelector(state => state.getRoles);
  const { status: rolesStatus } = rolesState;

  // get users by status
  const userTypeToFetch = userTypeToFetchByActivity(selectedUsersCard);

  useEffect(() => {
    if (tabViewUsersSelectedIndex === 1) {
      dispatch(
        getUsersRequest({
          path:
            searchValue?.length >= 1
              ? `?term=${searchValue}&include=account`
              : `/sort-by-status?status=${userTypeToFetch}`,
          per_page: pageSize,
          page: currentPage,
        }),
      );
    }
  }, [selectedUsersCard, currentPage, isSearchingUsers, tabViewUsersSelectedIndex]);

  useEffect(() => {
    if (usersStatus === 'succeeded' && tabViewUsersSelectedIndex === 1) {
      let userCountResult: any[] = [];

      userCountResult = [
        {
          id: 1,
          count: usersState?.data?.active_users_count,
          title: 'Active Users',
        },
        {
          id: 2,
          count: usersState?.data?.super_agent_count,
          title: 'Super Agents',
        },
        {
          id: 3,
          count: usersState?.data?.inactive_users_count,
          title: 'Inactive Users',
        },
      ];

      let updateUsersData: any[] = [];

      usersState?.data?.users?.data?.forEach((item: Dictionary, index: number) => {
        if (userTypeToFetch === inActiveUser) {
          updateUsersData.push({
            id: index + 1,
            name: item?.name !== null ? `${item?.name}` : 'N/A',
            userId: item?.id,
            walletNo: item?.account?.number ? item?.account?.number : 'N/A',
            phone: item?.telephone,
            lastSeen: dateFormat(item?.last_login),
            email: item?.email,
          });
        } else {
          updateUsersData.push({
            id: index + 1,
            name: item?.name !== null ? `${item?.name}` : 'N/A',
            userId: item?.id,
            walletNo: item?.account?.number ? item?.account?.number : 'N/A',
            phone: item?.telephone,
            email: item?.email,
          });
        }
      });

      // this is because i want this to set just one time
      if (firstMount === true) {
        setUserCountData(userCountResult);
      }
      setUsersData(updateUsersData);
      setFirstMount(false);
      const {
        meta: { links, last_page },
      } = usersState?.data?.users;

      setTotalPages(last_page);
    }
  }, [usersState]);

  useEffect(() => {
    dispatch(getSuperAgentsRequest({}));
  }, []);

  useEffect(() => {
    if (superAgentsStatus === 'succeeded') {
      let updateUsersData: any[] = [];
      superAgentsState?.data?.forEach((item: Dictionary, index: number) => {
        updateUsersData.push({
          id: index + 1,
          name: item?.user?.name !== null ? `${item?.user?.name}` : 'N/A',
          userId: item?.user?.id,
          walletNo: item?.user?.account?.number ? item?.user?.account?.number : 'N/A',
          phone: item?.user?.telephone ? item?.user?.telephone : 'N/A',
          subAgents: item?.sub_agent_count,
          email: item?.user?.email,
        });
      });

      setUsersDataSuperAgent(updateUsersData);
    }
  }, [superAgentsState]);

  useEffect(() => {
    if (tabViewUsersSelectedIndex === 2) {
      dispatch(getInternalUsersRequest({}));
    }
  }, [tabViewUsersSelectedIndex, toggleGetInternalUser, updateUserStatusState]);

  useEffect(() => {
    if (tabViewUsersSelectedIndex === 3) {
      dispatch(getRolesRequest({}));
    }
  }, [tabViewUsersSelectedIndex]);

  useEffect(() => {
    if (internalUsersStatus === 'succeeded') {
      let updateUsersData: any[] = [];
      internalUsersState?.data?.users?.data?.forEach((item: Dictionary, index: number) => {
        updateUsersData.push({
          id: index + 1,
          name: item?.name,
          email: item?.email,
          role: arrayToString(item?.roles),
          status: item?.status,
          lastSeen: item?.last_login,
          dateEnrolled: item?.created_at,
          userId: item?.id,
        });
      });

      setInternalUsersData(updateUsersData);
      setInternalUsersDataList(updateUsersData);
    }
  }, [internalUsersState]);

  useEffect(() => {
    if (rolesDropDownStatus === 'succeeded') {
      let updateRoleDta: any[] = [];
      rolesDropDownState?.data?.roles?.data?.forEach((item: Dictionary) => {
        updateRoleDta.push({
          value: item.name,
          label: capitalizeFirstLetter(item.name),
        });
      });
      setRolesData(updateRoleDta);
    }
  }, [rolesDropDownState]);

  useEffect(() => {
    let resultLoginHistory: any[] = [];
    if (loginHistoryStatus === 'succeeded') {
      loginHistoryState?.data?.users?.data?.forEach((el: Dictionary, index: number) => {
        resultLoginHistory.push({
          id: index + 1,
          time: `${dateFormat(el?.login_at)} - ${timeFormat(el?.login_at)}`,
          device: el?.data?.userAgent === null ? 'N/A' : el?.data?.userAgent,
        });
      });

      setLoginHistoryData(resultLoginHistory);
    }
  }, [loginHistoryState]);

  // successful deactivate or reactivate user
  useEffect(() => {
    if (updateUserStatusStatus === 'succeeded') {
      setProfileActivationSuccessIsModalVisible(true);
    }
  }, [updateUserStatusState]);

  useEffect(() => {
    if (createInternalUserStatus === 'succeeded') {
      setCreateInternalUserIsModalVisible(false);
      setCreateUserSuccessModalVisible(true);
    }
    if (updateInternalUserStatus === 'succeeded') {
      setEditInternalUserIsModalVisible(false);
      setCreateUserSuccessModalVisible(true);
    }
  }, [createInternalUserState, updateInternalUserState]);

  useEffect(() => {
    if (resetInternalUserPasswordStatus === 'succeeded') {
      setResetPasswordSuccessModalVisible(true);
    }
  }, [resetInternalUserPasswordState]);

  useEffect(() => {
    let resultRoles: any[] = [];
    if (rolesStatus === 'succeeded') {
      console.log(rolesState, 'rolesState');
      rolesState?.data?.roles?.data?.forEach((el: Dictionary, index: number) => {
        resultRoles.push({
          title: el.name,
          permissionCount: el?.permission_count,
          userCount: el?.user_count,
          createdBy: el?.publisher === null ? 'N/A' : el?.publisher,
          roleId: el?.id,
          id: el?.id,
        });
      });

      setUserRolesData(resultRoles);
    }
  }, [rolesState]);

  // handle different modules
  const handleMoreIconOptions = async (item: string) => {
    setMoreIconIsVisible(false);
    if (item === namedEdit) {
      dispatch(getRolesDropDownRequest({}));
      setEditInternalUserIsModalVisible(true);
    }
    if (item === namedDeactivate || item === namedReactivate) {
      setProfileActivationIsModalVisible(true);
    }
    if (item === namedResetPassword) {
      dispatch(resetInternalUserPasswordRequest({ userId: selectedInternalUserItem?.userId }));
    }
    if (item === namedViewLoginHistory) {
      setLoginHistoryIsModalVisible(true);
      dispatch(getLoginHistoryRequest({ userId: selectedInternalUserItem?.userId }));
    }
  };

  // getRolesDropDownRequest

  // Function opens more item when the more icon in internal users table is clicked
  const handleItemModalOpen = (item: Dictionary) => {
    setUserAccountStatus(item?.status);
    setSelectedInternalUserItem(item);
    setMoreIconIsVisible(true);
  };

  const handleRoleModalOpen = (item: Dictionary) => {
    setSelectedRoleItem(item);
    setRoleMoreIconIsVisible(true);
  };

  const handleRoleMoreIconOptions = (item: string) => {
    if (item === roleDetails) {
      navigate(`${USERROLES}${selectedRoleItem?.id.toString()}`);
    }
  };

  const addInternalUserBtn = () => {
    dispatch(getRolesDropDownRequest({}));
    setCreateInternalUserIsModalVisible(true);
  };

  // const handleInternalUser

  const handleCreateInternalUserModalBtn = (item: Dictionary) => {
    const { email, first_name, last_name, role } = item;
    const payload = {
      first_name,
      last_name,
      role,
      email,
    };
    dispatch(createInternalUserRequest(payload));
  };

  const handleCloseCreateInternalUserModal = () => {
    setCreateUserSuccessModalVisible(false);
    dispatch(createInternalUserReset());
    dispatch(updateInternalUserReset());
    setToggleGetInternalUser(!toggleGetInternalUser);
  };

  const handleEditInternalUserModalBtn = (item: Dictionary) => {
    const { email, first_name, last_name, role } = item;

    const payload = {
      first_name,
      last_name,
      role: lowerCaseFirstLetter(role),
      email,
      userId: selectedInternalUserItem?.userId,
    };

    dispatch(updateInternalUserRequest(payload));
  };

  const handleCloseResetPasswordModal = () => {
    setResetPasswordSuccessModalVisible(false);
    dispatch(resetInternalUserPasswordReset());
  };

  // reactivate or deactivate user action
  const handleUserProfileActivity = () => {
    let payload: Dictionary;
    if (userAccountStatus === 'active') {
      payload = {
        userId: selectedInternalUserItem?.userId,
        data: {
          status: 'inactive',
          comment: deactiveMessage,
        },
      };
    } else {
      payload = {
        userId: selectedInternalUserItem?.userId,
        data: {
          status: 'active',
        },
      };
    }

    dispatch(updateUserStatusRequest(payload));
  };

  const handleProfileActivationSuccessClose = () => {
    setProfileActivationSuccessIsModalVisible(false);
    dispatch(updateUserStatusReset());
  };

  const handleOnchangeInternalUser = (value: any) => {
    setSearchInternalUserValue(value);
    const updatedData = internalUsersData.filter(user => user.name.toLowerCase().includes(value));
    setInternalUsersDataList(updatedData);
  };

  return (
    <AppContainer navTitle="USER">
      <UserContainer>
        <TabView data={tabViewUsersData} setSelectedIndex={setTabViewUsersSelectedIndex} />
        {tabViewUsersSelectedIndex === 1 && (
          <UsersContainer>
            <CountInfo data={userCountData} setSelectedData={setSelectedUsersCard} />

            <SearchContainer>
              <SearchInput
                placeholder="By Name, Acccount no"
                backgroundColor={'transparent'}
                name="SearchValue"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length < 1) {
                    setIsSearchingUsers(!isSearchingUsers);
                  }
                  setSearchValue(e.target.value);
                }}
              />
              {searchValue?.length > 1 && (
                <div style={{ marginLeft: spacing.xsmall }}>
                  <BorderedText
                    color={colors.white}
                    backgroundColor={colors.primary}
                    text="Search"
                    onClick={() => setIsSearchingUsers(!isSearchingUsers)}
                  />
                </div>
              )}
            </SearchContainer>

            <TableContainer>
              {selectedUsersCard.id === 1 && (
                <UsersTable
                  type="active"
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={item => navigate(`${USERDETAILS}${item.userId}`)}
                />
              )}
              {selectedUsersCard.id === 2 && (
                <UsersTable
                  headerData={userDataHeader}
                  header={true}
                  data={usersDataSuperAgent}
                  onClick={item => navigate(`${USERDETAILS}${item.userId}`)}
                  type="subagents"
                />
              )}
              {selectedUsersCard.id === 3 && (
                <UsersTable
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={item => navigate(`${USERDETAILS}${item.userId}`)}
                  type="inactive"
                />
              )}

              {usersData.length >= 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={selectedPage => {
                    setCurrentPage(selectedPage);
                  }}
                  isLoading={superAgentsStatus === 'loading' || usersStatus === 'loading'}
                />
              )}
            </TableContainer>
          </UsersContainer>
        )}
        {tabViewUsersSelectedIndex === 2 && (
          <InternalUsersContainer>
            <InternalUserTop>
              <BorderedText
                text="New User"
                icon={<AiOutlinePlus color={colors.white} size={15} />}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={addInternalUserBtn}
              />
              <SearchInput
                backgroundColor={'transparent'}
                name="searchProfileValue"
                value={searchInternalUserValue}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInternalUserValue(e.target.value)}
                onChange={(e: any) => handleOnchangeInternalUser(e.target.value)}
                placeholder="Search by name"
              />
            </InternalUserTop>
            <InternaUsersTable
              data={internalUsersDataList}
              headerData={internalUsersDataHeader}
              onClick={(item: Dictionary) => handleItemModalOpen(item)}
              setSelectedItem={setSelectedInternalUserItem}
            />
          </InternalUsersContainer>
        )}
        {tabViewUsersSelectedIndex === 3 && (
          <InternalUsersContainer>
            <InternalUserTop>
              <BorderedText
                text="New Role"
                icon={<AiOutlinePlus color={colors.white} size={15} />}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={() => navigate(CREATEUSERROLES)}
              />
              <SearchInput
                backgroundColor={'transparent'}
                name="searchProfileValue"
                value={searchInternalUserValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInternalUserValue(e.target.value)}
                placeholder="Search record"
              />
            </InternalUserTop>
            <RolesAndPermissionTable
              data={userRolesData}
              headerData={rolesAndPermissionDataHeader}
              onClick={(item: Dictionary) => handleRoleModalOpen(item)}
              setSelectedItem={setSelectedRoleItem}
            />
          </InternalUsersContainer>
        )}

        <MoreIconView
          setSelectedText={setSelectedTransactionActionText}
          isModalVisible={moreIconIsVisible}
          closeModal={() => setMoreIconIsVisible(false)}
          options={moreIconOption}
          onClick={item => handleMoreIconOptions(item)}
        />
        <MoreIconView
          setSelectedText={setSelectedRoleActionText}
          isModalVisible={roleMoreIconIsVisible}
          closeModal={() => setRoleMoreIconIsVisible(false)}
          options={roleMoreIconOption}
          onClick={item => handleRoleMoreIconOptions(item)}
        />

        <CreateInternalUserModal
          isModalVisible={createInternalUserIsModalVisible}
          closeModal={() => setCreateInternalUserIsModalVisible(false)}
          title="Add New User"
          isLoading={rolesDropDownStatus === 'loading'}
          isSubmittingInternalUser={createInternalUserStatus === 'loading'}
          onSubmit={(item: Dictionary) => handleCreateInternalUserModalBtn(item)}
          roleOption={rolesData}
          actionBtnText={'Create User'}
          defaultValues={{ defaultEmail: '', defaultFirstName: '', defaultLastName: '', defaultRole: '' }}
        />

        {/* edit internal user modal */}
        <CreateInternalUserModal
          isModalVisible={editInternalUserIsModalVisible}
          closeModal={() => setEditInternalUserIsModalVisible(false)}
          title="Edit User Details"
          isLoading={rolesDropDownStatus === 'loading'}
          isSubmittingInternalUser={updateInternalUserStatus === 'loading'}
          onSubmit={(item: Dictionary) => handleEditInternalUserModalBtn(item)}
          roleOption={rolesData}
          actionBtnText={'Update'}
          defaultValues={{
            defaultEmail: selectedInternalUserItem.hasOwnProperty('email') ? selectedInternalUserItem.email : '',
            defaultFirstName: selectedInternalUserItem.hasOwnProperty('name')
              ? getWordFromString(selectedInternalUserItem.name, 1)
              : '',
            defaultLastName: selectedInternalUserItem.hasOwnProperty('name')
              ? getWordFromString(selectedInternalUserItem.name, 2)
              : '',
            defaultRole: selectedInternalUserItem.hasOwnProperty('role') ? selectedInternalUserItem.role : '',
          }}
        />

        <ActivityActionModal
          isModalVisible={createUserSuccessModalVisible}
          closeModal={handleCloseCreateInternalUserModal}
          title={
            updateInternalUserStatus === 'succeeded' ? 'User Details Successfully Updated' : 'User Successfully Created'
          }
          text={updateInternalUserStatus === 'succeeded' ? '' : 'An Onboarding mail has been sent to the user'}
          actionText="Close"
          image={updateInternalUserStatus === 'succeeded' ? images.check : images.sent}
          actionClick={handleCloseCreateInternalUserModal}
          isLoading={false}
        />

        {/* reset password success modal */}
        <ActivityActionModal
          isModalVisible={resetPasswordSuccessModalVisible}
          closeModal={handleCloseResetPasswordModal}
          title={''}
          text={'Password Reset link has been sent to the User'}
          actionText="Close"
          image={images.sent}
          actionClick={handleCloseResetPasswordModal}
          isLoading={false}
        />

        {/* activate or deactive user */}
        <ProfileActivationToggleModal
          isModalVisible={profileActivationIsModalVisible}
          activityStatus={userAccountStatus}
          actionClicked={handleUserProfileActivity}
          closeModal={() => setProfileActivationIsModalVisible(false)}
          setDeactiveMessage={setDeactiveMessage}
        />

        {/* this modal shows when admin successfully activate or deactivate a user */}
        <ActivityActionModal
          isModalVisible={profileActivationSuccessIsModalVisible}
          closeModal={handleProfileActivationSuccessClose}
          actionClick={handleProfileActivationSuccessClose}
          image={images.check}
          isLoading={false}
          actionText="Close"
          title=""
          text={
            userAccountStatus === 'active'
              ? 'Profile has been successfuly deactivated'
              : 'Profile has been successfuly reactivated'
          }
        />

        {/* this modal shows login history */}
        <LoginHistoryOnlyModal
          actionClick={() => {}}
          closeModal={() => setLoginHistoryIsModalVisible(false)}
          isModalVisible={loginHistoryIsModalVisible}
          title="Login History"
          data={loginHistoryData}
          headerData1={loginHistoryDataHeader}
          isLoading={loginHistoryStatus === 'loading'}
        />

        <LoaderModal
          text="Please wait loading ..."
          isModalVisible={
            superAgentsStatus === 'loading' ||
            usersStatus === 'loading' ||
            internalUsersStatus === 'loading' ||
            resetInternalUserPasswordStatus === 'loading' ||
            updateUserStatusStatus === 'loading' ||
            rolesStatus === 'loading'
          }
          closeModal={() => {}}
        />
      </UserContainer>
    </AppContainer>
  );
}

export default Users;
