import styled from "styled-components";
import { colors, boxShadow, spacing, borderRadius } from "../../utils";

interface StyleProps {
  height?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.smokeWhite};
  height: ${(p: StyleProps) => (p.height ? p.height : "28px")};
  padding: 0px ${spacing.small};
  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
`;
