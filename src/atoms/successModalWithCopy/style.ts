import styled from "styled-components";
import { spacing, colors } from "../../utils";

export const Container = styled.div`
  padding: 0 ${spacing.xsmall};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OptionText = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${colors.smokeWhite};
  padding: ${spacing.xsmall} ${spacing.xxsmall};
`;
