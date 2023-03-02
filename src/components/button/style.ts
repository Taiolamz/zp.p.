import { ReactElement } from "react";
import styled from "styled-components";
import { colors, boxShadow, spacing, borderRadius } from "../../utils";

interface StyleProps {
  secondary?: boolean;
  icon?: ReactElement;
}

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  background-color: ${(p: StyleProps) =>
    p.secondary ? colors.primary : colors.primary};
  box-shadow: ${boxShadow.light};
  height: 43px;
  width: 100%;
  border: none;
  border-radius: ${borderRadius.medium};
  cursor: pointer;
`;

export const ButtonIcon = styled.div`
  margin-right: ${spacing.xxsmall};
  color: ${(p: StyleProps) =>
    p.icon ? colors.primary : colors.primary};
`;

export const Image = styled.img`
  position: absolute;
  top: -30px;
  z-index: 1;
  width: 60px;
  height: 60px;
  border-radius: ${borderRadius.large};
`;
