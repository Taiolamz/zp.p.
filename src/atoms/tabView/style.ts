import styled from 'styled-components';
import { colors, spacing } from '../../utils';

interface StyleProps {
  backgroundColor?: string;
  type?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  align-self: flex-start;
  background-color: ${(p: StyleProps) => (p.backgroundColor ? p.backgroundColor : 'transparent')};
  padding-left: ${(p: StyleProps) => (p.backgroundColor ? spacing.xxsmall : '0px')};
  padding-right: ${(p: StyleProps) => (p.backgroundColor ? spacing.xxsmall : '0px')};
  padding-top: ${spacing.xxsmall};
  padding-bottom: ${spacing.xxsmall};
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
