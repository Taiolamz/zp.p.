import styled from 'styled-components';
import { colors, spacing, borderRadius, boxShadow } from '../../../utils';

interface StyleProps {
  isSelected?: boolean;
  backgroundColor?: string;
  borderTextColor?: string;
}

export const Container = styled.div`
  background-color: ${(p: StyleProps) => p.backgroundColor};
  height: 100%;
  /* padding: ${spacing.small} ${spacing.small}; */
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border: 2px ${(p: StyleProps) => p.borderTextColor} solid;
    padding: ${spacing.xsmall};
    border-radius: 5px;
    transform: scaleX(1.03);
    transform-origin: right center;
  }
  @media (max-width: 768px) {
    /* padding: ${spacing.small}; */
  }
`;

export const Bottom = styled.div`
  display: flex;
  column-gap: ${spacing.small};
  align-items: flex-end;
  justify-content: space-between;
`;

export const BottomBorder = styled.div`
  border: solid ${(p: StyleProps) => p.borderTextColor} 1px;
  border-radius: ${spacing.xsmall};
`;
