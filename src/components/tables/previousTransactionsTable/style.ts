import styled from 'styled-components';
import { colors, spacing, borderRadius, fontWeight } from '../../../utils';

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
  font-family: Rubik;
  background-color: ${colors.smokeWhite};
  padding: 8px;
  font-weight: ${fontWeight.semiBold};
  color: ${colors.primary};
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : colors.white)};
  :first-child {
    border-radius: 10px 0 0 10px;
  }
  :last-child {
    border-radius: 0 10px 10px 0;
  }
`;

export const TD = styled.td`
  font-family: Rubik;
  padding: 8px;
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : colors.white)};
  color: ${(p: StyleProps) => (p.color ? p.color : colors.greyVariantThree)};
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

export const ViewContent = styled.div`
  padding: ${spacing.xxsmall} ${spacing.xxsmall};
  border-radius: ${borderRadius.small};
  background-color: ${colors.primary};
  cursor: pointer;
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;
