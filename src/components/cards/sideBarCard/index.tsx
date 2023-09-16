import { memo } from "react";
import { ReactElement } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { H5 } from "../../../styles";
import { colors } from "../../../utils";
import {
  Container,
  Content,
  Indicator,
  Icon,
  OptionsContainer,
  OptionsContent,
  OptionsMainCover,
} from "./style";

interface IProps {
  onClick: () => void;
  isSelected?: boolean;
  text: string;
  icon?: ReactElement;
  options?: any[];
  setInnerNav?: any;
  toggleBtn?: boolean;
}
function SideBarCard({
  isSelected,
  text,
  icon,
  onClick,
  options,
  setInnerNav,
  toggleBtn,
}: IProps) {
  if (options) {
    return (
      <div>
        <Container
          onClick={() => {
            onClick();
          }}>
          <Indicator isSelected={false} />
          <OptionsMainCover>
            <Icon isSelected={false}>{icon}</Icon>
            <H5 color={colors.greyVariantFour}>{text}</H5>
            {toggleBtn ? <FiChevronUp /> : <FiChevronDown />}
          </OptionsMainCover>
        </Container>
        {toggleBtn && isSelected && (
          <div>
            {options.map((item) => (
              <OptionsContainer
                key={item.id}
                onClick={() => {
                  setInnerNav(item.path);
                }}>
                <Indicator isSelected={item.isSelected} />
                <OptionsContent key={item.index}>
                  <Icon isSelected={true}>{icon}</Icon>
                  <H5>{item.text}</H5>
                </OptionsContent>
              </OptionsContainer>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Container onClick={onClick}>
        <Indicator isSelected={isSelected} />
        <Content isSelected={isSelected}>
          <Icon isSelected={isSelected}>{icon}</Icon>
          <H5 color={isSelected ? colors.white : colors.greyVariantFour}>
            {text}
          </H5>
        </Content>
      </Container>
    );
  }
}

export default memo(SideBarCard);
