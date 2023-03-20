import { memo } from "react";
import { FiMoreVertical } from "react-icons/fi";
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
  icon?: boolean;
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
      header={header}
      onClick={onClick}>
      <H1TextContainer>
        <H4 left color={colors.primary}>
          {id}
        </H4>
      </H1TextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {name}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {tid}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {amount}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {type}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {status}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {time}
        </H4>
      </MainTextContainer>
      <ViewContentContainer>
        {!header && icon && (
          <ViewContent onClick={onClick}>
            <FiMoreVertical color={colors.white} size={20} />
          </ViewContent>
        )}
      </ViewContentContainer>
    </Container>
  );
}

export default memo(TransactionCard);
