import styled from "styled-components";
import { colors, spacing, borderRadius } from "../../utils";

interface StyleProps {
  height?: string | number;
  width?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
  cursor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  background-color: transparent;
  cursor: zoom-in;

  @media (max-width: 576px) {
    margin-bottom: ${spacing.small};
  }
`;

export const Image = styled.img`
  align-self: flex-start;
  cursor: zoom-in;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : "transparent"};
  height: ${(p: StyleProps) => (p.height ? p.height : "140px")};
  width: ${(p: StyleProps) => (p.width ? p.width : "220px")};

  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
  margin-bottom: 5px;
`;
