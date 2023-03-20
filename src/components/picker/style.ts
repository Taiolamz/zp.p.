import styled from "styled-components";
import { spacing, colors, borderRadius } from "../../utils";

interface StyleProps {
  backgroundColor?: string;
  height?: number | string;
  error?: string;
}

export const Container = styled.div`
  width: 150px;
  padding: 0px ${spacing.xxsmall};
  border-radius: ${borderRadius.medium};
  align-self: flex-start;
  border: 1px solid ${(p: StyleProps) => (p.error ? colors.red : colors.grey)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
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
