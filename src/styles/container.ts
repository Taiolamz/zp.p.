import styled from "styled-components";
import { colors, spacing } from "../utils";

const Container = styled.div`
  background-color: ${colors.smokeWhite};
  display: flex;
  flex-direction: column;
  padding-left: 230px;
  padding-right: ${spacing.small};
  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
    padding: 0px ${spacing.xsmall};
  }
`;

export default Container;
