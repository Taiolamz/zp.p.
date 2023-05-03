import styled from "styled-components";
import { colors, spacing } from "../../utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 200px;
  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const Content = styled.div`
  background-color: ${colors.smokeWhite};
  display: flex;
  flex-direction: column;
  padding-left: 30px;

  padding-right: ${spacing.small};
  @media (max-width: 768px) {
    padding: 0px ${spacing.xsmall};
  }
`;
