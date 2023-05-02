import styled from "styled-components";
import { colors, spacing } from "../../utils";

interface StyleProps {
  backgroundColor?: string;
}

export const TransactionContainer = styled.div`
  width: 100%;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
    overflow-x: scroll;
  @media (max-width: 768px) {
    // flex-wrap: wrap;
  }
`;
