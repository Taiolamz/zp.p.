import styled from "styled-components";
import { spacing } from "../../utils";

export const Container = styled.div`
  padding: 0 ${spacing.xsmall};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
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
  width: 100%;
  flexgrow: 1;
  marginleft: auto;
  marginright: auto;
`;
