import * as yup from "yup";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { FiFilter } from "react-icons/fi";
import { H3 } from "../../styles";
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
} from "../../components";
import {
  SettlementBarChart,
  TabView,
  TransactionsView,
  MoreIconView,
  AppContainer,
} from "../../atoms";
import {
  colors,
  currencyFormat,
  getPathFromPagUrl,
  spacing,
  yearDateFormat,
} from "../../utils";
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
} from "./style";

import {
  getTransactionsRequest,
  getTransactionsReset,
} from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

const data = [
  {
    id: 1,
    count: 45233333,
    title: "Inflow",
    helper: "Total Income",
    color: colors.blueVariantOne,
  },
  {
    id: 2,
    count: 55000000,
    title: "Outflow",
    helper: "Total Withdrawals",
    color: colors.orange,
  },
  {
    id: 3,
    count: 7000000,
    title: "Profit",
    helper: "Sharing Percentage on Transactions",
    color: colors.greenVariantOne,
  },
];

const tabViewData = [
  { id: 1, isSelected: true, text: "Transactions History" },
  // { id: 2, isSelected: false, text: "Bills History" },
  // { id: 3, isSelected: false, text: "Cash Request History" },
];

const transactionDataHeader = {
  id: "",
  name: "Customer",
  tid: "Transaction ID",
  amount: "Amount",
  type: "Transaction Type",
  status: "Status",
  time: "Date",
};

const billsHistoryData = [
  {
    id: 1,
    tid: "CRIDD44BI",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "Allen Kardic",
  },
  {
    id: 2,
    tid: "CRIDD44BI",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "James Brown",
  },
  {
    id: 3,
    tid: "CRIDD44BI",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "Enoch Yakubu",
  },
];

const billsHistoryHeader = {
  id: "",
  name: "Customer",
  tid: "Transaction ID",
  amount: "Amount",
  type: "Bill Type",
  status: "Status",
  time: "Time",
};

const inflowData = [1000, 90, 100, 800, 500, 100, 900, 70, 80, 100, 800, 700];
const outflowData = [100, 10, 20, 80, 100, 800, 700, 800, 90, 100, 800, 500];
const profitData = [90, 50, 100, 91, 68, 100, 45, 70, 80, 30, 800, 50];
const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function Settlements() {
  const dispatch = useAppDispatch();
  const [transactionStartDate, setTransactionStartDate] = useState("");
  const [transactionEndDate, setTransactionEndDate] = useState("");
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState("");
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState("");
  const [transactionFilterParams, setTransactionFilterParams] = useState({
    reference: "",
    type: "",
    status: "",
    start_date: "",
    end_date: "",
  });
  const [paginationData, setPaginationData] = useState({});
  const [transactionDataList, setTransactionDataList] = useState<any[]>([]);
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
  const [barChartSelectedText, setBarChartSelectedText] = useState("All Data");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const totalPages = 5;

  const [selectedFailedTransaction, setSelectedFailedTransaction] =
    useState<any>({});
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [escalateModalVisible, setEscalateModalVisible] = useState(false);
  const [selectedTransactionActionText, setSelectedTransactionActionText] =
    useState("");

  const escalate = "Escalate";
  const escalateLog = "Escalation Log";
  const escalateClose = "Close Transaction";

  const moreIconOption = [escalate, escalateLog, escalateClose];

  const [selectedEscalateTo, setSelectedEscalateTo] = useState("");
  const [selectedPriorityLevel, setSelectedPriorityLevel] = useState("");

  // redux state
  const transactionState = useAppSelector((state) => state.getTransactions);

  const { status: getTransactionsStatus } = transactionState;

  const escalateCchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    escalateTo:
      selectedEscalateTo.length < 2
        ? yup.string().required("To who is required")
        : yup.string(),
    priorityLevel:
      selectedPriorityLevel.length < 2
        ? yup.string().required("Priority level is required")
        : yup.string(),
  });

  // this effect checks if any transaction card has been selected to show more modal
  useEffect(() => {
    if (
      selectedFailedTransaction.hasOwnProperty("name") &&
      selectedTransactionActionText.length < 3
    ) {
      setMoreIsVisible(true);
    }

    if (
      selectedFailedTransaction.hasOwnProperty("name") &&
      selectedTransactionActionText.length > 3
    ) {
      setMoreIsVisible(false);
      setEscalateModalVisible(true);
    }
  }, [selectedFailedTransaction, selectedTransactionActionText]);

  const handleCloseEscalateModal = () => {
    setEscalateModalVisible(false);
    setSelectedTransactionActionText("");
    setSelectedFailedTransaction({});
  };

  // api getTransactions
  useEffect(() => {
    dispatch(getTransactionsRequest(transactionFilterParams));
  }, [transactionFilterParams]);

  useEffect(() => {
    if (getTransactionsStatus === "succeeded") {
      let updatedList: any[] = [];

      transactionState?.data?.transactions?.data.forEach(
        (item: any, index: number) => {
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
        }
      );

      const { meta, links } = transactionState?.data?.transactions;

      setPaginationData({
        currentPageNo: meta.current_page,
        next: links.next !== null ? getPathFromPagUrl(links.next) : null,
        last: links.last !== null ? getPathFromPagUrl(links.last) : null,
        total: 1,
      });
      // console.log(transactionState?.data?.transactions, "data");

      setTransactionDataList(updatedList);
    }
  }, [transactionState]);

  // console.log(paginationData, "data");

  const handleTransactionFilter = () => {
    setTransactionFilterParams({
      reference: searchValue,
      type: "",
      status: "",
      start_date: yearDateFormat(startDisplayRecordDate),
      end_date: yearDateFormat(endDisplayRecordDate),
    });
  };

  return (
    <AppContainer navTitle='SETTLEMENTS'>
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
              onClick={() => {}}
              backgroundColor={colors.white}
              color={colors.grey}
              text={"Today"}
            />
            <BorderedText
              onClick={() => {}}
              backgroundColor={colors.primary}
              color={colors.white}
              text={"Filter Page"}
            />
          </AllTransactionContent>
        </AllTransactionContainer>
        <InfoCountContainer>
          {data.map((item: any) => (
            <InfoCountContent key={item.id}>
              <CountInfoCard
                title={item.title}
                helper={item.helper}
                color={item.color}
                count={currencyFormat(item.count)}
              />
            </InfoCountContent>
          ))}
        </InfoCountContainer>
        <div>
          <SettlementBarChart
            setBarChartSelectedText={setBarChartSelectedText}
            inflowData={
              barChartSelectedText === "All Data" ||
              barChartSelectedText === "Inflow"
                ? inflowData
                : emptyData
            }
            outflowData={
              barChartSelectedText === "All Data" ||
              barChartSelectedText === "Outflow"
                ? outflowData
                : emptyData
            }
            profitData={
              barChartSelectedText === "All Data" ||
              barChartSelectedText === "Profit"
                ? profitData
                : emptyData
            }
          />
        </div>

        <TabViewContainer>
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
        </TabViewContainer>
        {tabViewSelectedIndex === 1 && (
          <TransactionsView
            type={"transactions"}
            headerData={transactionDataHeader}
            header={true}
            data={transactionDataList}
            setSelectedItem={setSelectedFailedTransaction}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(selectedPage) => {
            setCurrentPage(selectedPage);
          }}
        />

        <Modal
          isModalVisible={escalateModalVisible}
          closeModal={handleCloseEscalateModal}>
          <Formik
            initialValues={{
              title: "",
              description: "",
              escalateTo: "",
              priorityLevel: "",
            }}
            enableReinitialize={true}
            validationSchema={escalateCchema}
            onSubmit={async (values, { setSubmitting }) => {
              const { title, description, escalateTo, priorityLevel } = values;
              setSubmitting(false);
            }}>
            {(formikProps) => {
              const { handleChange, values, handleSubmit, errors } =
                formikProps;
              return (
                <form onSubmit={handleSubmit}>
                  <EscalateFormContainer>
                    <CustomerNameContainer>
                      <Input
                        label='Customer Name'
                        backgroundColor={colors.white}
                        borderColor={colors.grey}
                        placeholder='Enter title'
                        type='text'
                        value={selectedFailedTransaction?.name}
                        name={"name"}
                        onChange={() => {}}
                      />
                    </CustomerNameContainer>

                    <Input
                      label='Title'
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder='Enter title'
                      type='text'
                      value={values.title}
                      name={"title"}
                      onChange={handleChange}
                      error={errors.title}
                    />

                    <TextArea
                      label='Title'
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder='Type here...'
                      value={values.description}
                      name={"description"}
                      onChange={handleChange}
                      error={errors.description}
                    />

                    <Picker
                      error={errors.escalateTo}
                      label='Escalate to'
                      selectedValue={setSelectedEscalateTo}
                      placeholder='Select Agent'
                      options={[
                        { label: "View Details", value: "View Details" },
                        { label: "Delete Options", value: "Delete Options" },
                      ]}
                    />

                    <Picker
                      error={errors.priorityLevel}
                      label='Priority Level'
                      selectedValue={setSelectedPriorityLevel}
                      placeholder='Select Priority'
                      options={[
                        { label: "View Details", value: "View Details" },
                        { label: "Delete Options", value: "Delete Options" },
                      ]}
                    />
                    <EscalateBtnContainer>
                      <Button type='submit' text='Escalate' disabled={false} />
                      <Button
                        onClick={handleCloseEscalateModal}
                        text='Cancel'
                        disabled={false}
                        secondary
                        borderColor='transparent'
                        color={colors.primary}
                      />
                    </EscalateBtnContainer>
                  </EscalateFormContainer>
                </form>
              );
            }}
          </Formik>
        </Modal>

        <MoreIconView
          setSelectedText={setSelectedTransactionActionText}
          isModalVisible={moreIsVisible}
          closeModal={() => setMoreIsVisible(false)}
          options={moreIconOption}
        />
      </div>
    </AppContainer>
  );
}

export default Settlements;
