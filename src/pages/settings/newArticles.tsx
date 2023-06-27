import { useState } from 'react';
import { AppContainer, NewArticle, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';

const { SETTINGS } = routesPath;

function NewArticles() {
  const navigate = useNavigate();
  const [formvalues, setFormvalues] = useState();
  // console.log(formvalues);

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="ARTICLES | NEW ARTICLES ">
      <NewAppContainer>
        <NewArticle setFormvalues={setFormvalues} />
      </NewAppContainer>
    </AppContainer>
  );
}

export default NewArticles;
