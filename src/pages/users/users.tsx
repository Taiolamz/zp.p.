import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContainer, CountInfo, TabView, LoaderModal, MoreIconView, CreateInternalUserModal } from '../../atoms';
import { capitalizeFirstLetter, colors, dateFormat, routesPath, spacing, arrayToString } from '../../utils';
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

import { InternalUsersData, internalUsersDataHeader, userDataHeader, rolesAndPermissionDataHeader } from './data';
import { Dictionary } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
  getUsersRequest,
  getUsersReset,
  getSuperAgentsRequest,
  getSuperAgentsReset,
  getInternalUsersRequest,
} from '../../redux/slice';
import { AiOutlinePlus } from 'react-icons/ai';
const { USERDETAILS, USERROLES } = routesPath;

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
  const [createInternalUserIsModalVisible, setCreateInternalUserIsModalVisible] = useState(false);
  const [createInternalUserData, setCreateInternalUserData] = useState({});
  //More Icon for Internal Users
  const moreIconOption = [namedEdit, namedDeactivate, namedReactivate, namedResetPassword, namedViewLoginHistory];
  const roleMoreIconOption = [roleDetails, roleDeleteRole];

  // redux state
  const usersState = useAppSelector(state => state.getUsers);
  const { status: usersStatus } = usersState;

  const superAgentsState = useAppSelector(state => state.getSuperAgents);
  const { status: superAgentsStatus } = superAgentsState;

  const internalUsersState = useAppSelector(state => state.getInternalUsers);
  const { status: internalUsersStatus } = internalUsersState;

  useEffect(() => {
    console.log(selectedInternalUserItem);
  }, [selectedInternalUserItem]);

  // api

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
        });
      });

      setInternalUsersData(updateUsersData);
    }
  }, [internalUsersState]);

  // handle different modules
  const handleMoreIconOptions = async (item: string) => {
    if (item === namedEdit) {
      console.log('Edit jj');
    }
    if (item === namedDeactivate) {
      console.log('Deactivate');
    }
    if (item === namedReactivate) {
      console.log('Reactivate');
    }
    if (item === namedResetPassword) {
      console.log('Reset Password');
    }
    if (item === namedResetPassword) {
      console.log('View Login History');
    }
  };

  // Function opens more item when the more icon in internal users table is clicked
  const handleItemModalOpen = (item: Dictionary) => {
    setSelectedInternalUserItem(item);
    setMoreIconIsVisible(true);
  };

  const handleRoleModalOpen = (item: Dictionary) => {
    setSelectedRoleItem(item);
    setRoleMoreIconIsVisible(true);
  };

  const handleRoleMoreIconOptions = (item: string) => {
    if (item === roleDetails) {
      navigate(USERROLES);
    }
  };

  const handleCreateInternalUser = (item: Dictionary) => {
    console.log(item, 'items');
  };
  console.log(createInternalUserData, 'setCreateInternalUserData');
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
                onClick={() => setCreateInternalUserIsModalVisible(true)}
                // onClick={() => console.log('hello')}
              />
              <SearchInput
                backgroundColor={'transparent'}
                name="searchProfileValue"
                value={searchInternalUserValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInternalUserValue(e.target.value)}
                placeholder="Search by Phone Number or Account Number"
              />
            </InternalUserTop>
            <InternaUsersTable
              data={internalUsersData}
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
              data={[
                { title: 'Excecutive Access', permissionCount: '89', userCount: '1', createdBy: 'Allen Kardic' },
                { title: 'KYC Inputter', permissionCount: '89', userCount: '1', createdBy: 'Allen Kardic' },
              ]}
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
          isLoading={false}
          isSubmittingInternalUser={true}
          onSubmit={(item: Dictionary) => handleCreateInternalUser(item)}
        />
        <LoaderModal
          text="Please wait loading ..."
          isModalVisible={
            superAgentsStatus === 'loading' || usersStatus === 'loading' || internalUsersStatus === 'loading'
          }
          closeModal={() => {}}
        />
      </UserContainer>
    </AppContainer>
  );
}

export default Users;
