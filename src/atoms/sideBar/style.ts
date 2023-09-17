import styled from 'styled-components';
import { colors, spacing } from '../../utils';

interface StyleProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  background-color: ${colors.white};
  height: 95%;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: ${spacing.medium};
  display: flex;
  flex-direction: column;
  z-index: 999;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  height: 100%;
  padding-bottom: ${spacing.small};
  position: relative;
`;

export const BottomTabContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    bottom: 0;
    position: fixed;
    display: block;
    background-color: ${colors.smokeWhite};
    width: 100%;
    z-index: 999;
  }
`;

export const BottomTabContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TabNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // justify-content: space-between;
`;

export const TabNavIcon = styled.div`
  color: ${(p: StyleProps) => (p.isSelected ? colors.primary : colors.grey)};
`;

export const ImgContainer = styled.div`
  width: 130px;
  height: 59px;
  margin-bottom: ${spacing.small};
  margin-left: auto;
  margin-right: auto;
`;

export const HamburgerContainer = styled.div`
  position: absolute;
  justify-content: flex-end;
  right: ${spacing.small_2};
  top: -${spacing.small_2};
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  display: block;
`;
