import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AiOutlineUser, AiOutlineDollarCircle } from 'react-icons/ai';
import { FiUsers, FiMail, FiTrendingUp, FiSettings, FiCreditCard, FiUser } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { logoutRequest } from '../../redux/slice';
import { SideBarCard, UserActivityCard } from '../../components/index';
import { H6 } from '../../styles';
import { colors, images, routesPath, capitalizeFirstLetter } from '../../utils';
import {
  Container,
  Content,
  BottomTabContainer,
  TabNavContainer,
  TabNavIcon,
  BottomTabContent,
  ImgContainer,
  Img,
} from './style';

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
  options?: any[];
}
const { DASHBOARD, KYC, SUPPORT, SETTLEMENTS, RECONCILIATION, USERS, SETTINGS, TRANSACTIONS } = routesPath;
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

  const { status } = useAppSelector(state => state.logout);
  const {
    data: { name, status: activityStatus },
  } = useAppSelector(state => state.auth);

  const location = useLocation();
  const currentPath = location.pathname;
  const [innerNav, setInnerNav] = useState('');
  const [toggleBtn, setToggleBtn] = useState(false);

  function navigationPath() {
    return [
      {
        id: 1,
        isSelected: currentPath === DASHBOARD ? true : false,
        text: 'Dashboard',
        icon: <AiOutlineUser />,
        path: DASHBOARD,
      },
      {
        id: 2,
        isSelected: currentPath === KYC ? true : false,
        text: 'KYC',
        icon: <FiUsers />,
        path: KYC,
      },
      {
        id: 3,
        isSelected: currentPath === SUPPORT ? true : false,
        text: 'Support',
        icon: <FiMail />,
        path: SUPPORT,
      },

      {
        id: 4,
        isSelected: toggleBtn,
        text: currentPath === RECONCILIATION ? 'Reconciliation' : 'Settlements',
        icon: <AiOutlineDollarCircle />,
        path: SETTLEMENTS,
        options: [
          {
            id: 1,
            text: 'Settlements',
            isSelected: currentPath === SETTLEMENTS ? true : false,
            path: SETTLEMENTS,
          },
          {
            id: 2,
            text: 'Reconciliation',
            isSelected: currentPath === RECONCILIATION ? true : false,
            path: RECONCILIATION,
          },
        ],
      },
      {
        id: 5,
        isSelected: currentPath === USERS ? true : false,
        text: 'Users',
        icon: <FiUser />,
        path: USERS,
      },
      {
        id: 6,
        isSelected: currentPath === TRANSACTIONS ? true : false,
        text: 'Transactions',
        icon: <FiCreditCard />,
        path: TRANSACTIONS,
      },
      {
        id: 7,
        isSelected: currentPath === SETTINGS ? true : false,
        text: 'Settings',
        icon: <FiSettings />,
        path: SETTINGS,
      },
    ];
  }

  const dataBottomTab = [
    {
      isSelected: true,
      text: 'Portfolio',
      icon: <AiOutlineUser />,
    },
    {
      isSelected: false,
      text: 'Logout',
      icon: <FiUsers />,
    },
    {
      isSelected: false,
      text: 'Messages',
      icon: <FiMail />,
    },

    {
      isSelected: false,
      text: 'Settings',
      icon: <FiSettings />,
    },
  ];

  useEffect(() => {
    if (innerNav.length > 2) {
      navigate(innerNav);
    }
    if (currentPath === SETTLEMENTS || currentPath === RECONCILIATION) {
      setToggleBtn(true);
    }

    navigationPath();
  }, [innerNav]);

  const handleNavigateUser = (item: NavIProps) => {
    if (item.options) {
      setToggleBtn(!toggleBtn);
    } else {
      setToggleBtn(false);
      navigate(item.path);
      navigationPath();
    }
  };

  const handleLogout = (item: any) => {
    if (item.text === 'Logout') {
      dispatch(logoutRequest());
    }
  };

  const handleLogoutDesktop = () => {
    dispatch(logoutRequest());
  };
  return (
    <>
      <Container>
        <Content>
          <div>
            <ImgContainer>
              <Img src={images.logoMain} alt="logo" />
            </ImgContainer>
            {navigationPath().map(item => (
              <SideBarCard
                key={item.id}
                onClick={() => {
                  handleNavigateUser(item);
                }}
                isSelected={item.isSelected}
                text={item.text}
                icon={item.icon}
                options={item?.options}
                setInnerNav={setInnerNav}
                toggleBtn={toggleBtn}
              />
            ))}
          </div>
          <UserActivityCard
            title={name}
            helper={capitalizeFirstLetter(activityStatus)}
            onClick={handleLogoutDesktop}
            btnDisabled={status === 'loading' ? true : false}
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
