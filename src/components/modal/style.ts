import styled from "styled-components";
import { colors, spacing, borderRadius, boxShadow } from "../../utils";

interface StyleProps {
  height?: string | number;
  backgroundColor?: string;
  borderRadius?: string | number;
  cursor?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : colors.white};
  border: 0px solid transparent;
  padding: ${spacing.xxsmall};
  border-radius: ${(p: StyleProps) =>
    p.borderRadius ? p.borderRadius : borderRadius.medium};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.small};
`;

export const ContentOne = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
export const ContentTwo = styled.div`
  width: 100%;
`;
export const ContentThree = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const CloseContainer = styled.div`
  display: flex;
  align-self: flex-start;
  width: 20px;
  padding: 2px;
  background-color: ${colors.primary};
  box-shadow: ${boxShadow.light};
  border-radius: ${borderRadius.small};
  cursor: pointer;
`;
