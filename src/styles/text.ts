import styled from 'styled-components';
import { colors, fontWeight } from '../utils';

interface StyleProps {
  left?: boolean;
  right?: boolean;
  center?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  light?: boolean;
  semiLight?: boolean;
  lightBold?: boolean;
}

export const HB = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.semiLight
      ? fontWeight.semiLight
      : p.lightBold
      ? fontWeight.lightBold
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 1.2em;
  font-family: Poppins;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 2em;
  }
`;

export const H1 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.semiLight
      ? fontWeight.semiLight
      : p.lightBold
      ? fontWeight.lightBold
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 1em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 1.5em;
  }
`;

export const H2 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.semiLight
      ? fontWeight.semiLight
      : p.lightBold
      ? fontWeight.lightBold
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 0.9em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 1.2em;
    // font-size: 0.6em;
  }
`;

export const H3 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.lightBold
      ? fontWeight.lightBold
      : p.semiLight
      ? fontWeight.semiLight
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 0.8em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 1em;
  }
`;

export const H4 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.lightBold
      ? fontWeight.lightBold
      : p.semiLight
      ? fontWeight.semiLight
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 0.7em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 0.9em;
  }
`;

export const H5 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.lightBold
      ? fontWeight.lightBold
      : p.semiLight
      ? fontWeight.semiLight
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 0.6em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 0.8em;
  }
`;

export const H6 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.lightBold
      ? fontWeight.lightBold
      : p.semiLight
      ? fontWeight.semiLight
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 0.5em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 0.7em;
  }
`;

export const H7 = styled.div`
  font-weight: ${(p: StyleProps) =>
    p.bold
      ? fontWeight.bold
      : p.semiBold
      ? fontWeight.semiBold
      : p.lightBold
      ? fontWeight.lightBold
      : p.semiLight
      ? fontWeight.semiLight
      : fontWeight.light};
  color: ${({ color }: any) => (color ? color : colors.black)};
  font-size: 0.3em;
  font-family: Rubik;
  text-align: ${(p: StyleProps) => (p.right ? 'right' : p.left ? 'left' : 'center')};
  @media (min-width: 48rem) {
    font-size: 0.5em;
  }
`;
