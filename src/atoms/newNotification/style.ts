import styled from 'styled-components';
import { spacing } from '../../utils';

export const MiniInput1 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  align-items: center;
  row-gap: ${spacing.small};
  margin-bottom: ${spacing.small};

  @media (max-width: 370px) {
    grid-template-columns: 100%;
  }
`;

export const MiniInput2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  align-items: flex-start;
  row-gap: ${spacing.small};
  margin-bottom: ${spacing.small};

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (max-width: 370px) {
    grid-template-columns: auto;
  }
`;

export const SingleMiniInput = styled.div`
  display: grid;
  row-gap: ${spacing.xsmall};
`;

export const RadioStyle = styled.div`
  margin-bottom: ${spacing.medium};
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 30%;
  column-gap: ${spacing.small};
`;
