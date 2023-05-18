import styled from 'styled-components';
import { colors, spacing, borderRadius, boxShadow } from '../../../utils';

interface StyleProps {
  isSelected?: boolean;
  backgroundColor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) => p.backgroundColor};
  height: 100%;
  padding: ${spacing.small} ${spacing.small};
  width: 100%;
  @media (max-width: 768px) {
    padding: ${spacing.xsmall};
  }
`;
