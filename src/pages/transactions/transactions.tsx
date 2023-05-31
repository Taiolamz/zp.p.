import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { ReactComponent as DownloadIcon } from '../../assets/svg/downloadBtn.svg';
import { DatePicker, BorderedText, Pagination } from '../../components';
import { TransactionTable, CustomSelect } from '../../components';
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

import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { H2 } from '../../styles';

import { Dictionary } from '../../types';

import { CustomSelectOptionsIProps } from '../../components/customSelect';
import { DatePickerContainer, HeaderContainer, HeaderContent } from './style';

const initialDate = '2022-01-01';
const currentDate = new Date().toDateString();
const { RECONCILIATION } = routesPath;

function Transactions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState({});
  let dd = new Date();
  const initialDate = '2022-01-01';
  const currentDate = new Date().toDateString();
  const tTypesOption: CustomSelectOptionsIProps[] = [
    { key: 'daily', value: 'Daily' },
    { key: 'weekly', value: 'Weekly' },
    { key: 'monthly', value: 'Monthly' },
  ];

  const tStatusOption: CustomSelectOptionsIProps[] = [
    { key: 'successful', value: 'Successful' },
    { key: 'failed', value: 'Failed' },
    { key: 'pending', value: 'Pending' },
  ];

  const [tTypes, setTTypes] = useState(['Transaction Type', 'Transaction Type']);
  const [tStatus, setTStatus] = useState(['Transaction Status', 'Transaction Status']);
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState(initialDate);
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState(currentDate);
  const [transactionDetailsModalVisible, setTransactionDetailsModalVisible] = useState(false);

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
              onClick={() => {}}
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
          data={[
            {
              id: 1,
              name: 'allen k',
              tid: 'lgflksj',
              amount: parseFloat('2000'),
              type: 'item.type',
              status: 'item.status',
              icon: false,
              time: dd,
              currency: 'N',
              phoneNumber: '333',
              transId: '2333',
              email: 'aliakwe',
            },
          ]}
          setSelectedItem={setSelectedTransaction}
          onClick={(item: any) => handleOnClick(item)}
        />
        <DownloadIcon
          style={{ position: 'absolute', right: 30, top: '60vh', cursor: 'pointer' }}
          onClick={() => setTransactionDetailsModalVisible(true)}
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
        <LoaderModal isModalVisible={false} text="Loading please wait..." closeModal={() => {}} />
      </div>
    </AppContainer>
  );
}

export default Transactions;
