import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DownloadIcon } from '../../assets/svg/downloadBtn.svg';
import { DatePicker, BorderedText, Pagination, TransactionTable, CustomSelect } from '../../components';
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
  replaceStringWithBackslach,
} from '../../utils';

import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { H2 } from '../../styles';

import { Dictionary } from '../../types';

import { CustomSelectOptionsIProps } from '../../components/customSelect';
import { DatePickerContainer, HeaderContainer, HeaderContent } from './style';
import { getAllTransactionsRequest, getAllTransactionsReset } from '../../redux/slice';

// const initialDate = '2022-01-01';
// const currentDate = new Date().toDateString();
const { RECONCILIATION } = routesPath;

function Transactions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState({});

  //   redux state
  const allTransactionsState = useAppSelector(state => state.getAllTransactions);
  const { status: allTransactionsStatus } = allTransactionsState;

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
  const [toggleFilter, setToggleFilter] = useState(false);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(tTypes[0], 'tTypesOption');
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
          tid: item?.model_type,
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
        meta: { links },
      } = allTransactionsState?.data?.transactions;

      setTotalPages(links.length - 2);
      setTransactionData(updatedList);
    }
  }, [allTransactionsState]);

  const handleOnClick = (item: Dictionary) => {
    console.log(item, 'item');
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
        <DownloadIcon
          style={{ position: 'fixed', right: 30, top: '60vh', cursor: 'pointer' }}
          onClick={() => setTransactionDetailsModalVisible(true)}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={selectedPage => {
            setCurrentPage(selectedPage);
          }}
          isLoading={allTransactionsStatus === 'loading'}
        />

        <TransactionDetailsModal
          status={'success'}
          amount={'2000'}
          currency={'N'}
          isModalVisible={transactionDetailsModalVisible}
          closeModal={() => setTransactionDetailsModalVisible(false)}
          onClickExportBtn={() => console.log('hello')}
          exportBtnDisabled={false}
          data={[{ id: 1, text: 'hello', helper: 'me me' }]}
          isLoading={false}
        />
        <LoaderModal
          isModalVisible={allTransactionsStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default Transactions;
