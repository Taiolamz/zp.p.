import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../../utils";

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: ${spacing.small} ${spacing.small};
  border-radius: ${borderRadius.small};
  background-color: ${colors.white};
  margin-bottom: ${spacing.xsmall};
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;

export const H1TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MainTextContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
export const ViewContentContainer = styled.div`
  width: 20%;
`;

export const ViewContent = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.primary};
  cursor: pointer;
  @media (max-width: 768px) {
    // padding: ${spacing.xsmall};
  }
`;
