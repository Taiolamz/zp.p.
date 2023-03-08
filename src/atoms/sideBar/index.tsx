import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineUser, AiOutlineDollarCircle } from "react-icons/ai";
import { FiUsers, FiMail, FiTrendingUp, FiSettings } from "react-icons/fi";
import { useAppDispatch } from "../../redux/redux-hooks";
import { loginReset } from "../../redux/slice";
import { authReset } from "../../redux/slice";
import { SideBarCard, UserActivityCard } from "../../components/index";
import { H6 } from "../../styles";
import { colors, images, routesPath } from "../../utils";
import {
  Container,
  Content,
  BottomTabContainer,
  TabNavContainer,
  TabNavIcon,
  BottomTabContent,
  ImgContainer,
  Img,
} from "./style";

interface IProps {
  text: string;
  icon: ReactElement;
  isSelected: boolean;
  onClick?: () => void;
}

export interface NavIProps {
  id: number;
  text: string;
  icon: ReactElement;
  isSelected: boolean;
  path: string;
}
const { DASHBOARD, TOKEN, LOGIN, KYC, SUPPORT, SETTLEMENTS, USERS, SETTINGS } =
  routesPath;
function TabNav({ text, icon, isSelected, onClick }: IProps) {
  return (
    <TabNavContainer onClick={onClick}>
      <TabNavIcon isSelected={isSelected}>{icon}</TabNavIcon>
      <H6 center color={isSelected ? colors.primary : colors.grey}>
        {text}
      </H6>
    </TabNavContainer>
  );
}

function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      isSelected: true,
      text: "Dashboard",
      icon: <AiOutlineUser />,
      path: DASHBOARD,
    },
    {
      id: 2,
      isSelected: false,
      text: "KYC",
      icon: <FiUsers />,
      path: KYC,
    },
    {
      id: 3,
      isSelected: false,
      text: "Support",
      icon: <FiMail />,
      path: SUPPORT,
    },
    {
      id: 4,
      isSelected: false,
      text: "Settlements",
      icon: <FiTrendingUp />,
      path: SETTLEMENTS,
    },
    {
      id: 5,
      isSelected: false,
      text: "Users",
      icon: <AiOutlineDollarCircle />,
      path: USERS,
    },
    {
      id: 6,
      isSelected: false,
      text: "Settings",
      icon: <FiSettings />,
      path: SETTINGS,
    },
  ];

  const dataBottomTab = [
    {
      isSelected: true,
      text: "Portfolio",
      icon: <AiOutlineUser />,
    },
    {
      isSelected: false,
      text: "Logout",
      icon: <FiUsers />,
    },
    {
      isSelected: false,
      text: "Messages",
      icon: <FiMail />,
    },

    {
      isSelected: false,
      text: "Settings",
      icon: <FiSettings />,
    },
  ];

  const [navList, setNavList] = useState(data);

  const handleNavigateUser = (item: NavIProps) => {
    const itemToEdit = item;
    const updatedList: NavIProps[] = [...navList].map((el: NavIProps) => {
      if (el.text === itemToEdit.text) {
        el.isSelected = !el.isSelected;
      } else {
        el.isSelected = false;
      }
      return el;
    });
    setNavList(updatedList);
    navigate(itemToEdit.path);
  };

  const handleLogout = (item: any) => {
    if (item.text === "Logout") {
      Cookies.remove(TOKEN);
      dispatch(loginReset());
      dispatch(authReset());
      navigate(LOGIN);
    }
  };

  const handleLogoutDesktop = () => {
    Cookies.remove(TOKEN);
    dispatch(loginReset());
    dispatch(authReset());
    navigate(LOGIN);
  };
  return (
    <>
      <Container>
        <Content>
          <div>
            <ImgContainer>
              <Img src={images.logoMain} alt='logo' />
            </ImgContainer>
            {navList.map((item) => (
              <SideBarCard
                key={item.id}
                onClick={() => {
                  handleNavigateUser(item);
                }}
                isSelected={item.isSelected}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </div>
          <UserActivityCard
            title='John Doe'
            helper='Verified'
            onClick={handleLogoutDesktop}
          />
        </Content>
      </Container>
      <BottomTabContainer>
        <BottomTabContent>
          {dataBottomTab.map((item, index) => (
            <TabNav
              key={index}
              onClick={() => handleLogout(item)}
              isSelected={item.isSelected}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </BottomTabContent>
      </BottomTabContainer>
    </>
  );
}

export default SideBar;
