import styled from "styled-components";
import { colors, spacing } from "../../utils";

interface StyleProps {
  backgroundColor?: string;
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 0.5em;
  align-self: flex-start;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : "transparent"};
  padding: ${spacing.small};
  column-gap: 3.125em;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const Tab = styled.h2`
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
