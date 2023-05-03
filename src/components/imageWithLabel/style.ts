import styled from "styled-components";
import { spacing, borderRadius } from "../../utils";

interface StyleProps {
  height?: string | number;
  width?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
  cursor?: string;
  approved?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  background-color: transparent;
  @media (max-width: 576px) {
    margin-bottom: ${spacing.small};
  } ;
`;

export const ApproveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: ${spacing.xxsmall};
`;

export const Image = styled.img`
  height:  ${(p: StyleProps) => (p.approved ? "150px" : "auto")};
  width: 100%;
  max-width: 200px;
  object-fit: fill;
  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
  cursor: ${(p: StyleProps) => (p.cursor ? p.cursor : "pointer")};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : "transparent"};
  margin-bottom: 5px;
  @media (max-width:576px) {
    max-width: 250px;
  };
  @media (max-width:480px) {
    max-width: width: 250px;
  };
`;
