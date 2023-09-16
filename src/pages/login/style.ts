import styled from "styled-components";
import { colors, spacing } from "../../utils";
export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:linear-gradient(45deg, rgba(253, 97, 6, 0.8), rgba(253, 97, 6, 0) 40.71%), linear-gradient(135deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.52%), linear-gradient(200deg, rgba(0, 40, 135, 0.8) , rgba(0, 40, 135, 0) 70.52%), linear-gradient(310.7deg, rgba(73, 199, 0, 0.8) , rgba(73, 199, 0, 0) 70.52%);
`;

export const ContainerContent = styled.div` 
 background: linear-gradient(137.43deg, rgba(255, 255, 255, 0.5) 3.89%, rgba(255, 255, 255, 0.2) 100%);
 border: 1px solid #FFFFFF;
 backdrop-filter: blur(10px);
 border-radius: 15px;
 padding:${spacing.xsmall} ${spacing.xsmall}};
 width: 400px;
 margin:0 auto;
 @media (max-width: 576px) {
  width: 90%;
 }
`;

export const Content = styled.div` 
 background: ${colors.white};
 border: 1px solid #FFFFFF;
 border-radius: 15px;
 padding:${spacing.large} ${spacing.medium}};
 margin:0 auto;
`;

export const SwitchCard = styled.div` 
 margin:${spacing.medium} 0;
`;