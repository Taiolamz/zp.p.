import styled from "styled-components";
import { borderRadius, colors, spacing } from "../../utils";

interface StyleProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  padding: ${spacing.small} ${spacing.small};
  border-radius: ${borderRadius.medium};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BorderedTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 40%;
  row-gap: ${spacing.xsmall};
  @media (max-width: 768px) {
    margin: ${spacing.xsmall} 0px;
    width: 100%;
  }
`;
