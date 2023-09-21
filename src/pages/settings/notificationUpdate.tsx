import { useEffect, useState } from 'react';
import { ActivityActionModal, AppContainer, LoaderModal, NewNotification } from '../../atoms';
import { images, routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { useParams, useLocation } from 'react-router-dom';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { Dictionary } from '../../types';
import { dateTimeFormat2 } from '../../utils/dateFormat';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { getNotificationByIdRequest, updateNotificationRequest, updateNotificationReset } from '../../redux/slice';

const { SETTINGS } = routesPath;

export interface IPropsInitialValues {
  title: string;
  message: string;
  delivery_date: string;
  delivery_time: string;
  status: string;
  image: string;
  interval: string;
  delivery_meridiem: string;
  type: string;
}

export interface IProps {
  onSubmit: (item: Dictionary) => any;
  initialValues?: IPropsInitialValues;
  requestStatus?: string;
}

function NotificationUpdate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [notificationDataList, setNotificationDataList] = useState<IPropsInitialValues>();
  const [notificationSuccessIsModalVisible, setNotificationSuccessIsModalVisible] = useState(false);

  const updateNotificationState = useAppSelector(state => state.updateNotification);
  const { status: updateNotificationStatus } = updateNotificationState;

  const getNotificationByIdState = useAppSelector(state => state.getNotificationById);
  const { status: getNotificationByIdStatus, data: getNotificationData } = getNotificationByIdState;

  useEffect(() => {
    dispatch(getNotificationByIdRequest({ notificationId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (getNotificationByIdStatus === 'succeeded' && getNotificationData?.notification) {
      const { title, message, status, image_url, delivery_date, delivery_time, delivery_meridiem, type } =
        getNotificationData.notification;
      const updatedList: IPropsInitialValues = {
        title,
        message,
        status,
        image: image_url,
        delivery_date,
        delivery_time,
        interval: '',
        delivery_meridiem: delivery_meridiem,
        type: type,
      };
      setNotificationDataList(updatedList);
    }
  }, [getNotificationByIdStatus, getNotificationData.notification]);

  // GET PATH
  const location = useLocation();
  const [pathName, setPathName] = useState(null);

  useEffect(() => {
    if (location) {
      let tmp: any = location.pathname.split('/')[2];
      setPathName(tmp);
    }
  }, [location]);

  const handleUpdateNotificationBtn = (item: Dictionary) => {
    const { message, title, interval, delivery_date, delivery_time, recipients, spreadsheet } = item;

    const type = pathName === 'appnotification' ? 'in app notification' : 'email notification';

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
    formData.append('_method', 'PATCH');

    dispatch(updateNotificationRequest({ formData, id }));
  };

  const handleNotificationSuccessClose = () => {
    setNotificationSuccessIsModalVisible(false);
    navigate(SETTINGS);
  };

  useEffect(() => {
    if (updateNotificationStatus === 'succeeded') {
      setNotificationSuccessIsModalVisible(true);
      dispatch(updateNotificationReset());
    }
  }, [updateNotificationStatus, dispatch]);

  return (
    <div>
      <AppContainer
        goBack={() => navigate(SETTINGS)}
        navTitle={`App Contents`}
        navHelper={`EMAIL NOTIFICATION | VIEW EMAIL NOTIFICATION`}>
        <NewAppContainer>
          <NewNotification
            radioData={notificationRecipents}
            initialValues={notificationDataList}
            requestStatus={updateNotificationStatus}
            onSubmit={(item: Dictionary) => handleUpdateNotificationBtn(item)}
            type="update"
          />
        </NewAppContainer>
      </AppContainer>
      <LoaderModal
        isModalVisible={getNotificationByIdStatus === 'loading'}
        text="Loading please wait..."
        closeModal={() => {}}
      />
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
  );
}

export default NotificationUpdate;
