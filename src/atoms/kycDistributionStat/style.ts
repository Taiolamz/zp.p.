import styled from 'styled-components';
import { colors, spacing } from '../../utils';

export const Container = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.small_2};
  display: grid;
  row-gap: ${spacing.small};
  border-radius: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
  }
`;

export const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: stretch;
  column-gap: ${spacing.small_2};

  @media (max-width: 450px) {
    grid-template-columns: auto;
  }
`;

export const TopItemOne = styled.div`
  padding: ${spacing.xsmall} 0;
`;

export const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: ${spacing.xsmall};
`;
