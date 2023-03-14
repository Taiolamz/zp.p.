import { memo, ReactElement } from "react";
import { Container } from "./style";
import { H4 } from "../../styles";
import { colors, spacing } from "../../utils";

interface IProps {
  text: string;
  icon?: ReactElement;
  backgroundColor?: string;
  color?: string;
  height?: string | number;
  borderRadius?: string | number;
}

function BorderedText({ text, icon, backgroundColor, color, height }: IProps) {
  return (
    <Container height={height} backgroundColor={backgroundColor}>
      {icon && <div style={{ marginRight: spacing.xxsmall }}>{icon}</div>}
      <H4 semiBold color={color ? color : colors.grey}>
        {text}
      </H4>
    </Container>
  );
}

export default memo(BorderedText);
