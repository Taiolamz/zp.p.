import { memo } from "react";

import { H1, H4 } from "../../../styles";
import { colors } from "../../../utils";
import { Container } from "./style";

export interface KycLevelCardIProps {
  id?: number;
  isSelected?: boolean;
  count: number;
  title: string;
}

interface IProps extends KycLevelCardIProps {
  onClick?: () => void;
}
function KycLevelCard({ isSelected, count, title, onClick }: IProps) {
  return (
    <Container isSelected={isSelected} onClick={onClick}>
      <H4 left color={colors.grey}>
        {title}
      </H4>
      <H1 left bold color={colors.primary}>
        {count}
      </H1>
      <H4 left color={colors.grey}>
        Total Records
      </H4>
    </Container>
  );
}

export default memo(KycLevelCard);
