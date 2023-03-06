import styled from "styled-components";
import { colors, boxShadow, spacing, borderRadius } from "../../../utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-align-items: center;
  background-color: ${colors.white};
  box-shadow: ${boxShadow.light};
  margin: ${spacing.xsmall} ${spacing.xsmall};
  padding: ${spacing.medium} ${spacing.xsmall} ${spacing.xsmall}
    ${spacing.xsmall};
  border-radius: ${borderRadius.medium};
  position: relative;
`;

export const InfluncerText = styled.div`
  padding: ${spacing.xsmall} 0px;
`;

export const Image = styled.img`
  position: absolute;
  top: -30px;
  z-index: 1;
  width: 60px;
  height: 60px;
  border-radius: ${borderRadius.large};
`;
