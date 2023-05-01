import { memo, ReactElement } from "react";
import { MoreIcon } from "../..";
import { H1, H4, H6 } from "../../../styles";
import { colors } from "../../../utils";
import {
  Container,
  ViewContent,
  MainTextContainer,
  ViewContentContainer,
  H1TextContainer,
} from "./style";

export interface TransactionCardIProps {
  id?: number | string;
  tid?: number | string;
  name: string;
  amount: number | string;
  status: string;
  type: string;
  time: string;
  icon?: ReactElement;
  backgroundColor?: string;
  cardType?: string;
}

interface IProps extends TransactionCardIProps {
  onClick?: () => void;
  header?: boolean;
}
function TransactionCard({
  id,
  tid,
  name,
  amount,
  status,
  type,
  time,
  icon,
  onClick,
  header = false,
  cardType,
  backgroundColor,
}: any) {
  return (
    <Container
      backgroundColor={header ? "transparent" : colors.white}
      header={header}>
      <H1TextContainer>
        <H4 left color={header ? colors.primary : colors.grey}>
          {id}
        </H4>
      </H1TextContainer>
      <MainTextContainer>
        <H4 left style={{paddingRight: "2rem"}} color={header ? colors.primary : colors.grey}>
          {name}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={header ? colors.primary : colors.grey}>
          {tid}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={header ? colors.primary : colors.grey}>
          {amount}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={header ? colors.primary : colors.grey}>
          {type}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4
          left
          color={
            header
              ? colors.primary
              : status === "success"
              ? colors.greenVariantTwo
              : colors.red
          }>
          {header
            ? status
            : status === "success"
            ? "Successful"
            : "Unseccessful"}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={header ? colors.primary : colors.grey}>
          {time}
        </H4>
      </MainTextContainer>
      <ViewContentContainer>
        {!header && icon && (
          <ViewContent>
            <MoreIcon onClick={onClick} />
          </ViewContent>
        )}
      </ViewContentContainer>
    </Container>
  );
}

export default memo(TransactionCard);
