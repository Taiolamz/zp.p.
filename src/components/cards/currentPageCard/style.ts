import styled from "styled-components";
import { colors, spacing } from "../../../utils";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

export const PageNumberContent = styled.div`
  margin-left: ${spacing.xxsmall};
  background-color: ${colors.blueVariantTwo};
  padding: 0px ${spacing.xsmall};
`;
