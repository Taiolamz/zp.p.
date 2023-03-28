import styled from "styled-components";
import { spacing, colors } from "../../utils";

export const Container = styled.div`
  backdround-color: transparent;
`;

export const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${spacing.medium};
`;

export const TopContentItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.small};
`;

export const BottomContentMainText = styled.div`
  align-self: flex-start;
  width: 75%;
`;

export const BottomContentHelperText = styled.div`
  align-self: flex-start;
  width: 20%;
`;
