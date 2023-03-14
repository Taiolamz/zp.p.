import { memo, ReactElement } from "react";
import { Container } from "./style";
import { H5 } from "../../styles";
import { colors, spacing } from "../../utils";

interface IProps {
  text: string;
  icon?: ReactElement;
  backgroundColor?: string;
  color?: string;
  height?: string | number;
  borderRadius?: string | number;
  onClick?: () => void;
}

function BorderedText({
  text,
  icon,
  backgroundColor,
  color,
  height,
  onClick,
}: IProps) {
  return (
    <Container
      onClick={onClick}
      height={height}
      backgroundColor={backgroundColor}>
      {icon && <div style={{ marginRight: spacing.xxsmall }}>{icon}</div>}
      <H5 semiBold color={color ? color : colors.grey}>
        {text}
      </H5>
    </Container>
  );
}

export default memo(BorderedText);
