import { useState } from 'react';
import { AppContainer, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { H1 } from '../../styles';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';

const { SETTINGS } = routesPath;

function EmailNotificationUpdate() {
  const navigate = useNavigate();
  const [formvalues, setFormvalues] = useState();

  return (
    <AppContainer
      goBack={() => navigate(SETTINGS)}
      navTitle={`App Contents`}
      navHelper={`EMAIL NOTIFICATION | VIEW EMAIL NOTIFICATION`}>
      <NewAppContainer>
        <NewNotification radioData={notificationRecipents} setFormvalues={setFormvalues} type="update" />
      </NewAppContainer>
    </AppContainer>
  );
}

export default EmailNotificationUpdate;
