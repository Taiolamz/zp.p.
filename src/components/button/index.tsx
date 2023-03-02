import { memo } from "react";
import { ReactElement } from "react";
import { Container, ButtonIcon } from "./style";
import { H4 } from "../../styles";
import { colors } from "../../utils";
interface IProps {
  text: string;
  icon?: ReactElement;
  onClick?: () => void;
  disable?: boolean;
  type?: "button" | "submit";
  secondary?: boolean;
}

function Button({
  text,
  icon,
  onClick,
  type = "button",
  secondary = false,
  disable = false,
}: IProps) {
  return (
    <Container secondary={secondary} type={type} onClick={onClick}>
      {icon && <ButtonIcon icon={icon}>{icon}</ButtonIcon>}
      <H4 color={icon ? colors.primary : colors.white} semiBold>
        {text}
      </H4>
    </Container>
  );
}

export default memo(Button);
