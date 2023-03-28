import styled from "styled-components";
import { colors, spacing } from "../../utils";

interface StyleProps {
  cursor?: string;
}

export const Container = styled.div`
  display: flex;
  align-self: flex-start;
  cursor: ${(p: StyleProps) => (p.cursor ? p.cursor : "pointer")};
`;

export const ViewContentContainer = styled.div``;

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
