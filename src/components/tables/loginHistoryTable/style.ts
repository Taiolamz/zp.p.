import styled from 'styled-components';
import { colors, fontWeight } from '../../../utils';

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
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : colors.white)};
`;

export const TableTag = styled.table`
  border-collapse: separate;
  border-spacing: 0 8px;
  width: 100%;
  overflow-x: hidden;
`;

export const TH = styled.th`
  font-family: Rubik;
  padding: 8px;
  color: ${colors.primary};
  font-weight: ${fontWeight.semiLight};
  font-size: 0.875rem;
`;

export const TD = styled.td`
  font-family: Rubik;
  padding: 8px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  font-size: 0.875rem;

  :first-child {
    border-radius: 5px 0 0 5px;
  }
  :last-child {
    border-radius: 0 5px 5px 0;
  }
`;

export const TR = styled.tr`
  border-radius: 10px;
  margin-bottom: 10px;
`;
