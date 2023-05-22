import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContainer, CountInfo, TabView, LoaderModal } from '../../atoms';
import { colors, dateFormat, routesPath, spacing } from '../../utils';
import { SearchInput, UsersTable, Pagination, BorderedText } from '../../components';
import { SearchContainer, TableContainer, UserContainer, UsersContainer } from './style';

import { userDataHeader } from './data';
import { Dictionary } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { getUsersRequest, getUsersReset, getSuperAgentsRequest, getSuperAgentsReset } from '../../redux/slice';
const { USERDETAILS } = routesPath;

let activeUser = 'active';
let inActiveUser = 'inactive';

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

  const tabViewUsersData = [
    { id: 1, isSelected: true, text: 'Customers' },
    { id: 2, isSelected: false, text: 'Internal Users' },
    { id: 3, isSelected: false, text: 'Roles and permission' },
  ];

  const [tabViewUsersSelectedIndex, setTabViewUsersSelectedIndex] = useState<any[number]>(1);
  const [selectedUsersCard, setSelectedUsersCard] = useState<Dictionary>({
    id: 1,
    count: 0,
    title: 'Active Users',
  });

  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userCountData, setUserCountData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [usersDataSuperAgent, setUsersDataSuperAgent] = useState<any[]>([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [firstMount, setFirstMount] = useState(true);
  // redux state
  const usersState = useAppSelector(state => state.getUsers);
  const { status: usersStatus } = usersState;

  const superAgentsState = useAppSelector(state => state.getSuperAgents);
  const { status: superAgentsStatus } = superAgentsState;

  // api

  // get users by status
  const userTypeToFetch = userTypeToFetchByActivity(selectedUsersCard);

  useEffect(() => {
    dispatch(
      getUsersRequest({
        path: searchValue?.length >= 1 ? `?term=${searchValue}` : `/sort-by-status?status=${userTypeToFetch}`,
        per_page: pageSize,
        page: currentPage,
      }),
    );
  }, [selectedUsersCard, currentPage, isSearchingUsers]);

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
        meta: { links },
      } = usersState?.data?.users;

      setTotalPages(links.length - 2);
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
          userId: item?.id,
          walletNo: item?.user?.account?.number ? item?.user?.account?.number : 'N/A',
          phone: item?.user?.telephone ? item?.user?.telephone : 'N/A',
          subAgents: item?.sub_agent_count,
          email: item?.email,
        });
      });

      setUsersDataSuperAgent(updateUsersData);
    }
  }, [superAgentsState]);

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
        {tabViewUsersSelectedIndex === 2 && ''}
        {tabViewUsersSelectedIndex === 3 && ''}

        <LoaderModal
          text="Please wait loading ..."
          isModalVisible={superAgentsStatus === 'loading' || usersStatus === 'loading'}
          closeModal={() => {}}
        />
      </UserContainer>
    </AppContainer>
  );
}

export default Users;
