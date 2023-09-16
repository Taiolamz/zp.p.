import styled from "styled-components";
import { spacing, colors, borderRadius, boxShadow } from "../../utils";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.greyVariantTwo};
  width: 75%;
  padding: ${spacing.small} 2.5rem;
  border-radius: 30px;
  box-shadow: ${boxShadow.light};
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 576px) {
    width: 95%;
  }
  @media (max-width: 480px) {
    width: 95%;
  } ;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const VerifyImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.small};
  margin-top: ${spacing.small};
  @media (max-width: 480px) {
    flex-direction: column;
  } ;
`;

export const ActionBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 576px) {
    width: 40%;
  }
`;

export const ImageComparisonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 700px;
  @media (max-width: 768px) {
    width: 600px;
  }
  @media (max-width: 576px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    width: 300px;
  } ;
`;
