import styled from 'styled-components';
import { colors, spacing, borderRadius } from '../../../utils';

interface StyleProps {
  backgroundColor?: string;
  color?: string;
}

export const TableContainer = styled.div`
  overflow: auto;
`;
export const TransactionContainer = styled.div`
  width: 100%;
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : colors.white)};
`;

export const TableTag = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
  overflow-x: hidden;
`;

export const TH = styled.th`
  font-family: Rubik;
  background-color: ${colors.smokeWhite};
  padding: 8px;
  color: ${colors.primary};
`;

export const TD = styled.td`
  font-family: Rubik;
  padding: 8px;
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : colors.white)};
  color: ${(p: StyleProps) => (p.color ? p.color : colors.primary)};
  cursor: pointer;
  :first-child {
    border-radius: ${borderRadius.medium} 0 0 ${borderRadius.medium};
  }
  :last-child {
    border-radius: 0 ${borderRadius.medium} ${borderRadius.medium} 0;
  }
`;

export const TR = styled.tr`
  border-radius: 10px;
  margin-bottom: 1px;
`;
