import styled from 'styled-components';
import { spacing } from '../../utils';

export const CustomerProfileContainer = styled.div``;

export const HeaderContainer = styled.div`
  text-align: start;
  border-bottom: 1px solid #7e7e96;
  padding-bottom: ${spacing.small_2};
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: ${spacing.large};
  padding-right: ${spacing.small};
  padding-top: ${spacing.small};
  row-gap: ${spacing.medium};

  @media (max-width: 1067px) {
    grid-template-columns: auto auto;
  }
`;

export const Items = styled.div`
  display: grid;
  row-gap: ${spacing.xsmall};
`;
