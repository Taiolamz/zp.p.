import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../utils';

interface StyleProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  padding: ${spacing.small} ${spacing.small};
`;
