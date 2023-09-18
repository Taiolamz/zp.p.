import { useState } from 'react';
import { AppContainer, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { H1 } from '../../styles';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { Dictionary } from '../../types';

const { SETTINGS } = routesPath;

function NewAppNotification() {
  const navigate = useNavigate();

  const [formvalues, setFormvalues] = useState();
  // console.log(formvalues);
  return (
    <AppContainer
      goBack={() => navigate(SETTINGS)}
      navTitle={`App Contents`}
      navHelper="In-App Notification | New App Notification ">
      <NewAppContainer>
        {/* <NewNotification
        // radioData={notificationRecipents}
        requestStatus={createNotificationStatus}
          onSubmit={(item: Dictionary) => handleCreateNotificationBtn(item)}
        /> */}
      </NewAppContainer>
    </AppContainer>
  );
}

export default NewAppNotification;
