import { ReactElement, useState } from 'react';
import { Container, Content, SidebarLayout } from './style';
import { SideBar } from '..';
import { Navbar } from '../../components';

export interface IProps {
  children: ReactElement;
  navTitle: string;
  navHelper?: string;
  goBack?: () => void;
}

function AppContainer({ children, navTitle, navHelper, goBack }: IProps) {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <Container>
        <Navbar onClick={() => setHidden(false)} goBack={goBack} title={navTitle} helper={navHelper} />
        <Content>
          <SidebarLayout hide={hidden}>
            <SideBar onClick={() => setHidden(true)} />
          </SidebarLayout>
          {children}
        </Content>
      </Container>
    </>
  );
}

export default AppContainer;
