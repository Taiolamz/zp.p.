// export const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   align-self: flex-start;
//   cursor: ${(p: StyleProps) => (p.cursor ? p.cursor : "pointer")};
//   background-color: ${(p: StyleProps) =>
//     p.backgroundColor ? p.backgroundColor : colors.smokeWhite};
//   height: ${(p: StyleProps) => (p.height ? p.height : "38px")};
//   padding: 0px ${spacing.small};
//   border-radius: ${(p: StyleProps) =>
//     p.borderRadius ? p.borderRadius : borderRadius.medium};
// `;

import styled from "styled-components";
import { spacing, colors, borderRadius } from "../../utils";

interface StyleProps {
  // height?: string | number;
  backgroundColor?: string;
  height?: number | string;
  // borderRadius?: string | number;
  // cursor?: string;
}

export const Container = styled.div`
  width: 150px;
  padding: 0px ${spacing.xxsmall};
  border-radius: ${borderRadius.medium};
  align-self: flex-start;
  // position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  // justify-content: center;
  height: ${(p: StyleProps) => (p.height ? p.height : "38px")};

  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
`;

export const ContentContainer = styled.div`
  position: relative;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
`;

export const Content = styled.div`
  // display: flex;
  // flex-direction: column;
  align-self: flex-start;
  position: absolute;
  z-index: ${1};
  top: ${0};
  padding-right: ${spacing.large};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
`;

export const OptionText = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${colors.smokeWhite};
  padding: ${spacing.xsmall} ${spacing.xxsmall};
`;
