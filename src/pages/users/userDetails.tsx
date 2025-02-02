import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerProfile, Pagination } from '../../components';
import {
  AppContainer,
  UserSupportActivity,
  DocumentStatusModal,
  LoginHistoryModal,
  LoaderModal,
  SavedBanksModal,
  ProfileActivationToggleModal,
  ActivityActionModal,
  TransactionHistoryModal,
  DocumentHistoryModal,
  SubAgentModal,
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
  TransactionHistoryHeader,
} from './data';

import {
  colors,
  routesPath,
  dateFormat,
  capitalizeFirstLetter,
  timeFormat,
  images,
  determineVericationDocState,
} from '../../utils';
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
  getUserSavedBanksRequest,
  deleteUserSavedBankRequest,
  deleteUserSavedBankReset,
  updateUserStatusRequest,
  updateUserStatusReset,
  getUserProfileTransactionRequest,
  getUserProfileTransactionReset,
  getDocumentHistoryRequest,
  getDocumentHistoryReset,
  getUserSubAgentsRequest,
  getUserSubAgentsReset,
} from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { CustomerProfileIProps } from '../../components/customerProfile';
import { DocumentStatusIProps } from '../../atoms/documentStatusModal';
import { LoginHistoryIProps } from '../../components/tables/loginHistoryTable';
import { Dictionary } from '../../types';
import { SavedBanksIProps } from '../../components/tables/savedBanksTable';
import { TransactionHistoryIProps } from '../../components/tables/transactionHistoryTable';
import { SubAgentIPropsIprops } from '../../components/subAgentCard';

const { USERS } = routesPath;

const kycVerificationbvn: string = 'bvnselfieverification';
const kycVerificationidentityCard: string = 'identitycardverification';
const kycVerificationCACDocumentVerification: string = 'cacdocumentverification';
const kycVerificationBusinessAddressVerification: string = 'businessaddressverification';

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
  const [documentHistoryIsModalVisible, setDocumentHistoryIsModalVisible] = useState(false);
  const [savedBanksData, setSavedBanksData] = useState<SavedBanksIProps[]>([]);
  const [selectedUserBank, setSelectedUserBank] = useState<Dictionary>({});
  const [userAccountStatus, setUserAccountStatus] = useState('');
  const [profileActivationIsModalVisible, setProfileActivationIsModalVisible] = useState(false);
  const [profileActivationSuccessIsModalVisible, setProfileActivationSuccessIsModalVisible] = useState(false);
  const [deactiveMessage, setDeactiveMessage] = useState('');
  const [transactionHistoryIsModalVisible, setTransactionHistoryIsModalVisible] = useState(false);
  const [userSubAgentsIsModalVisible, setUserSubAgentsIsModalVisible] = useState(false);
  const [transactionHistoryData, setTransactionHistoryData] = useState<TransactionHistoryIProps[]>([]);
  const [subAgentData, setSubAgentData] = useState<SubAgentIPropsIprops[]>([]);
  const [transactionHistoryCounts, setTransactionHistoryCounts] = useState<Dictionary>({
    cashRequest: 0,
    cashDelivery: 0,
    billTransaction: 0,
  });
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [subAgentCurrentPage, setSubAgentCurrentPage] = useState(1);
  const [subAgentTotalPages, setSubAgentTotalPages] = useState(5);
  const [documentHistoryData, setDocumentHistoryData] = useState<any[]>([]);

  // redux state
  const userProfileState = useAppSelector(state => state.getUserProfile);
  const { status: userProfileStatus } = userProfileState;

  const userVerificationsState = useAppSelector(state => state.getUserVerifications);
  const { status: userVerificationsStatus } = userVerificationsState;

  const profileViewHistoryState = useAppSelector(state => state.getProfileViewHistory);
  const { status: profileViewHistoryStatus } = profileViewHistoryState;

  const loginHistoryState = useAppSelector(state => state.getLoginHistory);
  const { status: loginHistoryStatus } = loginHistoryState;

  const userSavedBanksState = useAppSelector(state => state.getUserSavedBanks);
  const { status: userSavedBanksStatus } = userSavedBanksState;

  const deleteUserSavedBankState = useAppSelector(state => state.deleteUserSavedBank);
  const { status: deleteUserSavedBankStatus } = deleteUserSavedBankState;

  const updateUserStatusState = useAppSelector(state => state.updateUserStatus);
  const { status: updateUserStatusStatus } = updateUserStatusState;

  const userProfileTransactionState = useAppSelector(state => state.getUserProfileTransaction);
  const { status: userProfileTransactionStatus } = userProfileTransactionState;

  const documentHistoryState = useAppSelector(state => state.getDocumentHistory);
  const { status: documentHistoryStatus } = documentHistoryState;

  const userSubAgentsState = useAppSelector(state => state.getUserSubAgents);
  const { status: userSubAgentsStatus } = userSubAgentsState;

  const detmineKycLevel = (level: string) => {
    let result =
      level === 'level zero'
        ? 'Level 0'
        : level === 'level one'
        ? 'Level 1'
        : level === 'level two'
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
  }, [updateUserStatusState]);

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
          text: user?.bvn?.bvn_number === null ? 'N/A' : user?.bvn?.bvn_number,
        },
        {
          id: 5,
          text: user?.bvn === null ? 'N/A' : dateFormat(user?.bvn?.date_of_birth),
          helper: 'Date of birth',
        },
        {
          id: 6,
          helper: 'Profile Level',
          text: capitalizeFirstLetter(user?.kyc_level),
        },
        {
          id: 7,
          helper: 'Address Verification Status',
          text: user?.agent?.business_address === null ? 'Unverified' : 'Verified',
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
          text:
            user?.last_login === null
              ? 'N/A'
              : ` ${dateFormat(user?.last_login)} - ${timeFormat(user?.last_login, true)}`,
        },
        {
          id: 3,
          helper: 'Last Device Login',
          text: user?.device_detail === null ? 'N/A' : ` ${user?.device_detail}`,
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

      setUserAccountStatus(user?.status);
      setKycLevel(detmineKycLevel(user?.kyc_level));
      setCustomerDetails(customerDetailsResult);
      setAppActivity(appActivityResult);
    }
  }, [userProfileState]);

  useEffect(() => {
    let result: DocumentStatusIProps[] = [];

    const uniqueVerificationTypes: Dictionary = {};
    if (userVerificationsStatus === 'succeeded') {
      const numberOfVerificationLength = userVerificationsState?.data?.Verifications.length;

      const updateVerificationTypeNaming = (string: string) => {
        var new_string = string.replace(/-|\s/g, '');
        return new_string;
      };

      for (const obj of userVerificationsState?.data?.Verifications) {
        const { verification_type, status, upload_count } = obj;
        const camelCaseVerificationType = updateVerificationTypeNaming(verification_type);

        if (!uniqueVerificationTypes.hasOwnProperty(camelCaseVerificationType)) {
          uniqueVerificationTypes[camelCaseVerificationType] = {
            status,
            upload_count,
          };
        }
      }

      result = [
        {
          id: 1,
          document: 'Passport',
          noOfUpload: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationbvn,
          ).count,
          status: determineVericationDocState(numberOfVerificationLength, uniqueVerificationTypes, kycVerificationbvn)
            .status,
          statusBG: determineVericationDocState(numberOfVerificationLength, uniqueVerificationTypes, kycVerificationbvn)
            .statusBG,
        },
        {
          id: 2,
          document: 'ID Card',
          noOfUpload: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationidentityCard,
          ).count,
          status: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationidentityCard,
          ).status,
          statusBG: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationidentityCard,
          ).statusBG,
        },

        {
          id: 3,
          document: 'CAC Document',
          noOfUpload: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationCACDocumentVerification,
          ).count,
          status: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationCACDocumentVerification,
          ).status,
          statusBG: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationCACDocumentVerification,
          ).statusBG,
        },
        {
          id: 4,
          document: 'Address Verification',
          noOfUpload: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationBusinessAddressVerification,
          ).count,
          status: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationBusinessAddressVerification,
          ).status,
          statusBG: determineVericationDocState(
            numberOfVerificationLength,
            uniqueVerificationTypes,
            kycVerificationBusinessAddressVerification,
          ).statusBG,
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
          device: el?.data?.userAgent === null ? 'N/A' : el?.data?.userAgent,
          location: user?.location === null ? 'N/A' : user?.location,
          ipAddress: '-',
        });
      });

      setLoginHistoryData(resultLoginHistory);
    }
  }, [loginHistoryState]);

  // get user banks successful
  useEffect(() => {
    if (userSavedBanksStatus === 'succeeded') {
      let result: SavedBanksIProps[] = [];
      userSavedBanksState?.data?.user_banks?.data?.forEach((item: Dictionary) => {
        result.push({
          id: item?.id,
          accNo: item?.account_number,
          accName: item?.account_name,
          bank: item?.bank_name,
        });
      });

      setSavedBanksData(result);
    }
  }, [userSavedBanksState]);

  useEffect(() => {
    if (deleteUserSavedBankStatus === 'succeeded') {
      setSavedBankIsModalVisible(false);
    }
  }, [deleteUserSavedBankState]);

  // successful deactivate or reactivate user
  useEffect(() => {
    if (updateUserStatusStatus === 'succeeded') {
      setProfileActivationSuccessIsModalVisible(true);
    }
  }, [updateUserStatusState]);

  // successful user transactions table
  useEffect(() => {
    if (userProfileTransactionStatus === 'succeeded') {
      let result: TransactionHistoryIProps[] = [];
      userProfileTransactionState?.data?.transactions?.data?.forEach((item: Dictionary) => {
        result.push({
          id: item?.id,
          time: item?.created_at,
          transactionType: item?.transfer_purpose,
          amount: parseFloat(item?.amount),
          status: item?.status,
          recipient:
            item?.transfer_purpose === 'Wallet Credit'
              ? 'N/A'
              : item?.external_account_name !== null
              ? item.external_account_name
              : 'N/A',
        });
      });
      setTransactionHistoryCounts({
        cashRequest: userProfileTransactionState?.data?.cash_request_count,
        cashDelivery: userProfileTransactionState?.data?.cash_deliveries_count,
        billTransaction: userProfileTransactionState?.data?.bills_count,
      });
      setTransactionHistoryData(result);

      const {
        meta: { links, last_page },
      } = userProfileTransactionState?.data?.transactions;

      setTotalPages(last_page);
    }
  }, [userProfileTransactionState]);

  // successful document history
  useEffect(() => {
    if (documentHistoryStatus === 'succeeded') {
      const { bvn_photo, identity_card, cac_document } = documentHistoryState?.data;
      const result = [
        {
          id: 1,
          text: 'Passport',
          image: bvn_photo !== null ? bvn_photo : images.user,
          imgAlt: 'Passport photograph',
        },
        {
          id: 2,
          text: 'ID Card',
          image: identity_card !== null ? identity_card[0] : images.user,
          imgAlt: 'User Identification Card',
        },
        {
          id: 2,
          text: 'Agency Doc',
          image: cac_document !== null ? cac_document : images.user,
          imgAlt: 'Agency Document',
        },
      ];
      setDocumentHistoryData(result);
    }
  }, [documentHistoryState]);

  // successful sub agents
  useEffect(() => {
    if (userSubAgentsStatus === 'succeeded') {
      let result: SubAgentIPropsIprops[] = [];

      userSubAgentsState?.data?.users?.data?.forEach((item: Dictionary, index: number) => {
        result.push({
          id: index + 1,
          name: item?.name,
          dateAdded: item?.created_at,
          active: item.status === 'inactive' ? false : true,
        });
      });

      const {
        users: { links },
      } = userSubAgentsState?.data;

      setSubAgentTotalPages(links.length - 2);
      setSubAgentData(result);
    }
  }, [userSubAgentsState]);

  const handleSupportClicked = (item: any) => {
    const { text } = item;
    if (text === namedDocumentStatus) {
      setDocumentIsModalVisible(true);
      dispatch(getUserVerificationsRequest({ userId }));
    }

    if (text === namedTransactionHistory) {
      dispatch(getUserProfileTransactionRequest({ userId, per_page: pageSize, page: currentPage }));
      setTransactionHistoryIsModalVisible(true);
    }
    if (text === namedDocumentHistory) {
      dispatch(getDocumentHistoryRequest({ userId }));
      setDocumentHistoryIsModalVisible(true);
    }
    if (text === namedSavedBanks) {
      dispatch(deleteUserSavedBankReset());
      dispatch(getUserSavedBanksRequest({ userId }));
      setSavedBankIsModalVisible(true);
    }
    if (text === namedLoginHistory) {
      setLoginHistoryIsModalVisible(true);
      dispatch(getProfileViewHistoryRequest({ userId }));
      dispatch(getLoginHistoryRequest({ userId }));
    }
    if (text === namedReactivateProfile || text === namedDeactivateProfile) {
      setProfileActivationIsModalVisible(true);
    }
  };

  const handleDaleteUserBank = () => {
    dispatch(deleteUserSavedBankRequest({ beneficiaryId: selectedUserBank?.id }));
  };

  const handleUserProfileActivity = () => {
    let payload: Dictionary;
    if (userAccountStatus === 'active') {
      payload = {
        userId,
        data: {
          status: 'inactive',
          comment: deactiveMessage,
        },
      };
    } else {
      payload = {
        userId,
        data: {
          status: 'active',
        },
      };
    }

    dispatch(updateUserStatusRequest(payload));
  };

  const handleProfileActivationSuccessClose = () => {
    setProfileActivationSuccessIsModalVisible(false);
    dispatch(updateUserStatusReset());
  };

  const handleOnClickSubAgent = (selectedPage: number) => {
    setUserSubAgentsIsModalVisible(true);
    dispatch(getUserSubAgentsRequest({ userId, per_page: subAgentTotalPages, page: selectedPage }));
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
              onClick={(item: Dictionary) => {
                handleSupportClicked(item);
              }}
              onClickProfileToggle={() => setProfileActivationIsModalVisible(true)}
              profileToggleText={userAccountStatus === 'active' ? namedDeactivateProfile : namedReactivateProfile}
              onClickViewSubAgent={() => handleOnClickSubAgent(1)}
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
          data={savedBanksData}
          isModalVisible={savedBankIsModalVisible}
          closeModal={() => setSavedBankIsModalVisible(false)}
          headerData={{ accNo: 'Acct No', accName: 'Acct Name', bank: 'Bank' }}
          deleteAction={handleDaleteUserBank}
          isFetchingBanks={userSavedBanksStatus === 'loading'}
          setSelectedItem={setSelectedUserBank}
        />

        <ProfileActivationToggleModal
          isModalVisible={profileActivationIsModalVisible}
          activityStatus={userAccountStatus}
          actionClicked={handleUserProfileActivity}
          closeModal={() => setProfileActivationIsModalVisible(false)}
          setDeactiveMessage={setDeactiveMessage}
        />

        {/* this modal shows when admin successfully activate or deactivate a user */}
        <ActivityActionModal
          isModalVisible={profileActivationSuccessIsModalVisible}
          closeModal={handleProfileActivationSuccessClose}
          actionClick={handleProfileActivationSuccessClose}
          image={images.check}
          isLoading={false}
          actionText="Close"
          title=""
          text={
            userAccountStatus === 'active'
              ? 'Profile has been successfuly deactivated'
              : 'Profile has been successfuly reactivated'
          }
        />

        {/* Transaction History modal */}
        <TransactionHistoryModal
          title="Transaction Hisory"
          isModalVisible={transactionHistoryIsModalVisible}
          firstCount={transactionHistoryCounts.cashRequest}
          secondCount={transactionHistoryCounts.cashDelivery}
          thirdCount={transactionHistoryCounts.billTransaction}
          data={transactionHistoryData}
          headerData={TransactionHistoryHeader}
          closeModal={() => setTransactionHistoryIsModalVisible(false)}
          actionClick={() => {}}
          isLoading={userProfileTransactionStatus === 'loading'}>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={selectedPage => {
                setCurrentPage(selectedPage);
              }}
              isLoading={userProfileTransactionStatus === 'loading'}
            />
          </div>
        </TransactionHistoryModal>

        {/* document history */}
        <DocumentHistoryModal
          title="Document History"
          data={documentHistoryData}
          isModalVisible={documentHistoryIsModalVisible}
          closeModal={() => setDocumentHistoryIsModalVisible(false)}
          isLoading={documentHistoryStatus === 'loading'}
        />

        {/* user subAgents */}
        <SubAgentModal
          isModalVisible={userSubAgentsIsModalVisible}
          title="Sub-Agents"
          description="See all sub agents assigned to this user"
          data={subAgentData}
          isLoading={userSubAgentsStatus === 'loading'}
          closeModal={() => setUserSubAgentsIsModalVisible(false)}>
          <div>
            <Pagination
              currentPage={subAgentCurrentPage}
              totalPages={subAgentTotalPages}
              onPageChange={selectedPage => {
                setSubAgentCurrentPage(selectedPage);
                handleOnClickSubAgent(selectedPage);
              }}
              isLoading={userProfileTransactionStatus === 'loading'}
            />
          </div>
        </SubAgentModal>
        <LoaderModal
          text={
            updateUserStatusStatus === 'loading'
              ? 'Please wait...'
              : deleteUserSavedBankStatus === 'loading'
              ? 'Deleting user bank'
              : 'Loading please wait....'
          }
          isModalVisible={
            updateUserStatusStatus === 'loading' ||
            deleteUserSavedBankStatus === 'loading' ||
            userProfileStatus === 'loading'
          }
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default UserDetails;
