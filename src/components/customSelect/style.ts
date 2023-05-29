import styled from 'styled-components';
import { colors, spacing } from '../../utils';

export const CustomSelectContainer = styled.div`
  position: relative;
`;
export const PopupContainer = styled.div``;

export const ItemStyle = styled.div`
  border-bottom: 0.67px solid #7e7e96;
  padding: 10px 10px;
`;

export const TriggerStyle = styled.button`
  background: ${colors.secondary};
  border-radius: 3.5px;
  border: none;
  padding: ${spacing.xsmall};
  min-width: 5.5rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: space-between;
`;
