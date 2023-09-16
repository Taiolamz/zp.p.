import styled from 'styled-components';
import { spacing } from '../../utils';

interface StyleProps {
  backgroundColor?: string;
  type?: string;
}

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  align-self: flex-start;
  background-color: ${(p: StyleProps) => p.backgroundColor};
  border: 1px solid rgba(106, 97, 111, 0.5);
  box-shadow: inset 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: ${spacing.xxsmall};
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
