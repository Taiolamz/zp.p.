import styled from 'styled-components';
import { spacing } from '../../utils';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  @media (max-width: 768px) {
    grid-template-columns: 100% 100%;
  }
`;

export const TableContainer = styled.div`
  margin-bottom: ${spacing.small};
`;

export const NotificationTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${spacing.large} 0;
`;

/// New App Content Style ///
export const NewAppContainer = styled.div`
  margin-top: ${spacing.medium};
  margin-bottom: ${spacing.xlarge};
  max-width: 35.938rem;
`;
