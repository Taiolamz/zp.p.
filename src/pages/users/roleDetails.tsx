import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContainer, LoaderModal } from '../../atoms';

import {
  colors,
  routesPath,
  dateFormat,
  capitalizeFirstLetter,
  timeFormat,
  images,
  determineVericationDocState,
  spacing,
} from '../../utils';
import {
  RoleDetailsPermissionContainer,
  RoleDetailsPermissionContentOne,
  RoleDetailsPermissionContentTwo,
  RoleDetailsAccess,
  RoleDetailsUpdateContainer,
  RoleDetailsAllUsersContainer,
  RoleDetailsNameContainer,
  RoleDetailsHorizontalLine,
} from './style';
import { H2, H3 } from '../../styles';

import { getUserProfileRequest, getUserProfileReset } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { Dictionary } from '../../types';
import { Switch, BorderedText, Picker } from '../../components';
const { USERS } = routesPath;

function RoleDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const userId = id?.trim();

  const [toggleAllPermissions, setToggleAllPermissions] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('');

  return (
    <AppContainer goBack={() => navigate(USERS)} navTitle={`USER CONTROL USERS`} navHelper="ROLE DETAILS">
      <div>
        <H2 left semiBold style={{ marginTop: spacing.small, marginBottom: spacing.small }}>
          Role Details
        </H2>
        <RoleDetailsNameContainer>
          <H3 style={{ marginRight: spacing.small }}>Role Name</H3>
          <BorderedText
            color={colors.primary}
            text="Executive Access"
            backgroundColor="transparent"
            borderColor={colors.primary}
          />
        </RoleDetailsNameContainer>
        <RoleDetailsHorizontalLine />

        <H3 left semiBold style={{ marginBottom: spacing.small }}>
          Permissions
        </H3>

        <RoleDetailsPermissionContainer>
          <RoleDetailsPermissionContentOne>
            <Switch
              borderRadius={false}
              backgroundColor={'transparent'}
              borderColor={'transparent'}
              custom
              onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
              checked={toggleAllPermissions}
              label="Toggle All"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
              checked={toggleAllPermissions}
              label="Dashboard"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
              checked={toggleAllPermissions}
              label="KYC"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
              checked={toggleAllPermissions}
              label="Settlements"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={'white'}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
              checked={toggleAllPermissions}
              label="User Control"
              marginBottom={spacing.xxsmall}
            />
            <Switch
              borderRadius={true}
              backgroundColor={colors.purpleVariantThree}
              borderColor={colors.greyVariantSix}
              custom
              onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
              checked={toggleAllPermissions}
              label="App Contents"
              marginBottom={spacing.xxsmall}
              labelColor={colors.white}
            />

            <RoleDetailsUpdateContainer>
              <BorderedText color={colors.white} text="Update Role" backgroundColor={colors.primary} />
              <BorderedText color={colors.greyDark} text="Cancel" backgroundColor="transparent" />
            </RoleDetailsUpdateContainer>
          </RoleDetailsPermissionContentOne>

          <RoleDetailsPermissionContentTwo>
            <RoleDetailsAllUsersContainer>
              <Picker
                label=" "
                selectedValue={setSelectedUserType}
                placeholder="All Users"
                options={[
                  { label: 'All Users', value: 'all-users' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]}
              />

              <Switch
                borderRadius={false}
                backgroundColor={'transparent'}
                borderColor={'transparent'}
                custom
                onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
                checked={toggleAllPermissions}
                label="Toggle All"
                marginBottom={spacing.xxsmall}
                labelRightSpace
              />
            </RoleDetailsAllUsersContainer>

            <RoleDetailsAccess>
              <Switch
                borderRadius={true}
                paddingVertical={spacing.xsmall}
                backgroundColor={colors.greyVariantTwo}
                borderColor={colors.greyVariantTwo}
                paddingLeft={spacing.small}
                paddingRight={spacing.medium}
                custom
                onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
                checked={toggleAllPermissions}
                label="Access Right"
                labelTwo={'Status'}
              />
              <Switch
                borderRadius={false}
                paddingVertical={spacing.xsmall}
                backgroundColor={'white'}
                borderColor={colors.greyVariantTwo}
                paddingLeft={spacing.small}
                paddingRight={spacing.medium}
                custom
                onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
                checked={toggleAllPermissions}
                label="Can View this tab"
              />
              <Switch
                borderRadius={false}
                paddingVertical={spacing.xsmall}
                backgroundColor={'white'}
                borderColor={colors.greyVariantTwo}
                paddingLeft={spacing.small}
                paddingRight={spacing.medium}
                custom
                onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
                checked={toggleAllPermissions}
                label="Can Add New Article"
              />
              <Switch
                borderRadius={false}
                paddingVertical={spacing.xsmall}
                backgroundColor={'white'}
                borderColor={colors.greyVariantTwo}
                paddingLeft={spacing.small}
                paddingRight={spacing.medium}
                custom
                onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
                checked={toggleAllPermissions}
                label="Can Edit Article Details"
              />
              <Switch
                borderRadius={true}
                paddingVertical={spacing.xsmall}
                backgroundColor={'white'}
                borderColor={colors.greyVariantTwo}
                paddingLeft={spacing.small}
                paddingRight={spacing.medium}
                custom
                onChange={() => setToggleAllPermissions(!toggleAllPermissions)}
                checked={toggleAllPermissions}
                label="Remember me"
              />
            </RoleDetailsAccess>
          </RoleDetailsPermissionContentTwo>
        </RoleDetailsPermissionContainer>
      </div>
    </AppContainer>
  );
}

export default RoleDetails;
