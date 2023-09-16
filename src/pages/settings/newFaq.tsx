import { useState } from 'react';
import { AppContainer, NewArticle, NewFaqAtom, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { H5 } from '../../styles';

const { SETTINGS } = routesPath;

function NewFaq() {
  const navigate = useNavigate();
  const [formvalues, setFormvalues] = useState();
  console.log(formvalues);

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="FAQ'S | NEW FAQ">
      <NewAppContainer>
        <NewFaqAtom setFormvalues={setFormvalues} />
      </NewAppContainer>
    </AppContainer>
  );
}

export default NewFaq;
