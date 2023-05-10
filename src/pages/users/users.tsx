import { useState } from 'react';
import {
  AppContainer,
  SupportFunction,
  TabView,
  TabViewUsers,
} from '../../atoms';
import { colors } from '../../utils';
import { SearchInput, UsersTable } from '../../components';
import {
  SearchContainer,
  TableContainer,
  UserContainer,
  UsersContainer,
} from './style';

const userDataHeader = {
  id: '',
  name: 'Name',
  userId: 'User ID',
  walletNo: 'Wallet No',
  phone: 'Phone No',
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
  const tabViewUsersData = [
    { id: 1, isSelected: true, text: 'Users' },
    { id: 2, isSelected: false, text: 'Admin Users' },
    { id: 3, isSelected: false, text: 'Roles and permission' },
  ];
  const tabViewData = [
    { id: 1, isSelected: true, text: 'Active Users' },
    { id: 2, isSelected: false, text: 'Inactive Users' },
  ];

  const [tabViewUsersSelectedIndex, setTabViewUsersSelectedIndex] =
    useState<any[number]>(1);
  const [
    tabViewUserActivitySelectedIndex,
    setTabViewUserActivitySelectedIndex,
  ] = useState<any[number]>(1);
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  return (
    <AppContainer navTitle='USER'>
      <UserContainer>
        <TabViewUsers
          data={tabViewUsersData}
          backgroundColor={colors.white}
          setSelectedIndex={setTabViewUsersSelectedIndex}
        />
        {tabViewUsersSelectedIndex === 1 && (
          <UsersContainer>
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

            <TabView
              data={tabViewData}
              setSelectedIndex={setTabViewUserActivitySelectedIndex}
              type={'user'}
              tabViewSelectedIndex={tabViewUserActivitySelectedIndex}
            />
            <TableContainer>
              {tabViewUserActivitySelectedIndex === 1 && (
                <UsersTable
                  type={'transactions'}
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={(item: Dictionary) => setMoreIsVisible(true)}
                />
              )}
              {tabViewUserActivitySelectedIndex === 2 && (
                <UsersTable
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={(item: Dictionary) => setMoreIsVisible(true)}
                />
              )}
            </TableContainer>
          </UsersContainer>
        )}
        {tabViewUsersSelectedIndex === 2 && ''}
        {tabViewUsersSelectedIndex === 3 && ''}
        <SupportFunction supportFunctionItems={supportFunctionItems} />
      </UserContainer>
    </AppContainer>
  );
}

export default Users;
