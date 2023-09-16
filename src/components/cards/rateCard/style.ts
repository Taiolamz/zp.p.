import styled from 'styled-components';
import { colors, spacing, borderRadius, boxShadow } from '../../../utils';

interface StyleProps {
  isSelected?: boolean;
  backgroundColor?: string;
}

export const Container = styled.div`
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) => p.backgroundColor};
  padding: ${spacing.xsmall} ${spacing.xsmall};
  height: max-content;
  width: min-content;
  @media (max-width: 768px) {
    padding: ${spacing.xsmall};
  }
`;
