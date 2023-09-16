import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../utils';

export const Container = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.small} ${spacing.small};
  border-radius: ${borderRadius.medium};
  width: 100%;
  height: 100%;
`;

export const TransactionHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${spacing.small};
`;

export const TransactionMain = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  /* justify-content: space-between; */

  @media (max-width: 400px) {
    grid-template-columns: auto;
  }
`;

export const TransactionMainLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacing.large};
  justify-content: space-between;
`;

export const TransactionMainText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacing.small};
  margin-bottom: ${spacing.medium};
`;

export const TransactionMainLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  column-gap: ${spacing.xxsmall};
  row-gap: ${spacing.small};
  > div {
    display: flex;
    column-gap: ${spacing.xsmall};
  }
`;
