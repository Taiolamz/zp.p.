import styled from "styled-components";
import { spacing, colors } from "../../utils";
export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  // height: 100vh;
  @media (max-width: 768px) {
    // grid-template-columns: 100% 100%;
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

export const KYCTabViewContainer = styled.div`
  margin-top: ${spacing.small};
`;

export const CustomerContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${spacing.small};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CustomerContentOne = styled.div`
  flex-grow: 4;
  @media (max-width: 768px) {
    flex-grow: 1;
  }
`;

export const CustomerContentTwo = styled.div`
  flex-grow: 7;
  display: flex;
  flex-direction: column;
  border-left: 0.2px solid ${colors.primary};
  padding-left: ${spacing.medium};
  @media (max-width: 768px) {
    flex-grow: 1;
    padding-left: ${spacing.xsmall};
  }
`;

export const CustomerContentTwoVerified = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-bottom: ${spacing.small};

  @media (max-width: 768px) {
    width: 60%;
  }

  @media (max-width: 576px) {
    width: 95%;
  }
  @media (max-width: 480px) {
    width: 100%;
  } ;
`;

export const CardContainer = styled.div`
  margin-bottom: 16px;
`;
