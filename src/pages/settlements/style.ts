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
  width: 35%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
