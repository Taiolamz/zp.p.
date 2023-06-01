import styled from 'styled-components';
import { colors, spacing } from '../../utils';
export const Container = styled.div`
  display: grid;
  padding: ${spacing.small} 0;
  row-gap: ${spacing.small};

  @media (max-width: 768px) {
  }
`;

export const StatCount = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  @media (max-width: 940px) {
    grid-template-columns: repeat(2, auto);
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 20.7% 36.6% 36%;
  justify-content: space-between;
  height: 100%;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, 50%);
    row-gap: ${spacing.small_2};
    column-gap: ${spacing.small_2};
  }

  @media (max-width: 940px) {
    grid-template-columns: 100%;
  }
`;

export const FourBoxContainer = styled.div`
  display: grid;
  row-gap: 1rem;
  width: 100%;
`;

export const TwoBoxContainerTop = styled.div`
  display: grid;
  grid-template-columns: 47% 47%;
  column-gap: 1rem;
  align-items: stretch;
  width: 100%;
  /* justify-content: space-between; */
  @media (max-width: 768px) {
  }
`;
export const TwoBoxContainerBottom = styled.div`
  display: grid;
  grid-template-columns: 47% 47%;
  column-gap: 1rem;
  align-items: stretch;
  height: 100%;
  @media (max-width: 768px) {
  }
`;
export const TwoBoxItemTop = styled.div`
  display: grid;
  /* height: 10px; */
  background-color: ${colors.white};
  width: 100%;
  border-radius: 10px;
  padding: ${spacing.xsmall};
  justify-content: space-between;

  @media (max-width: 768px) {
  }
`;

export const TwoBoxItemBottom = styled.div`
  display: grid;
  /* height: max-content; */
  background-color: ${colors.white};
  width: 100%;
  border-radius: 10px;
  padding: ${spacing.xsmall};
  justify-content: space-between;

  @media (max-width: 768px) {
  }
`;

export const TwoBoxItemActive = styled.div`
  display: flex;
  /* height: max-content; */
  background-color: ${colors.white};
  width: 100%;
  border-radius: 10px;
  padding: ${spacing.xsmall};
  justify-content: space-between;
`;

export const TwoBoxActive = styled.div`
  display: grid;
  row-gap: ${spacing.small_2};
`;

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 48%);
  justify-content: space-between;
  row-gap: ${spacing.small_2};
  column-gap: ${spacing.small_2};

  @media (max-width: 980px) {
    grid-template-columns: 100%;
    row-gap: ${spacing.small_2};
    column-gap: ${spacing.small_2};
  }
`;
