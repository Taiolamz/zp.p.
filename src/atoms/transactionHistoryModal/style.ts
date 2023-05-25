import styled from 'styled-components';
import { colors, spacing } from '../../utils';

export const Container = styled.div`
  padding: 0 ${spacing.xsmall};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 40.688rem; */
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 700px) {
    width: 500px;
    height: 500px;
  }
  @media (max-width: 576px) {
    width: 300px;
  }
  @media (max-width: 480px) {
    width: 300px;
  }
`;

export const BtnContainer = styled.div`
  width: fit-content;
  background-color: ${colors.primary};
  margin-left: auto;
  padding: ${spacing.xsmall} ${spacing.small_2};
  border-radius: 8px;
`;

export const SearchContainer = styled.div`
  margin-left: auto;
  display: flex;
  margin-bottom: ${spacing.xsmall};
  margin-top: ${spacing.xsmall};
`;

export const CountInfoContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
