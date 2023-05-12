import { useState, useEffect } from 'react';
import { AppContainer, CountInfo, TabView, TabViewUsers } from '../../atoms';
import { colors, routesPath } from '../../utils';
import { SearchInput, UsersTable } from '../../components';
import {
  SearchContainer,
  TableContainer,
  UserContainer,
  UsersContainer,
} from './style';
import { useNavigate } from 'react-router-dom';
import { userCountData, usersDataLastSeen, usersDataSuperAgent } from './data';
const { USERDETAILS } = routesPath;

const userDataHeader = {
  id: '',
  name: 'Name',
  userId: 'User ID',
  walletNo: 'Wallet No',
  phone: 'Phone No',
  lastSeen: 'Last Seen',
  subAgents: 'Sub Agents',
};

const usersData = [
  {
    id: 1,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
  },
  {
    id: 2,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
  },
  {
    id: 3,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
  },
];

const userDetails: any = [
  {
    id: 1,
    userName: 'Wade Warren',
    bvn: 222233434555,
    phone: '+2348036329178',
  },

  {
    id: 2,
    userName: 'Wade Warren',
    bvn: 222233434555,
    phone: '+2348036329178',
  },
  {
    id: 3,
    userName: 'Wade Warren',
    bvn: 222233434555,
    phone: '+2348036329178',
  },
  {
    id: 4,
    userName: 'Wade Warren',
    bvn: 222233434555,
    phone: '+2348036329178',
  },
  {
    id: 5,
    userName: 'Wade Warren',
    bvn: 222233434555,
    phone: '+2348036329178',
  },
  {
    id: 6,
    userName: 'Wade Warren',
    bvn: 222233434555,
    phone: '+2348036329178',
  },
];

const supportFunctionItems = [
  {
    id: 1,
    name: 'Document Status',
    color: colors.purpleVariantThree,
  },
  {
    id: 2,
    name: 'Transaction History',
    color: colors.purpleVariantThree,
  },
  {
    id: 3,
    name: 'Upload Document',
    color: colors.purpleVariantThree,
  },
  {
    id: 4,
    name: 'Document History',
    color: colors.purpleVariantThree,
  },
  {
    id: 5,
    name: 'Saved Banks',
    color: colors.purpleVariantThree,
  },
  {
    id: 6,
    name: 'Login History',
    color: colors.purpleVariantThree,
  },
  {
    id: 7,
    name: 'Reactivate Profile',
    color: colors.green,
  },
];

type Dictionary = {
  [key: string]: any;
};

function Users() {
  const navigate = useNavigate();

  const tabViewUsersData = [
    { id: 1, isSelected: true, text: 'Customers' },
    { id: 2, isSelected: false, text: 'Internal Users' },
    { id: 3, isSelected: false, text: 'Roles and permission' },
  ];
  const tabViewData = [
    { id: 1, isSelected: true, text: 'Active Users' },
    { id: 2, isSelected: false, text: 'Inactive Users' },
  ];

  const [usersCountList, setUsersCountList] = useState<any[]>([]);
  const [selectedUsersCard, setSelectedUsersCard] = useState<Dictionary>({});

  const [tabViewUsersSelectedIndex, setTabViewUsersSelectedIndex] =
    useState<any[number]>(1);
  const [
    tabViewUserActivitySelectedIndex,
    setTabViewUserActivitySelectedIndex,
  ] = useState<any[number]>(1);
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSelectedUsersCard(userCountData[0]);
  }, []);

  return (
    <AppContainer navTitle='USER'>
      <UserContainer>
        <TabViewUsers
          data={tabViewUsersData}
          setSelectedIndex={setTabViewUsersSelectedIndex}
        />
        {tabViewUsersSelectedIndex === 1 && (
          <UsersContainer>
            <CountInfo
              data={userCountData}
              setSelectedData={setSelectedUsersCard}
            />
            <SearchContainer>
              <SearchInput
                placeholder='Search User name, Phone number, wallet ID'
                backgroundColor={'transparent'}
                name='SearchValue'
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
              />
            </SearchContainer>

            {/* <TabView
              data={tabViewData}
              setSelectedIndex={setTabViewUserActivitySelectedIndex}
              type={"user"}
              tabViewSelectedIndex={tabViewUserActivitySelectedIndex}
            /> */}

            <TableContainer>
              {selectedUsersCard.id === 1 && (
                <UsersTable
                  type='active'
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={() => {}}
                />
              )}
              {selectedUsersCard.id === 2 && (
                <UsersTable
                  headerData={userDataHeader}
                  header={true}
                  data={usersDataSuperAgent}
                  onClick={() => {}}
                  type='subagents'
                />
              )}
              {selectedUsersCard.id === 3 && (
                <UsersTable
                  headerData={userDataHeader}
                  header={true}
                  data={usersDataLastSeen}
                  onClick={() => {}}
                  type='inactive'
                />
              )}
            </TableContainer>
          </UsersContainer>
        )}
        {tabViewUsersSelectedIndex === 2 && ''}
        {tabViewUsersSelectedIndex === 3 && ''}
      </UserContainer>
    </AppContainer>
  );
}

export default Users;
