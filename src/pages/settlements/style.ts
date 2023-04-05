import styled from "styled-components";
import { spacing } from "../../utils";

export const AllTransactionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${spacing.small};
`;

export const AllTransactionContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 50%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const DateContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const InfoCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: ${spacing.small} 0px;
`;

export const InfoCountContent = styled.div`
  width: 30%;
`;

export const TabViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: ${spacing.small} 0px;
`;

export const TabContentTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const EscalateFormContainer = styled.div`
  padding: 0px ${spacing.medium};
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 320px) {
    width: 100%;
  }
`;

export const EscalateBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  @media (max-width: 320px) {
    width: 100%;
  }
`;

export const CustomerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 35%;
  @media (max-width: 320px) {
    width: 100%;
  }
`;

export const ReconciliationSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin: ${spacing.small} 0 ${spacing.medium} 0;
  @media (max-width: 320px) {
    width: 100%;
  }
`;
