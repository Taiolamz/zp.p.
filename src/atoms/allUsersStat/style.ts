import styled from 'styled-components';
import { colors, spacing } from '../../utils';

export const Container = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.small_2};
  display: grid;
  height: 100%;
  border-radius: 10px;
  row-gap: ${spacing.small};
  @media (max-width: 768px) {
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: stretch;
`;
export const Bottom = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${spacing.xsmall};
`;
