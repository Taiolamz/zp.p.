import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { FiFilter } from 'react-icons/fi';
import { H3 } from '../../styles';
import {
  CountInfoCard,
  DatePicker,
  BorderedText,
  Pagination,
  SearchInput,
  Modal,
  Picker,
  Input,
  TextArea,
  Button,
  TransactionTable,
} from '../../components';
import {
  SettlementBarChart,
  TabView,
  MoreIconView,
  AppContainer,
  SuccessModalWithCopy,
  TransactionDetailsModal,
  LoaderModal,
} from '../../atoms';
import {
  colors,
  currencyFormat,
  spacing,
  yearDateFormat,
  dateFormat,
  timeFormat,
  showMessage,
  capitalizeFirstLetter,
} from '../../utils';
import {
  AllTransactionContainer,
  AllTransactionContent,
  DateContent,
  InfoCountContainer,
  InfoCountContent,
  TabViewContainer,
  TabContentTwo,
  EscalateFormContainer,
  EscalateBtnContainer,
  CustomerNameContainer,
  DatePickerContainer,
} from './style';

import {
  getTransactionsRequest,
  getTransactionsReset,
  getEscalationAgentsRequest,
  createEscalationTicketRequest,
  createEscalationTicketReset,
  getTransactionByIdRequest,
  exportTransactionByIdToMailRequest,
  exportTransactionByIdToMailReset,
  settlementAnalyticsRequest,
} from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
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
  blank: '',
};

const billsHistoryData = [
  {
    id: 1,
    tid: 'CRIDD44BI',
    amount: 20000,
    type: 'Bill payment',
    status: 'System Failure',
    time: '24/11/2021- 17:01',
    icon: true,
    name: 'Allen Kardic',
  },
  {
    id: 2,
    tid: 'CRIDD44BI',
    amount: 20000,
    type: 'Bill payment',
    status: 'System Failure',
    time: '24/11/2021- 17:01',
    icon: true,
    name: 'James Brown',
  },
  {
    id: 3,
    tid: 'CRIDD44BI',
    amount: 20000,
    type: 'Bill payment',
    status: 'System Failure',
    time: '24/11/2021- 17:01',
    icon: true,
    name: 'Enoch Yakubu',
  },
];

const billsHistoryHeader = {
  id: '',
  name: 'Customer',
  tid: 'Transaction ID',
  amount: 'Amount',
  type: 'Bill Type',
  status: 'Status',
  time: 'Time',
};

const initialDate = '2022-01-01';
const currentDate = new Date().toDateString();
// const inflowData = [1000, 90, 100, 800, 500, 100, 900, 70, 80, 100, 800, 700];
// const outflowData = [100, 10, 20, 80, 100, 800, 700, 800, 90, 100, 800, 500];
// const profitData = [90, 50, 100, 91, 68, 100, 45, 70, 80, 30, 800, 50];
const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function Settlements() {
  const dispatch = useAppDispatch();
  const [transactionStartDate, setTransactionStartDate] = useState(initialDate);
  const [transactionEndDate, setTransactionEndDate] = useState(currentDate);
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState('');
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState('');
  const [transactionFilterParams, setTransactionFilterParams] = useState({
    reference: '',
    type: '',
    status: '',
    start_date: '',
    end_date: '',
  });

  const [transactionDataList, setTransactionDataList] = useState<any[]>([]);
  const [tabViewSelectedIndex, setTabViewSelectedIndex] = useState<any[number]>(1);
  const [barChartSelectedText, setBarChartSelectedText] = useState('All Data');
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [searchValue, setSearchValue] = useState('');

  const [selectedFailedTransaction, setSelectedFailedTransaction] = useState<any>({});
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [escalateModalVisible, setEscalateModalVisible] = useState(false);
  const [escalateSuccessfulModalVisible, setEscalateSuccessfulModalVisible] = useState(false);

  const [transactionDetailsModalVisible, setTransactionDetailsModalVisible] = useState(false);
  const [selectedTransactionActionText, setSelectedTransactionActionText] = useState('');
  const [escalateSuccessfulData, setEscalateSuccessfulData] = useState<Dictionary>({});
  const [escalationAgentsList, setEscalationAgentsList] = useState<any[]>([]);
  const [transactionByIdData, setTransactionByIdData] = useState<Dictionary>({});
  const transactionDetails = 'Transaction Details';
  const escalate = 'Escalate';
  const moreIconOption = [transactionDetails, escalate];

  const [selectedEscalateTo, setSelectedEscalateTo] = useState('');
  const [selectedPriorityLevel, setSelectedPriorityLevel] = useState('');
  const [inflowData, setInflowData] = useState<any[]>([]);
  const [outflowData, setOutflowData] = useState<any[]>([]);
  const [profitData, setProfitData] = useState<any[]>([]);
  const [analyticsSummaryData, setAnalyticsSummaryData] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState(false);

  // redux state
  const transactionState = useAppSelector(state => state.getTransactions);
  const { status: getTransactionsStatus } = transactionState;

  const getTransactionByIdState = useAppSelector(state => state.getTransactionById);

  const { status: getTransactionByIdStatus } = getTransactionByIdState;

  const getEscalationAgentsState = useAppSelector(state => state.getEscalationAgents);
  const { status: getEscalationAgentsStatus } = getEscalationAgentsState;

  const createEscalationTicketState = useAppSelector(state => state.createEscalationTicket);
  const { status: createEscalationTicketStatus } = createEscalationTicketState;

  const exportTransactionByIdToMailState = useAppSelector(state => state.exportTransactionByIdToMail);
  const { status: exportTransactionByIdToMailStatus } = exportTransactionByIdToMailState;

  const settlementAnalyticsState = useAppSelector(state => state.settlementAnalytics);
  const { status: settlementAnalyticsStatus } = settlementAnalyticsState;

  const escalateCchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    escalateTo: selectedEscalateTo.length < 2 ? yup.string().required('To who is required') : yup.string(),
    priorityLevel:
      selectedPriorityLevel.length < 2 ? yup.string().required('Priority level is required') : yup.string(),
  });

  useEffect(() => {
    if (getTransactionByIdStatus === 'succeeded') {
      const {
        amount,
        status,
        currency,
        transfer_purpose,
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

      setTransactionByIdData(result);
    }
  }, [getTransactionByIdState]);

  const handleCloseEscalateModal = () => {
    setEscalateModalVisible(false);
    setSelectedTransactionActionText('');
    setSelectedFailedTransaction({});
  };

  // api analytics

  useEffect(() => {
    const payload = {
      startDate: yearDateFormat(transactionStartDate),
      endDate: yearDateFormat(transactionEndDate),
    };
    dispatch(settlementAnalyticsRequest(payload));
  }, [filterDate]);

  useEffect(() => {
    if (settlementAnalyticsStatus === 'succeeded') {
      let inflowResult: any[] = [];
      let outflowResult: any[] = [];
      let profitResult: any[] = [];
      settlementAnalyticsState?.data?.transaction_analytics?.forEach((item: any) => {
        inflowResult.push(parseFloat(item?.data?.in_flow));
        outflowResult.push(parseFloat(item?.data?.out_flow));
        profitResult.push(parseFloat(item?.data?.profit));
      });

      setInflowData(inflowResult);
      setOutflowData(outflowResult);
      setProfitData(profitResult);

      setAnalyticsSummaryData([
        {
          id: 1,
          amount: parseFloat(settlementAnalyticsState?.data?.inflow),
          title: 'Inflow',
          helper: 'Total Income',
          color: colors.blueVariantOne,
        },
        {
          id: 2,
          amount: parseFloat(settlementAnalyticsState?.data?.outflow),
          title: 'Outflow',
          helper: 'Total Withdrawals',
          color: colors.orange,
        },
        {
          id: 3,
          amount: parseFloat(settlementAnalyticsState?.data?.profit),
          title: 'Profit',
          helper: 'Sharing Percentage on Transactions',
          color: colors.greenVariantOne,
        },
      ]);
    }
  }, [settlementAnalyticsState]);

  // api getTransactions
  useEffect(() => {
    dispatch(
      getTransactionsRequest({
        ...transactionFilterParams,
        per_page: pageSize,
        page: currentPage,
      }),
    );
  }, [transactionFilterParams, currentPage]);

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
          phoneNumber: item.user.telephone,
          transId: item.id,
          email: item.user.email,
        });
      });

      const {
        meta: { links },
      } = transactionState?.data?.transactions;

      setTotalPages(links.length - 2);

      setTransactionDataList(updatedList);
    }
  }, [transactionState]);

  useEffect(() => {
    // fetch escalation agents on when escalation is clicked from options
    if (selectedTransactionActionText === escalate) {
      dispatch(getEscalationAgentsRequest({ id: 'user' }));
    }
  }, [selectedTransactionActionText]);

  useEffect(() => {
    if (getEscalationAgentsStatus === 'succeeded') {
      let result: any[] = [];
      getEscalationAgentsState.data.internal_users.forEach((item: any) => {
        result.push({
          value: item.id,
          label: item.name,
        });
      });
      setEscalationAgentsList(result);
    }
  }, [getEscalationAgentsState]);

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

  useEffect(() => {
    if (createEscalationTicketStatus === 'succeeded') {
      setEscalateSuccessfulData(createEscalationTicketState.data.ticket);
      setEscalateSuccessfulModalVisible(true);
      setEscalateSuccessfulData({});
    }
  }, [createEscalationTicketState]);

  const handleCloseEscalateSuccessfulModal = () => {
    setEscalateSuccessfulModalVisible(false);
    setEscalateSuccessfulData({});
    dispatch(createEscalationTicketReset());
    handleCloseEscalateModal();
  };

  const handleTransactionFilter = () => {
    setTransactionFilterParams({
      reference: searchValue,
      type: '',
      status: '',
      start_date: startDisplayRecordDate.length < 2 ? '' : yearDateFormat(startDisplayRecordDate),
      end_date: endDisplayRecordDate.length < 2 ? '' : yearDateFormat(endDisplayRecordDate),
    });
  };

  // handle different excalation modules
  const handleMoreIconOptions = async (item: string) => {
    if (selectedFailedTransaction.hasOwnProperty('name') && item === escalate) {
      setMoreIsVisible(false);
      setEscalateModalVisible(true);
    }
    if (selectedFailedTransaction.hasOwnProperty('name') && item === transactionDetails) {
      setMoreIsVisible(false);
      setTransactionDetailsModalVisible(true);
      dispatch(
        getTransactionByIdRequest({
          transId: selectedFailedTransaction.transId,
        }),
      );
    }
  };

  const handleSetFilterDateToday = () => {
    setTransactionStartDate(initialDate);
    setTransactionEndDate(currentDate);

    setFilterDate(!filterDate);
  };

  return (
    <AppContainer navTitle="SETTLEMENTS">
      <div>
        <AllTransactionContainer>
          <H3 color={colors.primary}>All Transactions</H3>
          <AllTransactionContent>
            <DateContent>
              <DatePicker selectedDate={setTransactionStartDate} />
              <div
                style={{
                  marginLeft: spacing.xsmall,
                  marginRight: spacing.xsmall,
                }}>
                -
              </div>
              <DatePicker selectedDate={setTransactionEndDate} />
            </DateContent>
            <BorderedText
              onClick={handleSetFilterDateToday}
              backgroundColor={colors.white}
              color={colors.grey}
              text={'Today'}
            />
            <BorderedText
              onClick={() => {
                setFilterDate(!filterDate);
              }}
              backgroundColor={colors.primary}
              color={colors.white}
              text={'Filter Page'}
            />
          </AllTransactionContent>
        </AllTransactionContainer>
        <InfoCountContainer>
          {analyticsSummaryData.map((item: any) => (
            <InfoCountContent key={item.id}>
              <CountInfoCard
                title={item.title}
                helper={item.helper}
                color={item.color}
                count={currencyFormat(item.amount)}
              />
            </InfoCountContent>
          ))}
        </InfoCountContainer>
        <div>
          <SettlementBarChart
            setBarChartSelectedText={setBarChartSelectedText}
            inflowData={
              barChartSelectedText === 'All Data' || barChartSelectedText === 'Inflow' ? inflowData : emptyData
            }
            outflowData={
              barChartSelectedText === 'All Data' || barChartSelectedText === 'Outflow' ? outflowData : emptyData
            }
            profitData={
              barChartSelectedText === 'All Data' || barChartSelectedText === 'Profit' ? profitData : emptyData
            }
          />
        </div>

        <TabViewContainer>
          <TabView data={tabViewData} setSelectedIndex={setTabViewSelectedIndex} />
          {tabViewSelectedIndex === 1 && (
            <TabContentTwo>
              <SearchInput
                backgroundColor={'transparent'}
                name="SearchValue"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(e.target.value);
                }}
                placeholder="Search by transaction ID"
              />
              <DatePickerContainer>
                <DatePicker selectedDate={setStartDisplayRecordDate} />
                <DatePicker selectedDate={setEndDisplayRecordDate} />
              </DatePickerContainer>
              <BorderedText
                onClick={handleTransactionFilter}
                backgroundColor={colors.primary}
                color={colors.white}
                icon={<FiFilter color={colors.white} size={15} />}
                text="Filter"
              />
            </TabContentTwo>
          )}
        </TabViewContainer>
        {tabViewSelectedIndex === 1 && (
          <TransactionTable
            type={'transactions'}
            headerData={transactionDataHeader}
            header={true}
            data={transactionDataList}
            setSelectedItem={setSelectedFailedTransaction}
            onClick={(item: Dictionary) => setMoreIsVisible(true)}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={selectedPage => {
            setCurrentPage(selectedPage);
          }}
          isLoading={
            getTransactionsStatus === 'loading' ||
            settlementAnalyticsStatus === 'loading' ||
            transactionDataList?.length < 1
          }
        />

        <Modal isModalVisible={escalateModalVisible} closeModal={handleCloseEscalateModal}>
          <Formik
            initialValues={{
              title: '',
              description: '',
              escalateTo: '',
              priorityLevel: '',
            }}
            enableReinitialize={true}
            validationSchema={escalateCchema}
            onSubmit={async (values, { setSubmitting }) => {
              const { title, description } = values;

              await dispatch(
                createEscalationTicketRequest({
                  title,
                  description,
                  internal_user_id: selectedEscalateTo,
                  priority_level: selectedPriorityLevel,
                  customer_telephone: selectedFailedTransaction?.phoneNumber,
                }),
              );

              setSubmitting(false);
            }}>
            {formikProps => {
              const { handleChange, values, handleSubmit, errors } = formikProps;
              return (
                <form onSubmit={handleSubmit}>
                  <EscalateFormContainer>
                    <CustomerNameContainer>
                      <Input
                        label="Customer Name"
                        backgroundColor={colors.white}
                        borderColor={colors.grey}
                        placeholder="Enter title"
                        type="text"
                        value={selectedFailedTransaction?.name}
                        name={'name'}
                        onChange={() => {}}
                      />
                    </CustomerNameContainer>

                    <Input
                      label="Title"
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder="Enter title"
                      type="text"
                      value={values.title}
                      name={'title'}
                      onChange={handleChange}
                      error={errors.title}
                    />

                    <TextArea
                      label="Title"
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder="Type here..."
                      value={values.description}
                      name={'description'}
                      onChange={handleChange}
                      error={errors.description}
                    />

                    <Picker
                      error={errors.escalateTo}
                      label="Escalate to"
                      selectedValue={setSelectedEscalateTo}
                      placeholder="Select Agent"
                      options={escalationAgentsList}
                    />

                    <Picker
                      error={errors.priorityLevel}
                      label="Priority Level"
                      selectedValue={setSelectedPriorityLevel}
                      placeholder="Select Priority"
                      options={[
                        { label: 'Low', value: 'low' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'High', value: 'high' },
                      ]}
                    />
                    <EscalateBtnContainer>
                      <Button
                        type="submit"
                        text="Escalate"
                        disabled={createEscalationTicketStatus === 'loading' ? true : false}
                      />
                      <Button
                        onClick={handleCloseEscalateModal}
                        text="Cancel"
                        disabled={false}
                        secondary
                        borderColor="transparent"
                        color={colors.primary}
                      />
                    </EscalateBtnContainer>
                  </EscalateFormContainer>
                </form>
              );
            }}
          </Formik>
        </Modal>

        {/* Escalation successful modal */}
        <SuccessModalWithCopy
          isModalVisible={escalateSuccessfulModalVisible}
          closeModal={handleCloseEscalateSuccessfulModal}
          text={'Complaint has been escalated with Ticket Id:'}
          copyIconText={'Copy Ticket:Id'}
          title={escalateSuccessfulData?.ticket_reference}
          iconType="sent"
        />

        <TransactionDetailsModal
          status={transactionByIdData?.status}
          amount={transactionByIdData?.amount}
          currency={transactionByIdData?.currency}
          isModalVisible={transactionDetailsModalVisible}
          closeModal={() => setTransactionDetailsModalVisible(false)}
          onClickExportBtn={() =>
            dispatch(
              exportTransactionByIdToMailRequest({
                transId: selectedFailedTransaction.transId,
                email: selectedFailedTransaction.email,
              }),
            )
          }
          exportBtnDisabled={exportTransactionByIdToMailStatus === 'loading' ? true : false}
          data={transactionByIdData?.data}
          isLoading={getTransactionByIdState.status === 'loading' ? true : false}
        />

        <MoreIconView
          setSelectedText={setSelectedTransactionActionText}
          isModalVisible={moreIsVisible}
          closeModal={() => setMoreIsVisible(false)}
          options={moreIconOption}
          onClick={item => handleMoreIconOptions(item)}
        />
        <LoaderModal
          isModalVisible={getTransactionsStatus === 'loading' || settlementAnalyticsStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default Settlements;
