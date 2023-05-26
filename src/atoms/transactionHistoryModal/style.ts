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
  max-width: 980px;
  width: 60vw;
  max-height: 80vh;
  @media (max-width: 760px) {
    width: 80vw;
  }
  @media (max-width: 576px) {
    width: 80vw;
  }
  @media (max-width: 480px) {
    width: 80vw;
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
  width: 60%;
  grid-template-columns: repeat(3, 1fr);
`;
