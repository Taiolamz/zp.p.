import styled from "styled-components";
import { spacing, colors } from "../../utils";

export const Container = styled.div`
  position: relative;
`;

export const OptionText = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${colors.smokeWhite};
  padding: ${spacing.xsmall} ${spacing.xxsmall};
`;
