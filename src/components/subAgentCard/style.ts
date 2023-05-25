import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../utils';

interface StyleProps {
  backgroundColor?: string;
}
export const SubAgentCardContainer = styled.div`
  position: relative;
  background-color: ${colors.greyVariantTwo};
  border-radius: ${borderRadius.small};
  padding: ${spacing.small_2};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
export const Avatar = styled.div`
  background-color: ${colors.smokeWhite};
  border-radius: ${spacing.medium};
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${spacing.xsmall};
`;
export const NameDateContainer = styled.div`
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
export const ActiveContainer = styled.div`
  padding: ${spacing.xsmall};
  border-radius: 4px;
  background-color: ${(p: StyleProps) => p.backgroundColor};
  position: absolute;
  top: 0;
  right: 16px;
`;
