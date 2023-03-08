import { ReactElement } from "react";
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
const { DASHBOARD, TOKEN, LOGIN } = routesPath;
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
      isSelected: false,
      text: "Dashboard",
      icon: <AiOutlineUser />,
    },
    {
      isSelected: false,
      text: "KYC",
      icon: <FiUsers />,
    },
    {
      isSelected: true,
      text: "Support",
      icon: <FiMail />,
    },
    {
      isSelected: false,
      text: "Settlements",
      icon: <FiTrendingUp />,
    },
    {
      isSelected: false,
      text: "Users",
      icon: <AiOutlineDollarCircle />,
    },
    {
      isSelected: false,
      text: "Settings",
      icon: <FiSettings />,
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

  const handleLogout = (item: any) => {
    if (item.text === "Logout") {
      Cookies.remove(TOKEN);
      dispatch(loginReset());
      dispatch(authReset());
      navigate("/");
    }
  };

  const handleLogoutDesktop = () => {
    Cookies.remove(TOKEN);
    dispatch(loginReset());
    dispatch(authReset());
    navigate("/");
  };
  return (
    <>
      <Container>
        <Content>
          <div>
            <ImgContainer>
              <Img src={images.logoMain} alt='logo' />
            </ImgContainer>
            {data.map((item, index) => (
              <SideBarCard
                key={index}
                onClick={() => {
                  navigate(DASHBOARD);
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
