import styled from 'styled-components';
import { spacing } from '../../utils';

interface StyleProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const Content = styled.div`
  margin: ${spacing.small} 0px;
  width: 22%;
  @media (max-width: 768px) {
    margin: ${spacing.xsmall} 0px;
    width: 45%;
  }
`;
