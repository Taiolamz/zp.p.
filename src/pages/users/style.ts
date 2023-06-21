import styled from 'styled-components';
import { spacing, colors } from '../../utils';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  @media (max-width: 768px) {
    grid-template-columns: 100% 100%;
  }
`;

export const UserContainer = styled.div`
  padding-top: ${spacing.small};
  @media (max-width: 768px) {
    /* grid-template-columns: 100% 100%; */
  }
`;

export const UsersDetailContainer = styled.div`
  padding-top: ${spacing.small};
  display: grid;
  grid-template-columns: auto 14.75rem;
  column-gap: ${spacing.medium};
  align-items: start;
  padding-bottom: ${spacing.medium};
  @media (max-width: 1067px) {
    grid-template-columns: 100%;
    row-gap: ${spacing.small};
  }
`;

export const UserProfileContainer = styled.div`
  display: grid;
  row-gap: ${spacing.large};
`;

export const UsersContainer = styled.div`
  margin-top: ${spacing.small};
  @media (max-width: 768px) {
    /* grid-template-columns: 100% 100%; */
  }
`;

export const SearchContainer = styled.div`
  // max-width: 16.313em;
  max-width: 20.313em;
  margin-bottom: ${spacing.large};
  margin-top: ${spacing.large};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TableContainer = styled.div`
  margin-bottom: ${spacing.small};
`;

export const SupportContainer = styled.div`
  display: grid;
  margin-top: ${spacing.small};
  row-gap: ${spacing.small};
`;

export const InternalUsersContainer = styled.div`
  margin-top: ${spacing.xlarge};
`;

export const InternalUserTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.large};
`;

// ROLE DETAILS STYLES
export const RoleDetailsPermissionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: ${spacing.xlarge};
`;

export const RoleDetailsPermissionContentOne = styled.div`
  flex-grow: 2;
`;

export const RoleDetailsUpdateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: ${spacing.xlarge};
`;

export const RoleDetailsPermissionContentTwo = styled.div`
  flex-grow: 6;
`;

export const RoleDetailsAccess = styled.div`
  background-color: ${colors.white};
`;

export const RoleDetailsAllUsersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RoleDetailsNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RoleDetailsHorizontalLine = styled.div`
  height: 2px;
  background-color: ${colors.greyVariantTwo};
  margin-top: ${spacing.medium};
  margin-bottom: ${spacing.medium};
`;
