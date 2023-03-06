import { memo } from "react";
import { ReactElement } from "react";
import { H5 } from "../../../styles";
import { colors } from "../../../utils";
import { Container, Content, Indicator, Icon } from "./style";

interface IProps {
  isSelected?: boolean;
  text: string;
  icon?: ReactElement;
}
function SideBarCard({ isSelected, text, icon }: IProps) {
  return (
    <Container>
      <Indicator isSelected={isSelected} />
      <Content isSelected={isSelected}>
        <Icon isSelected={isSelected}>{icon}</Icon>
        <H5 color={isSelected ? colors.primary : colors.grey}>{text}</H5>
      </Content>
    </Container>
  );
}

export default memo(SideBarCard);
