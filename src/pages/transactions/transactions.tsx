import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DownloadIcon } from '../../assets/svg/downloadBtn.svg';
import { DatePicker, BorderedText, Pagination, TransactionTable, CustomSelect } from '../../components';
import { AppContainer, LoaderModal, TransactionDetailsModal } from '../../atoms';
import {
  colors,
  dateFormat,
  spacing,
  capitalizeFirstLetter,
  timeFormat,
  showMessage,
  replaceStringWithBackslach,
} from '../../utils';

import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { H2 } from '../../styles';

import { Dictionary } from '../../types';

import { CustomSelectOptionsIProps } from '../../components/customSelect';
import { DatePickerContainer, HeaderContainer, HeaderContent } from './style';
import {
  getAllTransactionsRequest,
  getAllTransactionsReset,
  getTransactionByIdRequest,
  getTransactionByIdReset,
  downloadTransactionByIdRequest,
  downloadTransactionsRequest,
} from '../../redux/slice';

function Transactions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState({});

  //   redux state
  const allTransactionsState = useAppSelector(state => state.getAllTransactions);
  const { status: allTransactionsStatus } = allTransactionsState;

  const transactionByIdState = useAppSelector(state => state.getTransactionById);
  const { status: transactionByIdStatus } = transactionByIdState;

  const downloadTransactionByIdState = useAppSelector(state => state.downloadTransactionById);
  const { status: downloadTransactionByIdStatus } = downloadTransactionByIdState;

  const downloadTransactionsState = useAppSelector(state => state.downloadTransactions);
  const { status: downloadTransactionsStatus } = downloadTransactionsState;

  //   downloadTransactionByIdSliceReducer
  const initialDate = '2022-01-01';
  const currentDate = new Date().toDateString();
  const tTypesOption: CustomSelectOptionsIProps[] = [
    { key: `App,Models,CashTransfer`, value: 'CashTransfer' },
    { key: `App,Models,CashRequest`, value: 'CashRequest' },
    { key: `App,Models,WalletCredit`, value: 'WalletCredit' },
    { key: `App,Models,WalletDebit`, value: 'WalletDebit' },
    { key: `App,Models,Bill`, value: 'Bill' },
  ];

  const tStatusOption: CustomSelectOptionsIProps[] = [
    { key: 'success', value: 'Successful' },
    { key: 'failed', value: 'Failed' },
    { key: 'pending', value: 'Pending' },
  ];

  const [tTypes, setTTypes] = useState(['Transaction Type', 'Transaction Type']);
  const [tStatus, setTStatus] = useState(['Transaction Status', 'Transaction Status']);
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState(initialDate);
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState(currentDate);
  const [transactionDetailsModalVisible, setTransactionDetailsModalVisible] = useState(false);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [transactionByIdData, setTransactionByIdData] = useState<Dictionary>({});
  const [toggleFilter, setToggleFilter] = useState(false);
  const [singleTransId, setSingleTransId] = useState('');
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      getAllTransactionsRequest({
        model_type: tTypes[0] !== 'Transaction Type' ? replaceStringWithBackslach(tTypes[0]) : '',
        status: tStatus[0] !== 'Transaction Status' ? tStatus[0] : '',
        start_date: startDisplayRecordDate,
        end_date: endDisplayRecordDate,
        per_page: pageSize,
        page: currentPage,
      }),
    );
  }, [toggleFilter, currentPage]);

  useEffect(() => {
    if (allTransactionsStatus === 'succeeded') {
      const updatedList: any[] = [];

      allTransactionsState?.data?.transactions?.data.forEach((item: Dictionary, index: number) => {
        updatedList.push({
          id: index + 1,
          name: item?.user.name,
          tid: item?.transfer_purpose,
          amount: parseFloat(item?.amount),
          type: item?.transaction_reference,
          status: item.status,
          icon: false,
          time: item?.created_at,
          currency: item?.currency,
          phoneNumber: item?.user?.telephone,
          transId: item?.id,
          email: item?.user?.email,
        });
      });

      const {
        meta: { links, last_page },
      } = allTransactionsState?.data?.transactions;

      setTotalPages(last_page);
      setTransactionData(updatedList);
    }
  }, [allTransactionsState]);

  useEffect(() => {
    if (transactionByIdStatus === 'succeeded') {
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
      } = transactionByIdState.data.transaction;
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
      setTransactionByIdData(result);
    }
  }, [transactionByIdState]);

  useEffect(() => {
    if (downloadTransactionByIdStatus === 'succeeded') {
      //  do something
    }
  }, [downloadTransactionByIdState]);

  useEffect(() => {
    if (downloadTransactionsStatus === 'succeeded') {
      //  do something
    }
  }, [downloadTransactionsState]);

  const handleOnClick = (item: Dictionary) => {
    setTransactionDetailsModalVisible(true);
    setSingleTransId(item?.transId);
    dispatch(getTransactionByIdRequest({ transId: item?.transId }));
  };

  const handleOnClickDownloadSingleTransaction = () => {
    dispatch(downloadTransactionByIdRequest({ transId: singleTransId }));
  };

  const handleOnClickDownloadIcon = () => {
    dispatch(
      downloadTransactionsRequest({
        model_type: tTypes[0] !== 'Transaction Type' ? replaceStringWithBackslach(tTypes[0]) : '',
        status: tStatus[0] !== 'Transaction Status' ? tStatus[0] : '',
        start_date: startDisplayRecordDate,
        end_date: endDisplayRecordDate,
      }),
    );
  };

  return (
    <AppContainer navTitle="TRANSACTIONS">
      <div style={{ marginTop: spacing.small, paddingBottom: spacing.medium }}>
        <HeaderContainer>
          <H2 semiBold left>
            All Transactions
          </H2>
          <HeaderContent>
            <CustomSelect
              btnBackgroundColor={colors.white}
              btnColor={colors.primary}
              btnWidth={'150px'}
              optionsBackgroundColor={colors.white}
              optionsColor={colors.greyDark}
              optionsWidth={'150px'}
              value={tTypes}
              setValue={setTTypes}
              options={tTypesOption}
            />
            <CustomSelect
              btnBackgroundColor={colors.white}
              btnColor={colors.primary}
              btnWidth={'150px'}
              optionsBackgroundColor={colors.white}
              optionsColor={colors.greyDark}
              optionsWidth={'150px'}
              value={tStatus}
              setValue={setTStatus}
              options={tStatusOption}
            />
            <DatePickerContainer>
              <DatePicker selectedDate={setStartDisplayRecordDate} />
              <DatePicker selectedDate={setEndDisplayRecordDate} minDate={new Date(startDisplayRecordDate)} />
            </DatePickerContainer>
            <BorderedText
              text="Filter"
              onClick={() => {
                setToggleFilter(!toggleFilter);
              }}
              backgroundColor={colors.greyVariantFive}
              color={colors.primary}
            />
          </HeaderContent>
        </HeaderContainer>
        <TransactionTable
          type="mainTransactions"
          headerData={{
            name: 'Customer Name',
            type: 'Transaction ID',
            tid: 'Transaction Type',
            amount: 'Amount',
            status: 'Status',
            time: 'Date-Time',
          }}
          header={true}
          data={transactionData}
          setSelectedItem={setSelectedTransaction}
          onClick={(item: any) => handleOnClick(item)}
        />
        {tTypes[0] !== 'Transaction Type' && startDisplayRecordDate !== initialDate && (
          <DownloadIcon
            style={{ position: 'fixed', right: 30, top: '60vh', cursor: 'pointer' }}
            onClick={handleOnClickDownloadIcon}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={selectedPage => {
            setCurrentPage(selectedPage);
          }}
          isLoading={allTransactionsStatus === 'loading'}
        />

        <TransactionDetailsModal
          status={transactionByIdData?.status}
          amount={transactionByIdData?.amount}
          currency={transactionByIdData?.currency}
          isModalVisible={transactionDetailsModalVisible}
          closeModal={() => setTransactionDetailsModalVisible(false)}
          onClickExportBtn={handleOnClickDownloadSingleTransaction}
          exportBtnDisabled={downloadTransactionByIdStatus === 'loading'}
          data={transactionByIdData?.data}
          isLoading={transactionByIdStatus === 'loading' || transactionDetailsModalVisible === false}
          actionBtnText="Download"
        />
        <LoaderModal
          isModalVisible={allTransactionsStatus === 'loading' || downloadTransactionsStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default Transactions;
