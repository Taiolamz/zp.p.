import styled from "styled-components";
import { spacing } from "../../utils";

interface StyleProps {
  paddingRight?: boolean;
}

export const Container = styled.div`
  margin-right: ${(p: StyleProps) => (p.paddingRight ? spacing.small : "0px")};
  cursor: pointer;
`;
