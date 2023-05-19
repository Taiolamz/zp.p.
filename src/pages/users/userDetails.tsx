import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CustomerProfile } from '../../components';
import {
  AppContainer,
  UserSupportActivity,
  DocumentStatusModal,
  LoginHistoryModal,
  LoaderModal,
  SavedBanksModal,
} from '../../atoms';
import {
  documentStatusDataHeader,
  loginHistoryDataHeader1,
  loginHistoryDataHeader2,
  supportActivitiesData,
  namedDocumentStatus,
  namedTransactionHistory,
  namedSavedBanks,
  namedLoginHistory,
  namedDocumentHistory,
  namedReactivateProfile,
  namedDeactivateProfile,
  namedViewSubAgents,
} from './data';

import { colors, routesPath, dateFormat, capitalizeFirstLetter, timeFormat } from '../../utils';
import { UsersDetailContainer, UserProfileContainer, SupportContainer } from './style';
import { H2 } from '../../styles';

import {
  getUserProfileRequest,
  getUserProfileReset,
  getUserVerificationsRequest,
  getUserVerificationsReset,
  getProfileViewHistoryRequest,
  getProfileViewHistoryReset,
  getLoginHistoryRequest,
  getLoginHistoryReset,
} from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { CustomerProfileIProps } from '../../components/customerProfile';
import { DocumentStatusIProps } from '../../atoms/documentStatusModal';
import { LoginHistoryIProps } from '../../components/tables/loginHistoryTable';
import { Dictionary } from '../../types';

const { USERS } = routesPath;

const kycVerificationbvn: string = 'bvn-selfie-verification';
const kycVerificationidentityCard: string = 'identity-card-verification';
const kycVerificationCACDocumentVerification: string = 'cac document verification';
const kycVerificationBusinessAddressVerification: string = 'business address verification';

function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const userId = id?.trim();

  const [documentIsModalVisible, setDocumentIsModalVisible] = useState(false);
  const [loginHistoryIsModalVisible, setLoginHistoryIsModalVisible] = useState(false);
  const [selectedUserActivity, setSelectedUserActivity] = useState<Dictionary>({});
  const [customerDetails, setCustomerDetails] = useState<CustomerProfileIProps[]>([]);
  const [appActivity, setAppActivity] = useState<CustomerProfileIProps[]>([]);
  const [kycLevel, setKycLevel] = useState('');
  const [docStatus, setDocStatus] = useState<DocumentStatusIProps[]>([]);
  const [loginHistoryData, setLoginHistoryData] = useState<any[]>([]);
  const [profileViewData, setProfileViewData] = useState<LoginHistoryIProps[]>([]);
  const [savedBankIsModalVisible, setSavedBankIsModalVisible] = useState(false);
  // redux state
  const userProfileState = useAppSelector(state => state.getUserProfile);
  const { status: userProfileStatus } = userProfileState;

  const userVerificationsState = useAppSelector(state => state.getUserVerifications);
  const { status: userVerificationsStatus } = userVerificationsState;

  const profileViewHistoryState = useAppSelector(state => state.getProfileViewHistory);
  const { status: profileViewHistoryStatus } = profileViewHistoryState;

  const loginHistoryState = useAppSelector(state => state.getLoginHistory);
  const { status: loginHistoryStatus } = loginHistoryState;

  const detmineKycLevel = (verifications: any[]) => {
    let result =
      verifications?.length === 0
        ? 'Level 0'
        : verifications?.length === 1
        ? 'Level 1'
        : verifications?.length === 2
        ? 'Level 2'
        : 'Level 3';
    return result;
  };

  // api

  useEffect(() => {
    dispatch(
      getUserProfileRequest({
        userId,
      }),
    );
  }, []);

  useEffect(() => {
    if (userProfileStatus === 'succeeded') {
      const {
        data: { user },
      } = userProfileState;
      let customerDetailsResult: CustomerProfileIProps[];
      let appActivityResult: CustomerProfileIProps[];
      customerDetailsResult = [
        {
          id: 1,
          helper: 'Full Name',
          text: user?.name,
        },
        {
          id: 2,
          helper: 'Email',
          text: user?.email,
        },
        {
          id: 3,
          helper: 'Phone Number',
          text: user?.telephone,
        },
        {
          id: 4,
          helper: 'BVN',
          text: user?.kyc?.bvn_number === null ? 'N/A' : user?.kyc?.bvn_number,
        },
        {
          id: 5,
          text: user?.hasOwnProperty('dob') ? dateFormat(user?.dob) : 'N/A',
          helper: 'Date of birth',
        },
        {
          id: 6,
          helper: 'Profile Level',
          text: detmineKycLevel(user?.verifications),
        },
        {
          id: 7,
          helper: 'Address Verification Status',
          text: user?.kyc?.business_registration_number === null ? 'Unverified' : 'Verified',
        },
        {
          id: 8,
          helper: 'Residential Address',
          text: user?.location === null ? 'N/A' : user?.location,
        },
        {
          id: 9,
          helper: 'Account Number',
          text: user?.account?.number === null ? 'N/A' : user?.account?.number,
        },
        {
          id: 10,
          helper: 'Bank Name',
          text: user?.account?.bank_name === null ? 'N/A' : user?.account?.bank_name,
        },
      ];
      appActivityResult = [
        {
          id: 1,
          helper: 'Onboarding Date',
          text: dateFormat(user?.created_at),
        },
        {
          id: 2,
          helper: 'Last Login',
          text: user?.last_login === null ? 'N/A' : dateFormat(user?.last_login),
        },
        {
          id: 3,
          helper: 'Last Device Login',
          text: user?.device_detail,
        },
        {
          id: 4,
          helper: 'Profile Status',
          text: user?.status === 'active' ? 'Active' : 'Deactivated',
        },
        {
          id: 5,
          helper: 'Deactivation Comment',
          text: user?.comment === null ? 'N/A' : user?.comment,
        },
      ];
      setKycLevel(detmineKycLevel(user?.verifications));
      setCustomerDetails(customerDetailsResult);
      setAppActivity(appActivityResult);
    }
  }, [userProfileState]);

  function determineDocStatus(verificationType: string, kycLevel: string, item: Dictionary) {
    let result = verificationType === kycLevel ? capitalizeFirstLetter(item?.status) : 'Pending';
    // console.log(result, 'results');
    return result;
  }

  useEffect(() => {
    let result: DocumentStatusIProps[] = [];
    let verificationData: Dictionary = {};
    if (userVerificationsStatus === 'succeeded') {
      console.log(userVerificationsState?.data, 'dataff');
      userVerificationsState?.data?.Verifications?.forEach((el: Dictionary) => {
        verificationData = {
          photoStatus: determineDocStatus(el.verification_type, kycVerificationbvn, el),
          idCardStatus: determineDocStatus(el.verification_type, kycVerificationidentityCard, el),
          addressVefication: determineDocStatus(el.verification_type, kycVerificationCACDocumentVerification, el),
        };
      });

      // console.log(verificationData, 'aa');

      // console.log(verificationData, 'verificationData');

      result = [
        {
          id: 1,
          document: 'Passport',
          noOfUpload: verificationData?.photoStatus === 'Pending' ? 0 : 2,
          status: verificationData?.photoStatus,
          statusBG:
            verificationData?.photoStatus === 'Approved'
              ? colors.green
              : verificationData?.photoStatus === 'Rejected'
              ? colors.red
              : colors.greyDark,
        },
        {
          id: 2,
          document: 'ID Card',
          noOfUpload: verificationData?.idCardStatus === 'Pending' ? 0 : 1,
          status: verificationData?.idCardStatus,
          statusBG:
            verificationData?.idCardStatus === 'Approved'
              ? colors.green
              : verificationData?.idCardStatus === 'Rejected'
              ? colors.red
              : colors.greyDark,
        },
        {
          id: 3,
          document: 'Address Verification',
          noOfUpload: verificationData?.addressVefication === 'Pending' ? 0 : 1,
          status: verificationData?.addressVefication,
          statusBG:
            verificationData?.addressVefication === 'Approved'
              ? colors.green
              : verificationData?.addressVefication === 'Rejected'
              ? colors.red
              : colors.greyDark,
        },
      ];
    }
    setDocStatus(result);
  }, [userVerificationsState]);

  useEffect(() => {
    let resultProfile: any[] = [];

    if (profileViewHistoryStatus === 'succeeded') {
      profileViewHistoryState?.data?.profile_view?.data?.forEach((el: Dictionary, index: number) => {
        resultProfile.push({
          id: index + 1,
          time: `${dateFormat(el?.updated_at)} - ${timeFormat(el?.updated_at)}`,
          staffName: el?.admin_name,
          machineName: el?.device?.userAgent,
        });
      });

      setProfileViewData(resultProfile);
    }
  }, [profileViewHistoryState]);

  useEffect(() => {
    let resultLoginHistory: any[] = [];
    if (loginHistoryStatus === 'succeeded') {
      const {
        data: { user },
      } = userProfileState;

      loginHistoryState?.data?.users?.data?.forEach((el: Dictionary, index: number) => {
        resultLoginHistory.push({
          id: index + 1,
          time: `${dateFormat(el?.login_at)} - ${timeFormat(el?.login_at)}`,
          device: el?.device_detail === null ? 'N/A' : el?.device_detail,
          location: user?.location === null ? 'N/A' : user?.location,
          ipAddress: el?.data?.userAgent === null ? 'N/A' : el?.data?.userAgent,
        });
      });

      setLoginHistoryData(resultLoginHistory);
    }
  }, [loginHistoryState]);

  const handleSupportClicked = (item: any) => {
    console.log(item, 'item');
    // setToggleClicked(!toggleClicked);
    const { text } = item;
    if (text === namedDocumentStatus) {
      setDocumentIsModalVisible(true);
      dispatch(getUserVerificationsRequest({ userId }));
    }

    if (text === namedTransactionHistory) {
      console.log('transaction history');
    }
    if (text === namedDocumentHistory) {
      console.log('upload doc');
    }
    if (text === namedSavedBanks) {
      setSavedBankIsModalVisible(true);
    }
    if (text === namedLoginHistory) {
      setLoginHistoryIsModalVisible(true);
      dispatch(getProfileViewHistoryRequest({ userId }));
      dispatch(getLoginHistoryRequest({ userId }));
    }
  };

  return (
    <AppContainer goBack={() => navigate(USERS)} navTitle={`Back`} navHelper="Profile Review">
      <div>
        <UsersDetailContainer>
          <UserProfileContainer>
            <CustomerProfile data={customerDetails} title="Customer`s Details" />

            <CustomerProfile data={appActivity} title="App Activity" />
          </UserProfileContainer>

          <SupportContainer>
            <H2 left bold color={colors.greyVariantThree}>
              Support Functions
            </H2>
            <UserSupportActivity
              data={supportActivitiesData}
              setSelectedItem={setSelectedUserActivity}
              onClick={(item: any) => {
                handleSupportClicked(item);
              }}
              onClickProfileToggle={() => {}}
              profileToggleText={namedReactivateProfile}
              onClickViewSubAgent={() => {}}
              kycLevel={kycLevel}
            />
          </SupportContainer>
        </UsersDetailContainer>

        <DocumentStatusModal
          actionClick={() => {}}
          closeModal={() => setDocumentIsModalVisible(false)}
          isModalVisible={documentIsModalVisible}
          title="Document Status"
          data={docStatus}
          headerData={documentStatusDataHeader}
          isLoading={userVerificationsStatus === 'loading'}
        />

        <LoginHistoryModal
          actionClick={() => {}}
          closeModal={() => setLoginHistoryIsModalVisible(false)}
          isModalVisible={loginHistoryIsModalVisible}
          title="Login History"
          data={loginHistoryData}
          data2={profileViewData}
          headerData1={loginHistoryDataHeader1}
          headerData2={loginHistoryDataHeader2}
          isLoading={loginHistoryStatus === 'loading' || profileViewHistoryStatus === 'loading'}
        />

        <SavedBanksModal
          title="Banks"
          data={[{ id: 1, accNo: '33333', accName: 'Allen', bank: 'Commercial' }]}
          isModalVisible={savedBankIsModalVisible}
          closeModal={() => setSavedBankIsModalVisible(false)}
          headerData={{ accNo: 'Acct No', accName: 'Acct Name', bank: 'Bank' }}
          deleteAction={() => console.log('hello')}
        />

        <LoaderModal
          text="Loading please wait...."
          isModalVisible={userProfileStatus === 'loading'}
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default UserDetails;
