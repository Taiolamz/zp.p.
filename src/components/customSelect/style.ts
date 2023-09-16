import styled from 'styled-components';
import { colors, spacing } from '../../utils';

interface StyleProps {
  btnBackgroundColor?: string;
  btnColor?: string;
  btnWidth?: number | string;
}

export const CustomSelectContainer = styled.div`
  position: relative;
`;
export const PopupContainer = styled.div``;

export const ItemStyle = styled.div`
  border-bottom: 0.67px solid #7e7e96;
  padding: 10px 10px;
`;

export const TriggerStyle = styled.button`
  color: ${(p: StyleProps) => (p.btnColor && p.btnColor ? p.btnColor : colors.greyDark)};
  background-color: ${(p: StyleProps) =>
    p.btnBackgroundColor && p.btnBackgroundColor ? p.btnBackgroundColor : colors.secondary};
  border-radius: 3.5px;
  border: none;
  padding: ${spacing.xsmall};
  min-width: ${(p: StyleProps) => (p.btnWidth && p.btnWidth ? p.btnWidth : '5.5rem')};
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: space-between;
`;
