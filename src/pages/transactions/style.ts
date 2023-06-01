import styled from 'styled-components';
import { spacing } from '../../utils';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${spacing.small};
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${spacing.xsmall};
  margin-bottom: ${spacing.small};
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 1em;
`;

export const DatePickerContainer = styled.div`
  display: flex;
  column-gap: 1em;
  @media (max-width: 870px) {
    // row-gap: ${spacing.small};
  }
`;
