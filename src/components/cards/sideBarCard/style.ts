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
  height: ${(p: StyleProps) => (p.isSelected ? "40px" : "0px")};
  width: ${(p: StyleProps) => (p.isSelected ? "5px" : "0px")};
  background-color: ${colors.primary};
  margin-right: 15px;
  border-top-right-radius: ${borderRadius.small};
  border-bottom-right-radius: ${borderRadius.small};
`;

export const Icon = styled.div`
  margin-right: ${spacing.xxsmall};
  color: ${(p: StyleProps) => (p.isSelected ? colors.primary : colors.grey)};
`;

export const Content = styled.div`
  background-color: ${colors.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${(p: StyleProps) => (p.isSelected ? boxShadow.light : "0px")};
  height: 51px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;
