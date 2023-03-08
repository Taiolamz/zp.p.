import styled from "styled-components";
import { colors, spacing } from "../utils";

const Container = styled.div`
  background-color: ${colors.smokeWhite};
  display: flex;
  flex-direction: column;
  padding-left: 230px;
  @media (max-width: 768px) {
    padding-left: 0px;
    padding: 0px ${spacing.xsmall};
  }
`;

export default Container;
