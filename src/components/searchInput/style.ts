import styled from "styled-components";
import { colors, spacing, borderRadius } from "../../utils";

interface StyleProps {
  error?: string;
  backgroundColor?: string;
  borderColor?: string;
  value?: string;
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: ${spacing.xxsmall};
  border-bottom: 1px solid ${colors.grey};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : "transparent"};
  border-radius: ${borderRadius.small};
  &:focus-within {
    outline: none;
    border-bottom: 1px solid ${colors.primary};
  }
`;

export const InputContent = styled.input`
  color: ${colors.primary};
  background-color: ${colors.white};
  border: 0px solid ${colors.primary};
  height: 30px;
  width: 95%;
  padding-left: ${spacing.xsmall};
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0px
      ${(p: StyleProps) => (p.error ? colors.red : colors.primary)};
  }
`;
