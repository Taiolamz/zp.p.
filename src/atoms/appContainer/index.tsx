import { ReactElement } from "react";
import { Container, Content } from "./style";
import { SideBar } from "..";
import { Navbar } from "../../components";

export interface IProps {
  children: ReactElement;
  navTitle: string;
  navHelper?: string;
  goBack?: () => void;
}

function AppContainer({ children, navTitle, navHelper, goBack }: IProps) {
  return (
    <>
      <Container>
        <Navbar goBack={goBack} title={navTitle} helper={navHelper} />
        <Content>
          <SideBar />
          {children}
        </Content>
      </Container>
    </>
  );
}

export default AppContainer;
