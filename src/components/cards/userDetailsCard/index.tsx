import { memo } from "react";

import { H1, H4, H6 } from "../../../styles";
import { colors } from "../../../utils";
import {
  Container,
  ViewContent,
  MainTextContainer,
  ViewContentContainer,
} from "./style";

export interface UserDetailsCardIProps {
  id?: number | string;
  isSelected?: boolean;
  userName: string;
  bvn: number | string;
  phoneNo: string | number;
}

interface IProps extends UserDetailsCardIProps {
  onClick?: () => void;
  header?: boolean;
}
function UserDetailsCard({
  id,
  userName,
  bvn,
  phoneNo,
  onClick,
  header = false,
}: IProps) {
  return (
    <Container header={header} onClick={onClick}>
      <H4 left color={colors.primary}>
        {id}
      </H4>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {userName}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {bvn}
        </H4>
      </MainTextContainer>
      <MainTextContainer>
        <H4 left color={colors.primary}>
          {phoneNo}
        </H4>
      </MainTextContainer>
      <ViewContentContainer>
        {!header && (
          <ViewContent onClick={onClick}>
            <H6 semiBold color={colors.white}>
              View
            </H6>
          </ViewContent>
        )}
      </ViewContentContainer>
    </Container>
  );
}

export default memo(UserDetailsCard);
