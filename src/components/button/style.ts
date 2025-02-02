import { ReactElement } from 'react';
import styled from 'styled-components';
import { colors, boxShadow, spacing, borderRadius } from '../../utils';

interface StyleProps {
  secondary?: boolean;
  icon?: ReactElement;
  disabled?: boolean;
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
}

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  background-color: ${(p: StyleProps) =>
    p.disabled
      ? colors.greyVariantThree
      : p.secondary
      ? 'transparent'
      : p.backgroundColor
      ? p.backgroundColor
      : colors.primary};
  box-shadow: ${(p: StyleProps) => (p.boxShadow ? p.boxShadow : boxShadow.light)};
  height: 50px;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${(p: StyleProps) =>
    p.disabled
      ? colors.greyVariantThree
      : p.borderColor
      ? p.borderColor
      : p.secondary
      ? colors.primary
      : colors.primary};
  border-radius: ${borderRadius.medium};
  cursor: pointer;
`;

export const ButtonIcon = styled.div`
  margin-right: ${spacing.xxsmall};
  color: ${(p: StyleProps) => (p.color ? p.color : colors.primary)};
`;

export const DisabledContainer = styled.div`
  position: relative;
`;
