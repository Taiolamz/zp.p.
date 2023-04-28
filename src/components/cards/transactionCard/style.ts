import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../../utils";

interface StyleProps {
  header?: boolean;
  backgroundColor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.xsmall} ${spacing.xxsmall};
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
  margin-bottom: ${(p: StyleProps) => (p.header ? 0 : spacing.xsmall)};
  column-gap: 2rem;
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;

export const H1TextContainer = styled.div`
  width: 15%;
`;

export const MainTextContainer = styled.div`
  width: 100%;
`;
export const ViewContentContainer = styled.div`
  width: 20%;
`;

export const ViewContent = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.primary};
  cursor: pointer;
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;
