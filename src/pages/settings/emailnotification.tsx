import { useState } from 'react';
import { AppContainer, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { H1 } from '../../styles';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';

const { SETTINGS } = routesPath;

function EmailNotification() {
  const navigate = useNavigate();

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="New Email Notification">
      <NewAppContainer>
        <NewNotification radioData={notificationRecipents} />
      </NewAppContainer>
    </AppContainer>
  );
}

export default EmailNotification;
