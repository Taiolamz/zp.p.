import styled from 'styled-components';
import { colors, spacing, boxShadow, borderRadius } from '../../utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px ${spacing.medium} ${spacing.xlarge} ${spacing.medium};
  @media (max-width: 700px) {
    width: 80vw;
  }
  @media (max-width: 576px) {
    width: 80vw;
  }
  @media (max-width: 480px) {
    width: 80vw;
  }
`;

export const Content = styled.div`
  max-height: 80vh;
  width: 100%;
`;

export const CardContainer = styled.div`
  margin-bottom: ${spacing.small};
  box-shadow: ${boxShadow.light};
  border-radius: ${borderRadius.medium};
  border: 1px solid ${colors.greyVariantTwo};
  padding: ${spacing.small};
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-top: ${spacing.large};
`;
