import { useState } from "react";
import { AppContainer, TabView, TabViewUsers } from "../../atoms";
import { colors } from "../../utils";
import { SearchInput, UsersTable } from "../../components";
import {
  SearchContainer,
  TableContainer,
  UserContainer,
  UsersContainer,
} from "./style";

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

type Dictionary = {
  [key: string]: any;
};

function Users() {
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
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  return (
    <AppContainer navTitle="USER">
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
                placeholder="Search User name, Phone number, wallet ID"
                backgroundColor={"transparent"}
                name="SearchValue"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
              />
            </SearchContainer>

            <TabView
              data={tabViewData}
              setSelectedIndex={setTabViewSelectedIndex}
              type={"user"}
              tabViewSelectedIndex={tabViewSelectedIndex}
            />
            <TableContainer>
              {tabViewSelectedIndex === 1 && (
                <UsersTable
                  type={"transactions"}
                  headerData={userDataHeader}
                  header={true}
                  data={usersData}
                  onClick={(item: Dictionary) => setMoreIsVisible(true)}
                />
              )}
              {tabViewSelectedIndex === 2 && (
                <UsersTable
                  type={"transactions"}
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
