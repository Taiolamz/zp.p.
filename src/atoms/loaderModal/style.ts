import styled from "styled-components";
import { spacing, colors, borderRadius } from "../../utils";

interface StyleProps {
  height?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
  cursor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
  width: 900px;
  height: 90vh;
  padding: ${spacing.xxsmall};
  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
  @media (max-width: 768px) {
    width: 700px;
  }
  @media (max-width: 576px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    width: 450px;
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
