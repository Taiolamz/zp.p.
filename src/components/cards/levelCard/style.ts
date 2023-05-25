import styled from 'styled-components';
import { colors, spacing, borderRadius, boxShadow } from '../../../utils';

interface StyleProps {
  isSelected?: boolean;
  backgroundColor?: string;
}

export const Container = styled.div`
  background-color: ${(p: StyleProps) => p.backgroundColor};
  display: flex;
  align-items: center;
  position: relative;
  column-gap: ${spacing.xxsmall};

  &:not(:last-child) {
    ::after {
      content: '|';
      position: absolute;
      right: -6px;
      top: -5px;
    }
  }
  @media (max-width: 768px) {
    padding: ${spacing.xsmall};
  }
`;
