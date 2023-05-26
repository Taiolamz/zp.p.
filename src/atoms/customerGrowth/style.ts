import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../utils';

export const Container = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.small} ${spacing.small};
  border-radius: ${borderRadius.medium};
  width: 100%;
`;

export const CustomerGrowthHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.primary};
`;

export const CustomerGrowthMain = styled.div`
  display: grid;
  /* grid-template-columns: 50% 50%; */
  /* justify-content: space-between; */
`;

export const CustomerGrowthStat = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TransactionMainText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacing.small};
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

export const CustomerGrowthChart = styled.div``;
