import styled from 'styled-components';
import { spacing } from '../../utils';

interface StyleProps {
  paddingRight?: boolean;
  isSelected?: boolean;
}

export const Container = styled.div`
  /* margin-right: ${(p: StyleProps) =>
    p.paddingRight ? spacing.small : '0px'}; */
  cursor: pointer;
  border-radius: 10px;
  padding: ${spacing.xsmall} ${spacing.small};

  @media (max-width: 600px) {
    width: 100%;
  }
`;
