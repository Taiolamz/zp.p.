import styled from 'styled-components';
import { spacing, colors } from '../../utils';

export const Container = styled.div`
  padding: 0 ${spacing.xsmall};
  display: flex;
  flex-direction: column;
  width: 705px;
  @media (max-width: 576px) {
    width: 520px;
  }
  @media (max-width: 480px) {
    width: 370px;
  }
  @media (max-width: 320px) {
    width: 300px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing.small};
`;

export const ContentItemTwo = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

export const CardContainer = styled.div`
  margin-bottom: 16px;
`;
