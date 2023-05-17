import styled from "styled-components";
import { colors, boxShadow, spacing } from "../../utils";

interface StyleProps {
  helper?: string;
}

export const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  box-shadow: ${boxShadow.light};
  width: 100%;
  padding: ${spacing.xxsmall} ${spacing.small} ${spacing.xxsmall}
    ${spacing.small};
  z-index: 1;
`;

export const Content = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
`;

export const Divider = styled.div`
  height: 30px;
  width: 1.8px;
  margin: 0px ${spacing.xsmall};
  background-color: ${colors.primary};
`;

export const ImgContent = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: contain;
`;

export const BackBtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
