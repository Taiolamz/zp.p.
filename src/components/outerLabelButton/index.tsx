import { memo, ReactElement } from "react";
import { Container, IconContainer } from "./style";
import { H5 } from "../../styles";
import { colors, spacing } from "../../utils";

interface IProps {
  text: string;
  icon?: ReactElement;
  backgroundColor?: string;
  labelColor?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
  onClick?: () => void;
  cursor?: string;
}

function OuterLabelButton({
  text,
  icon,
  backgroundColor,
  labelColor,
  height,
  width,
  onClick,
  cursor = "pointer",
}: IProps) {
  return (
    <Container onClick={onClick}>
      <IconContainer
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        cursor={cursor}>
        <div>{icon}</div>
      </IconContainer>
      <H5 semiBold color={labelColor ? labelColor : colors.primary}>
        {text}
      </H5>
    </Container>
  );
}

export default memo(OuterLabelButton);
