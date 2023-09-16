import styled from 'styled-components';
import { colors, spacing, borderRadius, boxShadow } from '../../../utils';

interface StyleProps {
  isSelected?: boolean;
  backgroundColor?: string;
}

export const Container = styled.div`
  background-color: ${(p: StyleProps) => p.backgroundColor};

  @media (max-width: 768px) {
    padding: ${spacing.xsmall};
  }
`;
