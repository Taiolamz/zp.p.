import styled from "styled-components";
import { spacing } from "../../utils";

export const Container = styled.div`
  padding: 0 ${spacing.xsmall};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 576px) {
    width: 300px;
  }
  @media (max-width: 480px) {
    width: 300px;
  } ;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  margin-top: ${spacing.small};
`;
