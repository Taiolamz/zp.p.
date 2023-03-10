import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../../utils";

interface StyleProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) =>
    p.isSelected ? colors.purpleVariantTwo : colors.white};
  box-shadow: ${boxShadow.light};
  padding: ${spacing.small};

  @media (max-width: 768px) {
    height: 70px;
    padding: ${spacing.xsmall};
  }
`;
