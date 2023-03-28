import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../utils";

interface StyleProps {
  height?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
  cursor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
  border: 0px solid transparent;
  padding: ${spacing.xxsmall};
  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
`;

export const CloseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding: 2px;
  background-color: ${colors.primary};
  box-shadow: ${boxShadow.light};
  border-radius: ${borderRadius.small};
  cursor: pointer;
  margin-bottom: ${spacing.small};
`;
