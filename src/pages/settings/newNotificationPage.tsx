import { useEffect, useState } from 'react';
import { ActivityActionModal, AppContainer, NewNotification } from '../../atoms';
import { images, routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { Dictionary } from '../../types';
import { createNotificationRequest, createNotificationReset } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { dateTimeFormat2 } from '../../utils/dateFormat';

const { SETTINGS } = routesPath;

function NewNotificationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // GET PATH
  const location = useLocation();
  const [pathName, setPathName] = useState(null);

  useEffect(() => {
    if (location) {
      let tmp: any = location.pathname.slice(location.pathname.lastIndexOf('/'), location.pathname.length);
      setPathName(tmp);
    }
  }, [location]);

  const createNotificationState = useAppSelector(state => state.createNotification);

  const { status: createNotificationStatus } = createNotificationState;

  const [notificationSuccessIsModalVisible, setNotificationSuccessIsModalVisible] = useState(false);

  const handleCreateNotificationBtn = (item: Dictionary) => {
    const { message, title, interval, delivery_date, delivery_time, recipients, spreadsheet } = item;

    const type = pathName === '/emailnotification' ? 'email notification' : 'in app notification';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('interval', interval);
    formData.append('delivery_date', dateTimeFormat2(delivery_date));
    formData.append('delivery_time', delivery_time);
    formData.append('delivery_meridiem', 'am');
    formData.append('type', type);
    formData.append('recipients', recipients);
    formData.append('status', 'active');
    formData.append('spreadsheet', spreadsheet);

    dispatch(createNotificationRequest(formData));
  };

  const handleNotificationSuccessClose = () => {
    setNotificationSuccessIsModalVisible(false);
    navigate(SETTINGS);
  };

  useEffect(() => {
    if (createNotificationStatus === 'succeeded') {
      setNotificationSuccessIsModalVisible(true);
      dispatch(createNotificationReset());
    }
  }, [createNotificationStatus, dispatch]);

  const navHelper =
    pathName === '/emailnotification'
      ? 'EMAIL NOTIFICATION | NEW EMAIL NOTIFICATION'
      : 'IN-APP NOTIFICATION | NEW APP NOTIFICATION';

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper={navHelper}>
      <div>
        <NewAppContainer>
          <NewNotification
            radioData={notificationRecipents}
            requestStatus={createNotificationStatus}
            onSubmit={(item: Dictionary) => handleCreateNotificationBtn(item)}
          />
        </NewAppContainer>

        <ActivityActionModal
          isModalVisible={notificationSuccessIsModalVisible}
          closeModal={handleNotificationSuccessClose}
          actionClick={handleNotificationSuccessClose}
          image={images.check}
          isLoading={false}
          actionText="Close"
          title=""
          text={'Article has been successfuly created'}
        />
      </div>
    </AppContainer>
  );
}

export default NewNotificationPage;
