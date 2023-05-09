import { useNavigate } from "react-router-dom";
import { CustomerProfile } from "../../components";
import { AppContainer, UserSupportActivity } from "../../atoms";

import { colors, dateFormat, routesPath } from "../../utils";
import {
  UsersDetailContainer,
  UserProfileContainer,
  SupportContainer,
} from "./style";
import { H2 } from "../../styles";

import { UserSupportActivityIProps } from "../../atoms/userSupportActivity";

const { USERS } = routesPath;

function UserDetails() {
  const navigate = useNavigate();

  const date = new Date().toDateString();

  const customerDetails: any = [
    {
      id: 1,
      helper: "Full Name",
      text: "Wade Warren Chukwuma",
    },

    {
      id: 2,
      helper: "Email",
      text: "wadewarren@gmail.com",
    },

    {
      id: 3,
      helper: "Phone Number",
      text: "2348036329157",
    },

    {
      id: 4,
      helper: "BVN",
      text: "3094095959",
    },

    {
      id: 5,
      helper: "Residential Address",
      text: "3995 Valley View Ln undefined Red Oak, Oklahoma 51671 United States",
    },

    { id: 6, text: dateFormat(date), helper: "Date of Birth" },
    {
      id: 7,
      helper: "Address Verification Status",
      text: "Unverified",
    },
    {
      id: 8,
      helper: "Account Number",
      text: "77123456781",
    },
    {
      id: 9,
      helper: "Bank Name",
      text: "KUDA",
    },
    {
      id: 10,
      helper: "Profile Level",
      text: "Level 1",
    },
  ];

  const appActivity: any = [
    {
      id: 1,
      helper: "Onboarding Date",
      text: "Jul 12, 2021",
    },

    {
      id: 2,
      helper: "Last Login",
      text: "Jan 8, 2022",
    },

    {
      id: 3,
      helper: "Last Device Login",
      text: "Iphone 14 pro max",
    },

    {
      id: 4,
      helper: "Profile Status",
      text: "Deactivated",
    },

    {
      id: 5,
      helper: "Deactivation Comment",
      text: "EFCC Order",
    },
  ];

  const supportActivitiesData: UserSupportActivityIProps[] = [
    {
      id: 1,
      text: "Document Status",
      backgroundColor: colors.purpleVariantThree,
    },
    {
      id: 2,
      text: "Transaction History",
      backgroundColor: colors.purpleVariantThree,
    },
    {
      id: 3,
      text: "Upload Document",
      backgroundColor: colors.purpleVariantThree,
    },
    {
      id: 4,
      text: "Document History",
      backgroundColor: colors.purpleVariantThree,
    },
    {
      id: 5,
      text: "Saved Banks",
      backgroundColor: colors.purpleVariantThree,
    },
    {
      id: 6,
      text: "Login History",
      backgroundColor: colors.purpleVariantThree,
    },
    {
      id: 7,
      text: "Reactivate Profile",
      backgroundColor: colors.green,
    },
  ];

  return (
    <AppContainer
      goBack={() => navigate(USERS)}
      navTitle={`Back`}
      navHelper='Profile Review'>
      <div>
        <UsersDetailContainer>
          <UserProfileContainer>
            <CustomerProfile
              customerDetails={customerDetails}
              title='Customer`s Details
'
            />

            <CustomerProfile
              customerDetails={appActivity}
              title='App Activity
'
            />
          </UserProfileContainer>

          <SupportContainer>
            <H2 left bold color={colors.greyVariantThree}>
              Support Functions
            </H2>
            <UserSupportActivity data={supportActivitiesData} />
          </SupportContainer>
        </UsersDetailContainer>
      </div>
    </AppContainer>
  );
}

export default UserDetails;
