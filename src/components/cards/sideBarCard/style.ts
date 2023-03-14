import styled from "styled-components";
import { colors, boxShadow, spacing, borderRadius } from "../../../utils";

interface StyleProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Indicator = styled.div`
  height: 40px;
  width: 5px;
  background-color: ${(p: StyleProps) =>
    p.isSelected ? colors.primary : colors.white};
  margin-right: 15px;
  border-top-right-radius: ${borderRadius.small};
  border-bottom-right-radius: ${borderRadius.small};
`;

export const Icon = styled.div`
  margin-right: ${spacing.xxsmall};
  color: ${(p: StyleProps) =>
    p.isSelected ? colors.white : colors.greyVariantFour};
`;

export const Content = styled.div`
  border-radius: ${borderRadius.medium};
  background-color: ${(p: StyleProps) =>
    p.isSelected ? colors.primary : colors.white};
  color: ${(p: StyleProps) => (p.isSelected ? colors.white : colors.primary)};
  height: 51px;
  width: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 25px;
`;
