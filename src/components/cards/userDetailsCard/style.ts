import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../../utils";

interface StyleProps {
  header?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${spacing.xsmall} ${spacing.xxsmall};
  border-radius: ${borderRadius.small};
  background-color: ${colors.white};
  margin-bottom: ${(p: StyleProps) => (p.header ? 0 : spacing.xsmall)};
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;

export const MainTextContainer = styled.div`
  width: 25%;
`;
export const ViewContentContainer = styled.div`
  width: 5%;
`;

export const ViewContent = styled.div`
  padding: ${spacing.xxsmall} ${spacing.xsmall};
  border-radius: ${borderRadius.small};
  background-color: ${colors.primary};
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;
