import styled from 'styled-components';
import { colors, spacing } from '../../../utils';

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
  border-spacing: 0 1px;
  width: 100%;
  overflow-x: hidden;
`;

export const TH = styled.th`
  background-color: ${colors.smokeWhite};
  padding: 8px;
  color: ${colors.greyVariantOne};
`;

export const TD = styled.td`
  // font-size: 12px;
  padding: 8px;
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : colors.white)};
  color: ${(p: StyleProps) => (p.color ? p.color : colors.grey)};
  :first-child {
    border-radius: 10px 0 0 10px;
  }
  :last-child {
    border-radius: 0 10px 10px 0;
  }
`;

export const TR = styled.tr`
  border-radius: 10px;
  margin-bottom: 1px;
`;
