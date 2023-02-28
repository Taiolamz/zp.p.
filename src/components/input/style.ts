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
    box-shadow: 0 0 0 1px ${colors.primary};
  }
`;

export const InputContent = styled.input`
  color: ${colors.greyVariantTwo};
  background-color: ${colors.white};
  border: 0px solid ${colors.primary};
  height: 40px;
  width: 95%;
  padding-left: ${spacing.xsmall};
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0px ${colors.primary};
  }
`;
export const InputCover = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const InputIconContainer = styled.div`
  display: ${(p: StyleProps) => (p.error ? "none" : "block")};
`;

export const FormInputContainer = styled.div`
  margin-bottom: ${spacing.small};
`;

export const LabelContainer = styled.div`
  margin-bottom: ${spacing.xxsmall};
`;