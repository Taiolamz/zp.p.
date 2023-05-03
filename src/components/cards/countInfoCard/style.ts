import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../../utils";

interface StyleProps {
  isSelected?: boolean;
  background?: string;
  shadow?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) =>
    p.isSelected ? colors.purpleVariantTwo : p.background};
  box-shadow: ${(p: StyleProps) => p.shadow};
  height: 100%;
  padding: ${spacing.small} ${spacing.small};
  @media (max-width: 768px) {
    padding: ${spacing.xsmall};
  }
`;
