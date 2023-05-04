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

export const UserContainer = styled.div`
  padding-top: ${spacing.small};
  @media (max-width: 768px) {
    /* grid-template-columns: 100% 100%; */
  }
`;

export const UsersContainer = styled.div`
  margin-top: ${spacing.large};
  @media (max-width: 768px) {
    /* grid-template-columns: 100% 100%; */
  }
`;

export const SearchContainer = styled.div`
  max-width: 16.313em;
  margin-bottom: ${spacing.large};
  @media (max-width: 768px) {
    /* grid-template-columns: 100% 100%; */
  }
`;

export const TableContainer = styled.div`
  margin-bottom: ${spacing.small};
  @media (max-width: 768px) {
    /* grid-template-columns: 100% 100%; */
  }
`;
