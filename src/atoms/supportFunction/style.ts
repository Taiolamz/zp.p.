import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../utils';

export const Container = styled.div`
  background-color: ${colors.primary};
  border-radius: ${borderRadius.semi_medium};
  display: grid;
  row-gap: ${spacing.small};
  padding: ${spacing.small_2};
  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;
