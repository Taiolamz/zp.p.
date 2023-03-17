import styled from "styled-components";
import { colors, boxShadow, spacing, borderRadius } from "../../utils";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justfy-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: ${boxShadow.light};
  padding: 0px ${spacing.xxsmall};
  border-radius: ${borderRadius.small};
  border: 1px solid ${colors.white};
  cursor: pointer;
`;
