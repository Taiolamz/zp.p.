import styled from "styled-components";
export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  @media (max-width: 768px) {
    grid-template-columns: 100% 100%;
  }
`;