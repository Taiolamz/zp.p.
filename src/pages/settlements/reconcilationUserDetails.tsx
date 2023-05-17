import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';

import { DatePicker, BorderedText, Pagination, SearchInput, PreviousTransactionsTable } from '../../components';
import {
  SettlementBarChart,
  TabView,
  TransactionsView,
  MoreIconView,
  AppContainer,
  ReconcileView,
  PerformActionModal,
  SuccessActionModal,
  LoaderModal,
} from '../../atoms';
import { colors, dateFormat, spacing, yearDateFormat, routesPath } from '../../utils';
import { TabViewContainer, TabContentTwo } from './style';

import {
  getTransactionsRequest,
  getTransactionsReset,
  getReconciliationAccountDetailRequest,
  getReconciliationAccountDetailReset,
  reconcileAccountRequest,
  reconcileAccountReset,
} from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { previousTransactionData, previousTransactionDataHeader } from './settlmentsData';
type Dictionary = {
  [key: string]: any;
};
const tabViewData = [
  { id: 1, isSelected: true, text: 'Transactions History' },
  // { id: 2, isSelected: false, text: "Bills History" },
  // { id: 3, isSelected: false, text: "Cash Request History" },
];

const transactionDataHeader = {
  id: '',
  name: 'Customer',
  tid: 'Transaction ID',
  amount: 'Amount',
  type: 'Transaction Type',
  status: 'Status',
  time: 'Date',
};

const { RECONCILIATION } = routesPath;

function ReconcilationUserDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [selectedFailedTransaction, setSelectedFailedTransaction] = useState<any>({});
  const [tabViewSelectedIndex, setTabViewSelectedIndex] = useState<any[number]>(1);
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState('');
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState('');
  const [transactionDataList, setTransactionDataList] = useState<any[]>([]);
  const [transactionFilterParams, setTransactionFilterParams] = useState({
    reference: '',
    type: '',
    status: '',
    start_date: '',
    end_date: '',
  });
  const [reconcilationModalVisible, setReconcilationModalVisible] = useState(false);
  const [reconcilationSuccessModalVisible, setReconcilationSuccessModalVisible] = useState(false);
  const [userData, setUserData] = useState<Dictionary>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [searchProfileValue, setSearchProfileValue] = useState('');
  const totalPages = 5;

  // redux state
  const transactionState = useAppSelector(state => state.getTransactions);
  const { status: getTransactionsStatus } = transactionState;

  const getReconciliationAccountDetailState = useAppSelector(state => state.getReconciliationAccountDetail);
  const { status: getReconciliationAccountDetailStatus } = getReconciliationAccountDetailState;

  const reconcileAccountState = useAppSelector(state => state.reconcileAccount);
  const { status: reconcileAccountStatus } = reconcileAccountState;

  // api
  useEffect(() => {
    dispatch(getTransactionsRequest(transactionFilterParams));
  }, [transactionFilterParams]);

  useEffect(() => {
    dispatch(getReconciliationAccountDetailRequest({ userId: id }));
  }, [reconcileAccountState]);

  useEffect(() => {
    if (getTransactionsStatus === 'succeeded') {
      let updatedList: any[] = [];

      transactionState?.data?.transactions?.data.forEach((item: any, index: number) => {
        updatedList.push({
          id: index + 1,
          name: item.user.name,
          tid: item.transaction_reference,
          amount: parseFloat(item.amount),
          type: item.type,
          status: item.status,
          icon: true,
          time: item.created_at,
          currency: item.currency,
        });
      });

      setTransactionDataList(updatedList);
    }
  }, [transactionState]);

  useEffect(() => {
    if (getReconciliationAccountDetailStatus === 'succeeded') {
      setUserData(getReconciliationAccountDetailState?.data);
    }
  }, [getReconciliationAccountDetailState, reconcileAccountState]);

  const handleTransactionFilter = () => {
    setTransactionFilterParams({
      reference: searchValue,
      type: '',
      status: '',
      start_date: yearDateFormat(startDisplayRecordDate),
      end_date: yearDateFormat(endDisplayRecordDate),
    });
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

  useEffect(() => {
    if (reconcileAccountStatus === 'succeeded') {
      setReconcilationSuccessModalVisible(true);
    }
  }, [reconcileAccountState]);

  return (
    <AppContainer goBack={() => navigate(RECONCILIATION)} navTitle="RECONCILIATION" navHelper="USER PROFILE">
      <div style={{ marginTop: spacing.small, height: '100vh' }}>
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
        <PreviousTransactionsTable
          headerData={previousTransactionDataHeader}
          data={previousTransactionData}
          onClick={() => {}}
        />

        {/* <TabViewContainer>
          <TabView
            data={tabViewData}
            setSelectedIndex={setTabViewSelectedIndex}
          />

          {tabViewSelectedIndex === 1 && (
            <TabContentTwo>
              <SearchInput
                backgroundColor={"transparent"}
                name='SearchValue'
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
                placeholder='Search Records'
              />

              <DatePicker selectedDate={setStartDisplayRecordDate} />

              <DatePicker selectedDate={setEndDisplayRecordDate} />

              <BorderedText
                onClick={handleTransactionFilter}
                backgroundColor={colors.primary}
                color={colors.white}
                icon={<FiFilter color={colors.white} size={15} />}
                text='Filter'
              />
            </TabContentTwo>
          )}
        </TabViewContainer> */}

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
          isModalVisible={getTransactionsStatus === 'loading' || getReconciliationAccountDetailStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default ReconcilationUserDetails;
