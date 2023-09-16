import styled from "styled-components";
import { colors, spacing, borderRadius } from "../../utils";

interface StyleProps {
  error?: string;
  backgroundColor?: string;
  borderColor?: string;
  value?: string;
}

export const InputContainer = styled.textarea`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: ${spacing.xsmall};
  padding-right: ${spacing.xxsmall};
  border: 1px solid
    ${(p: StyleProps) =>
      p.error ? colors.red : p.borderColor ? p.borderColor : colors.primary};
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : "transparent"};
  border-radius: ${borderRadius.small};
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 1px
      ${(p: StyleProps) => (p.error ? colors.red : colors.primary)};
  }
`;
