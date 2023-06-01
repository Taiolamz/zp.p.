import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';

import { DatePicker, BorderedText, Pagination, PreviousTransactionsTable } from '../../components';
import {
  AppContainer,
  ReconcileView,
  PerformActionModal,
  SuccessActionModal,
  LoaderModal,
  TransactionDetailsModal,
} from '../../atoms';
import {
  colors,
  dateFormat,
  spacing,
  yearDateFormat,
  routesPath,
  currencyFormat,
  capitalizeFirstLetter,
  timeFormat,
  showMessage,
} from '../../utils';
import { PrevTransactionContainer, PrevHeader, PrevSearch, DatePickerContainer } from './style';

import {
  getReconciliationAccountDetailRequest,
  getReconciliationAccountDetailReset,
  reconcileAccountRequest,
  reconcileAccountReset,
  getUserTransactionsRequest,
  getUserTransactionsReset,
  exportTransactionByIdToMailRequest,
  exportTransactionByIdToMailReset,
  getTransactionByIdRequest,
  downloadTransactionByIdRequest,
} from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { previousTransactionDataHeader } from './settlmentsData';
import { H2 } from '../../styles';
import { PrevTransactionTableIPropsIProps } from '../../components/tables/previousTransactionsTable';
import { Dictionary } from '../../types';

const initialDate = '2022-01-01';
const currentDate = new Date().toDateString();
const { RECONCILIATION } = routesPath;

function ReconcilationUserDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState(initialDate);
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState(currentDate);
  const [transactionFilterParams, setTransactionFilterParams] = useState({
    start_date: '',
    end_date: '',
  });
  const [reconcilationModalVisible, setReconcilationModalVisible] = useState(false);
  const [reconcilationSuccessModalVisible, setReconcilationSuccessModalVisible] = useState(false);
  const [userData, setUserData] = useState<Dictionary>({});
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrevTransactionItem, setSelectedPrevTransactionItem] = useState<Dictionary>({});
  const [previousTransactionData, setPreviousTransactionData] = useState<PrevTransactionTableIPropsIProps[]>([]);
  const [filterDate, setFilterDate] = useState(false);
  const [transactionDetailsModalVisible, setTransactionDetailsModalVisible] = useState(false);
  const [transactionByIdData, setTransactionByIdData] = useState<Dictionary>({});
  const [userEmail, setUserEmail] = useState('');
  // redux state

  const getReconciliationAccountDetailState = useAppSelector(state => state.getReconciliationAccountDetail);
  const { status: getReconciliationAccountDetailStatus } = getReconciliationAccountDetailState;

  const reconcileAccountState = useAppSelector(state => state.reconcileAccount);
  const { status: reconcileAccountStatus } = reconcileAccountState;

  const userTransactionsState = useAppSelector(state => state.getUserTransactions);
  const { status: userTransactionsStatus } = userTransactionsState;

  const exportTransactionByIdToMailState = useAppSelector(state => state.exportTransactionByIdToMail);
  const { status: exportTransactionByIdToMailStatus } = exportTransactionByIdToMailState;

  const getTransactionByIdState = useAppSelector(state => state.getTransactionById);

  const { status: getTransactionByIdStatus } = getTransactionByIdState;

  const downloadTransactionByIdState = useAppSelector(state => state.downloadTransactionById);
  const { status: downloadTransactionByIdStatus } = downloadTransactionByIdState;

  // api
  useEffect(() => {
    dispatch(getReconciliationAccountDetailRequest({ userId: id }));
  }, [reconcileAccountState]);

  useEffect(() => {
    if (getReconciliationAccountDetailStatus === 'succeeded') {
      setUserData(getReconciliationAccountDetailState?.data);
    }
  }, [getReconciliationAccountDetailState, reconcileAccountState]);

  const handleTransactionFilter = () => {
    setTransactionFilterParams({
      start_date: yearDateFormat(startDisplayRecordDate),
      end_date: yearDateFormat(endDisplayRecordDate),
    });
  };

  useEffect(() => {
    if (reconcileAccountStatus === 'succeeded') {
      setReconcilationSuccessModalVisible(true);
    }
  }, [reconcileAccountState]);

  useEffect(() => {
    dispatch(
      getUserTransactionsRequest({
        ...transactionFilterParams,
        userId: id,
        per_page: pageSize,
        page: currentPage,
      }),
    );
  }, [transactionFilterParams, currentPage, filterDate]);

  useEffect(() => {
    if (userTransactionsStatus === 'succeeded') {
      let updatedList: PrevTransactionTableIPropsIProps[] = [];

      userTransactionsState?.data?.transactions?.data?.forEach((item: Dictionary, index: number) => {
        updatedList.push({
          id: index + 1,
          tType: item?.transfer_purpose,
          tid: item?.transaction_reference,
          amount: currencyFormat(parseFloat(item?.amount), false, item?.currency),
          status: capitalizeFirstLetter(item?.status),
          date: `${dateFormat(item?.created_at)} - ${timeFormat(item?.created_at)}`,
          transId: item?.id,
        });
      });

      const {
        meta: { links },
      } = userTransactionsState?.data?.transactions;

      setTotalPages(links.length - 2);
      setPreviousTransactionData(updatedList);
    }
  }, [userTransactionsState]);

  useEffect(() => {
    if (getTransactionByIdStatus === 'succeeded') {
      const {
        amount,
        status,
        currency,
        transfer_purpose,
        beneficiary_account_id,
        charge,
        channel,
        created_at,
        external_account_name,
        source,
        user: { name, email, telephone },
      } = getTransactionByIdState.data.transaction;
      const result = {
        amount,
        status,
        currency,
        data: [
          {
            id: 1,
            text: capitalizeFirstLetter(transfer_purpose),
            helper: 'Transaction Type',
          },
          {
            id: 2,
            text: name,
            helper: 'Wallet Name',
          },
          {
            id: 3,
            text: email,
            helper: 'Email',
          },
          {
            id: 4,
            text: telephone,
            helper: 'Phone Number',
          },
          {
            id: 5,
            text: `N${charge}`,
            helper: 'Charges',
          },
          {
            id: 6,
            text: source !== null ? source?.name : external_account_name,
            helper: 'Sender Name',
          },
          {
            id: 7,
            text: channel,
            helper: 'Channel',
          },
          {
            id: 8,
            text: timeFormat(created_at, true),
            helper: 'Time',
          },
          {
            id: 9,
            text: dateFormat(created_at),
            helper: 'Date',
          },
        ],
      };
      setUserEmail(email);
      setTransactionByIdData(result);
    }
  }, [getTransactionByIdState]);

  useEffect(() => {
    if (exportTransactionByIdToMailStatus === 'succeeded') {
      setTransactionDetailsModalVisible(false);
      showMessage({
        type: 'success',
        message: exportTransactionByIdToMailState?.data?.message,
      });
      dispatch(exportTransactionByIdToMailReset());
    }
  }, [exportTransactionByIdToMailState]);

  const handleSetFilterDateToday = () => {
    setTransactionFilterParams({
      start_date: yearDateFormat(initialDate),
      end_date: yearDateFormat(currentDate),
    });
    setFilterDate(!filterDate);
  };

  const handleReconcileBalance = () => {
    dispatch(
      reconcileAccountRequest({
        account_number: userData?.user?.account?.number,
      }),
    );
  };

  const handleCloseReconcilationModal = () => {
    setReconcilationModalVisible(false);
  };

  const handleCloseReconcilationSuccessModal = () => {
    dispatch(reconcileAccountReset());
    setReconcilationModalVisible(false);
    setReconcilationSuccessModalVisible(false);
  };

  const handleOnTableClick = (item: Dictionary) => {
    setTransactionDetailsModalVisible(true);
    dispatch(
      getTransactionByIdRequest({
        transId: item.transId,
      }),
    );
  };

  return (
    <AppContainer goBack={() => navigate(RECONCILIATION)} navTitle="RECONCILIATION" navHelper="USER PROFILE">
      <div style={{ marginTop: spacing.small, paddingBottom: spacing.medium }}>
        <div>
          {getReconciliationAccountDetailStatus !== 'loading' && userData.hasOwnProperty('user') && (
            <ReconcileView
              name={userData?.user?.name}
              zojaBalance={userData?.user?.account?.available_balance}
              kudaBalance={userData?.kuda_balance.toString()}
              onClick={() => setReconcilationModalVisible(true)}
              data={[
                { text: userData?.user?.telephone, helper: 'Phone Number' },
                { text: userData?.user?.email, helper: 'Email' },
                {
                  text: userData?.user?.kyc?.bvn_number === null ? 'N/A' : userData?.user?.kyc?.bvn_number,
                  helper: 'BVN',
                },
                {
                  text: userData?.user?.account?.number,
                  helper: 'Account Number',
                },
                {
                  text: userData?.user?.location === null ? 'N/A' : userData?.user?.location,
                  helper: 'Address',
                },
                { text: userData?.user?.kyc_level, helper: 'KYC' },
                {
                  text: dateFormat(userData?.user?.updated_at),
                  helper: 'Last Login',
                },
                {
                  text: dateFormat(userData?.user?.created_at),
                  helper: 'Date of Onboarding',
                },
              ]}
            />
          )}
        </div>
        <PrevTransactionContainer>
          <PrevHeader>
            <H2 bold color={colors.greyVariantOne} left>
              Previous Transactions
            </H2>
            <PrevSearch>
              <DatePickerContainer>
                <DatePicker selectedDate={setStartDisplayRecordDate} />
                <DatePicker selectedDate={setEndDisplayRecordDate} />
              </DatePickerContainer>

              <BorderedText
                onClick={handleSetFilterDateToday}
                backgroundColor={colors.white}
                color={colors.grey}
                text="Today"
              />
              <BorderedText
                onClick={handleTransactionFilter}
                backgroundColor={colors.primary}
                color={colors.white}
                icon={<FiFilter color={colors.white} size={15} />}
                text="Search"
              />
            </PrevSearch>
          </PrevHeader>
          <PreviousTransactionsTable
            headerData={previousTransactionDataHeader}
            data={previousTransactionData}
            setSelectedItem={setSelectedPrevTransactionItem}
            // onClick={handleOnTableClick}
            onClick={(item: any) => {
              handleOnTableClick(item);
            }}
          />
        </PrevTransactionContainer>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={selectedPage => {
            setCurrentPage(selectedPage);
          }}
          isLoading={getReconciliationAccountDetailStatus === 'loading' || userTransactionsStatus === 'loading'}
        />

        <TransactionDetailsModal
          status={transactionByIdData?.status}
          amount={transactionByIdData?.amount}
          currency={transactionByIdData?.currency}
          isModalVisible={transactionDetailsModalVisible}
          closeModal={() => setTransactionDetailsModalVisible(false)}
          onClickExportBtn={() =>
            dispatch(
              downloadTransactionByIdRequest({
                transId: selectedPrevTransactionItem?.transId,
              }),
            )
          }
          exportBtnDisabled={downloadTransactionByIdStatus === 'loading' ? true : false}
          data={transactionByIdData?.data}
          isLoading={getTransactionByIdState.status === 'loading' ? true : false}
        />

        <PerformActionModal
          isModalVisible={reconcilationModalVisible}
          actionClick={handleReconcileBalance}
          closeModal={handleCloseReconcilationModal}
          actionText="Proceed"
          title="You Are About To Perform A Reconciliation"
          isLoading={reconcileAccountStatus === 'loading' ? true : false}
          text="This will revert the account balance of the user on ZojaPay to match their account balance on KUDA"
        />

        <SuccessActionModal
          isModalVisible={reconcilationSuccessModalVisible}
          actionText="Finish"
          closeModal={handleCloseReconcilationSuccessModal}
          title="Reconciliation Successful"
          text="User will be sent a notification informing them of the reversal."
        />

        <LoaderModal
          isModalVisible={getReconciliationAccountDetailStatus === 'loading' || userTransactionsStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default ReconcilationUserDetails;
