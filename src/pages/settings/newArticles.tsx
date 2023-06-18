import { useState } from 'react';
import { AppContainer, NewArticle, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';

const { SETTINGS } = routesPath;

function NewArticles() {
  const navigate = useNavigate();

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="New Article">
      <NewAppContainer>
        <NewArticle radioData={notificationRecipents} />
      </NewAppContainer>
    </AppContainer>
  );
}

export default NewArticles;
