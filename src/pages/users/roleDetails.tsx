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
} from '../../utils';
import { UsersDetailContainer, UserProfileContainer, SupportContainer } from './style';
import { H2 } from '../../styles';

import { getUserProfileRequest, getUserProfileReset } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { Dictionary } from '../../types';

const { USERS } = routesPath;

function RoleDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const userId = id?.trim();

  return (
    <AppContainer goBack={() => navigate(USERS)} navTitle={`USER CONTROL USERS`} navHelper="ROLE DETAILS">
      <div>
        <H2>ROLE DETAILS</H2>
        <H2>ROLE DETAILS</H2>
        <H2>ROLE DETAILS</H2>
        <H2>ROLE DETAILS</H2>
        <H2>ROLE DETAILS</H2>
      </div>
    </AppContainer>
  );
}

export default RoleDetails;
