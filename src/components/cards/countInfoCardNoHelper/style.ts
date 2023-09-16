import styled from 'styled-components';
import { colors, spacing, borderRadius, boxShadow } from '../../../utils';

interface StyleProps {
  isSelected?: boolean;
  backgroundColor?: string;
}

export const Container = styled.div`
  background-color: ${(p: StyleProps) => p.backgroundColor};
  height: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  @media (max-width: 768px) {
    /* padding: ${spacing.xsmall}; */
  }
`;
