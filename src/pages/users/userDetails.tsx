import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerProfile } from '../../components';
import {
  AppContainer,
  UserSupportActivity,
  DocumentStatusModal,
  LoginHistoryModal,
} from '../../atoms';
import {
  appActivity,
  customerDetails,
  docStatus,
  documentStatusDataHeader,
  loginHistory,
  loginHistory2,
  // loginHistoryDataHeader,
  loginHistoryDataHeader1,
  loginHistoryDataHeader2,
  supportActivitiesData,
} from './data';

import { colors, routesPath } from '../../utils';
import {
  UsersDetailContainer,
  UserProfileContainer,
  SupportContainer,
} from './style';
import { H2 } from '../../styles';

const { USERS } = routesPath;

function UserDetails() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedUserActivity, setSelectedUserActivity] = useState<any>({});
  const [modal, setModal] = useState<any>();

  useEffect(() => {
    if (
      selectedUserActivity.hasOwnProperty('id') &&
      selectedUserActivity.id === 1
    ) {
      console.log('document status');
      setModal(
        <DocumentStatusModal
          actionClick={() => {}}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          title='Document Status'
          data={docStatus}
          headerData={documentStatusDataHeader}
        />
      );
    }

    if (
      selectedUserActivity.hasOwnProperty('id') &&
      selectedUserActivity.id === 2
    ) {
      console.log('transaction history');
    }
    if (
      selectedUserActivity.hasOwnProperty('id') &&
      selectedUserActivity.id === 3
    ) {
      console.log('upload doc');
    }
    if (
      selectedUserActivity.hasOwnProperty('id') &&
      selectedUserActivity.id === 4
    ) {
      console.log('document history');
    }
    if (
      selectedUserActivity.hasOwnProperty('id') &&
      selectedUserActivity.id === 5
    ) {
      console.log('saved banks');
    }
    if (
      selectedUserActivity.hasOwnProperty('id') &&
      selectedUserActivity.id === 6
    ) {
      setModal(
        <LoginHistoryModal
          actionClick={() => {}}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          title='Login History'
          data={loginHistory}
          data2={loginHistory2}
          headerData1={loginHistoryDataHeader1}
          headerData2={loginHistoryDataHeader2}
        />
      );
    }
  }, [selectedUserActivity, isModalVisible]);
  return (
    <AppContainer
      goBack={() => navigate(USERS)}
      navTitle={`Back`}
      navHelper='Profile Review'
    >
      <div>
        <UsersDetailContainer>
          <UserProfileContainer>
            <CustomerProfile
              data={customerDetails}
              title='Customer`s Details
'
            />

            <CustomerProfile
              data={appActivity}
              title='App Activity
'
            />
          </UserProfileContainer>

          <SupportContainer>
            <H2 left bold color={colors.greyVariantThree}>
              Support Functions
            </H2>
            <UserSupportActivity
              data={supportActivitiesData}
              setSelectedItem={setSelectedUserActivity}
              openModal={setIsModalVisible}
            />
          </SupportContainer>
        </UsersDetailContainer>
        {modal}
      </div>
    </AppContainer>
  );
}

export default UserDetails;
