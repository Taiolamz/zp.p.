import styled from 'styled-components';
import { colors, fontWeight, spacing } from '../../../utils';

interface StyleProps {
  backgroundColor?: string;
  color?: string;
}

export const TableContainer = styled.div`
  overflow: auto;
  width: 100%;
`;
export const TransactionContainer = styled.div`
  width: 100%;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
`;

export const TableTag = styled.table`
  border-collapse: separate;
  border-spacing: 0 8px;
  width: 100%;
  overflow-x: hidden;
`;

export const TH = styled.th`
  padding: 8px;
  color: ${colors.primary};
  font-weight: ${fontWeight.semiLight};
  font-size: 0.875rem;
`;

export const TD = styled.td`
  padding: 8px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  font-size: 0.875rem;

  :first-child {
    border-radius: 10px 0 0 10px;
  }
  :last-child {
    border-radius: 0 10px 10px 0;
  }
`;

export const TR = styled.tr`
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const TDStatus = styled.p`
  /* background-color: item.statusBG; */
  color: ${colors.white};
  margin: 0;
  border-radius: 15px;
  text-align: center;
  padding: ${spacing.xxsmall};
`;
