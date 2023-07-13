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

  a {
    text-decoration: none;
  }

  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, auto);
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 15% 15%;
  /* grid-template-columns: repeat(4, auto); */
  justify-content: space-between;
  height: 100%;
  column-gap: ${spacing.small};

  @media (max-width: 1150px) {
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

export const TwoBoxContainerItem = styled.div`
  display: grid;
  column-gap: 1rem;
  align-items: stretch;
  width: 100%;
  row-gap: ${spacing.small};
  @media (max-width: 768px) {
  }
`;

export const TwoBoxItemTop = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: ${spacing.xsmall};
  cursor: pointer;

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
  cursor: pointer;
  @media (max-width: 768px) {
  }
`;

export const TwoBoxItemActive = styled.div`
  display: flex;
  /* height: max-content; */
  cursor: pointer;
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
  margin-top: ${spacing.small};

  @media (max-width: 1085px) {
    grid-template-columns: 100%;
    row-gap: ${spacing.small_2};
    column-gap: ${spacing.small_2};
  }
`;

export const TransactionVolumeChart = styled.div`
  a {
    text-decoration: none;
  }
`;

//TRANSACTION INFORMATION STYLES
export const BorderedTexts = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: ${spacing.small_2};
  margin-bottom: ${spacing.xsmall};
`;

export const StatsCount = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${spacing.small_2};
  margin-bottom: ${spacing.small};

  @media (max-width: 980px) {
    grid-template-columns: 100%;
    row-gap: ${spacing.small_2};
    column-gap: ${spacing.small_2};
  }
`;

export const ChartContainer = styled.div`
  margin-bottom: ${spacing.small};
  position: relative;
`;

export const ChartWrapper = styled.div`
  max-width: 98%;
`;

export const LegendContainer = styled.div`
  margin-right: 170px;

  @media (max-width: 1200px) {
    margin-right: 100px;
  }

  @media (max-width: 900px) {
    margin-right: 60px;
  }
`;
