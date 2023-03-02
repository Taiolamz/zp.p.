import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineDollarCircle } from "react-icons/ai";
import { FiUsers, FiMail, FiTrendingUp, FiSettings } from "react-icons/fi";
import { SideBarCard, UserActivityCard } from "../../components/index";
import { H6 } from "../../styles";
import { colors, images } from "../../utils";
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
  const navigate = useNavigate();
  const data = [
    {
      isSelected: true,
      text: "My Portfolio",
      icon: <AiOutlineUser />,
    },
    {
      isSelected: false,
      text: "My Group",
      icon: <FiUsers />,
    },
    {
      isSelected: false,
      text: "Messages",
      icon: <FiMail />,
    },
    {
      isSelected: false,
      text: "Analytics",
      icon: <FiTrendingUp />,
    },
    {
      isSelected: false,
      text: "Pack",
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
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleLogoutDesktop = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <Container>
        <Content>
          <div>
            <ImgContainer>
              <Img src={images.logo} alt='trending graph' />
            </ImgContainer>
            {data.map((item, index) => (
              <SideBarCard
                key={index}
                isSelected={item.isSelected}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </div>
          <UserActivityCard
            title='Thersa milly'
            helper='Influncer'
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
