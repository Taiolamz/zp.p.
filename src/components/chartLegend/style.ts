import styled from 'styled-components';
import { spacing } from '../../utils';

export const TransactionMainLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  column-gap: ${spacing.small};
  row-gap: ${spacing.small};
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }

  width: 100%;
  > div {
    display: flex;
    column-gap: ${spacing.xsmall};
    align-items: center;
    justify-content: space-between;
  }
`;
