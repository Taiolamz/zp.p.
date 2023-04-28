import styled from "styled-components";
import { colors, spacing, borderRadius } from "../../utils";

interface StyleProps {
  height?: string | number;
  width?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
  cursor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  cursor: ${(p: StyleProps) => (p.cursor ? p.cursor : "pointer")};
  background-color: transparent;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  cursor: ${(p: StyleProps) => (p.cursor ? p.cursor : "pointer")};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.green};
  height: ${(p: StyleProps) => (p.height ? p.height : "35px")};
  width: ${(p: StyleProps) => (p.width ? p.width : "40px")};
  padding: 2px ${spacing.xxsmall};
  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
  margin-bottom: 1px;
  margin-left: auto;
  margin-right: auto;
`;
