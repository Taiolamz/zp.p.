import styled from 'styled-components';
import { colors, spacing, boxShadow } from '../../utils';

export const Container = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.small_2};
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;
  box-shadow: ${boxShadow.light};
  row-gap: ${spacing.small};
  @media (max-width: 768px) {
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: stretch;
  column-gap: ${spacing.small_2};
`;
export const Bottom = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${spacing.xsmall};
`;
