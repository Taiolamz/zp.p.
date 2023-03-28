import { memo, ReactElement } from "react";
import { MoreIcon } from "../..";
import { H1, H4, H6 } from "../../../styles";
import { colors, spacing } from "../../../utils";
import {
  Container,
  ViewContent,
  MainTextContainer,
  ViewContentContainer,
  H1TextContainer,
} from "./style";

export interface TransactionCardIProps {
  name: string;
  kycLevel: string;
  lastSeen: string;
}

interface IProps extends TransactionCardIProps {
  onClick?: () => void;
}
function ReconcialiationCard({ name, kycLevel, lastSeen, onClick }: IProps) {
  return (
    <Container onClick={onClick}>
      <H1TextContainer>
        <H4 left color={colors.grey}>
          {name}
        </H4>
      </H1TextContainer>
      <H1TextContainer>
        <H4 left color={colors.grey}>
          KYC
        </H4>
        <div
          style={{ marginLeft: spacing.xsmall, marginRight: spacing.xsmall }}>
          -
        </div>
        <H4 left color={colors.grey}>
          {kycLevel}
        </H4>
      </H1TextContainer>
      <H1TextContainer>
        <H4 left color={colors.grey}>
          Last Login
        </H4>
        <div
          style={{ marginLeft: spacing.xsmall, marginRight: spacing.xsmall }}>
          -
        </div>
        <H4 left color={colors.grey}>
          {lastSeen}
        </H4>
      </H1TextContainer>
    </Container>
  );
}

export default memo(ReconcialiationCard);
