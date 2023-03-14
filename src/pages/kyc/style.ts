import styled from "styled-components";
import { spacing } from "../../utils";
export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  @media (max-width: 768px) {
    grid-template-columns: 100% 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.large};
  margin-top: ${spacing.small};
`;
