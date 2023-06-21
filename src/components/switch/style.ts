import styled from 'styled-components';
import { spacing, borderRadius } from '../../utils';
interface StyleProps {
  paddingVertical?: number | string;
  borderRadius?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  marginBottom?: number | string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CustomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${(p: StyleProps) => (p.paddingVertical ? p.paddingVertical : spacing.xxsmall)};
  padding-bottom: ${(p: StyleProps) => (p.paddingVertical ? p.paddingVertical : spacing.xxsmall)};
  border-radius: ${(p: StyleProps) => (p.borderRadius ? borderRadius.small : 0)};
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : 'transparent')};
  border-color: ${(p: StyleProps) => (p.borderColor ? p.borderColor : 'transparent')};
  border-width: 0.2px;
  border-style: solid;
  padding-left: ${(p: StyleProps) => (p.paddingLeft ? p.paddingLeft : spacing.xxsmall)};
  padding-right: ${(p: StyleProps) => (p.paddingRight ? p.paddingRight : spacing.xxsmall)};
  margin-bottom: ${(p: StyleProps) => (p.marginBottom ? p.marginBottom : '0px')};
`;
