import styled from 'styled-components';
import { colors, spacing } from '../../utils';

export const Container = styled.div`
  padding: 0 ${spacing.xxsmall};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 24.688rem;
  margin-left: auto;
  height: 500px;
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

export const SubCardContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: grid;
  row-gap: ${spacing.xsmall};
  margin-top: ${spacing.small};
  padding-right: 0.5rem;

  ::-webkit-scrollbar {
    width: 0.5em;
  }

  ::-webkit-scrollbar-track {
    background-color: ${colors.greyVariantSix};
  }

  ::-webkit-scrollbar-thumb {
    outline: 1px solid ${colors.greyVariantTwo};
    background-color: ${colors.smokeWhite};
    border: 1px solid ${colors.greyVariantTwo};
    border-radius: 8px;
  }
`;

export const BtnContainer = styled.div`
  width: fit-content;
  background-color: ${colors.primary};
  margin: auto;
  padding: ${spacing.xsmall} ${spacing.small_2};
  border-radius: 8px;
`;
