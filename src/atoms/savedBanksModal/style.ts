import styled from 'styled-components';
import { colors, spacing } from '../../utils';

export const Container = styled.div`
  padding: 0 ${spacing.xsmall};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40.688rem;
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

export const SubContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.black};
  padding-bottom: ${spacing.small_2};
  margin-bottom: ${spacing.small_2};
`;
