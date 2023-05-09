import { useState } from "react";
import { AppContainer, TabView, TabViewUsers } from "../../atoms";
import { colors, routesPath } from "../../utils";
import { SearchInput, UsersTable } from "../../components";
import {
  SearchContainer,
  TableContainer,
  UserContainer,
  UsersContainer,
} from "./style";
import { useNavigate } from "react-router-dom";
const { USERDETAILS } = routesPath;

const userDataHeader = {
  id: "",
  name: "Name",
  userId: "User ID",
  walletNo: "Wallet No",
  phone: "Phone No",
};

const usersData = [
  {
    id: 1,
    name: "Fola Debo",
    userId: "001234526789",
    walletNo: "2034567584",
    phone: "08142346753",
  },
  {
    id: 2,
    name: "Fola Debo",
    userId: "001234526789",
    walletNo: "2034567584",
    phone: "08142346753",
  },
  {
    id: 3,
    name: "Fola Debo",
    userId: "001234526789",
    walletNo: "2034567584",
    phone: "08142346753",
  },
];

const userDetails: any = [
  {
    id: 1,
    userName: "Wade Warren",
    bvn: 222233434555,
    phone: "+2348036329178",
  },

  {
    id: 2,
    userName: "Wade Warren",
    bvn: 222233434555,
    phone: "+2348036329178",
  },
  {
    id: 3,
    userName: "Wade Warren",
    bvn: 222233434555,
    phone: "+2348036329178",
  },
  {
    id: 4,
    userName: "Wade Warren",
    bvn: 222233434555,
    phone: "+2348036329178",
  },
  {
    id: 5,
    userName: "Wade Warren",
    bvn: 222233434555,
    phone: "+2348036329178",
  },
  {
    id: 6,
    userName: "Wade Warren",
    bvn: 222233434555,
    phone: "+2348036329178",
  },
];

type Dictionary = {
  [key: string]: any;
};

function Users() {
  const navigate = useNavigate();

  const tabViewUsersData = [
    { id: 1, isSelected: true, text: "Users" },
    { id: 2, isSelected: false, text: "Admin Users" },
    { id: 3, isSelected: false, text: "Roles and permission" },
  ];
  const tabViewData = [
    { id: 1, isSelected: true, text: "Active Users" },
    { id: 2, isSelected: false, text: "Inactive Users" },
  ];

  const [tabViewUsersSelectedIndex, setTabViewUsersSelectedIndex] =
    useState<any[number]>(1);
  const [
    tabViewUserActivitySelectedIndex,
    setTabViewUserActivitySelectedIndex,
  ] = useState<any[number]>(1);
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
                backgroundColor={"transparent"}
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
              type={"user"}
              tabViewSelectedIndex={tabViewUserActivitySelectedIndex}
            />
            <TableContainer>
              {tabViewUserActivitySelectedIndex === 1 && (
                <UsersTable
                  type={"transactions"}
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={() => console.log("hello")}
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
        {tabViewUsersSelectedIndex === 2 && ""}
        {tabViewUsersSelectedIndex === 3 && ""}
      </UserContainer>
    </AppContainer>
  );
}

export default Users;
