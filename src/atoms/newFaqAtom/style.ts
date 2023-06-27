import styled from 'styled-components';
import { spacing } from '../../utils';

export const MiniInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  align-items: center;
  row-gap: ${spacing.small};
  margin-bottom: ${spacing.small};
`;

export const RadioStyle = styled.div`
  margin-bottom: ${spacing.medium};
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 30%;
  column-gap: ${spacing.small};
`;
