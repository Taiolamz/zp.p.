import * as yup from "yup";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { H2, H3 } from "../../styles";
import {
  CountInfoCard,
  DatePicker,
  BorderedText,
  Pagination,
  SearchInput,
  ReconcialiationCard,
  Modal,
  Picker,
  Input,
  TextArea,
  Button,
  TransactionTable,
} from "../../components";
import {
  SettlementBarChart,
  TabView,
  TransactionsView,
  MoreIconView,
  AppContainer,
  ReconcileView,
  LoaderModal,
  SuccessModalWithCopy,
  TransactionDetailsModal,
} from "../../atoms";
import {
  colors,
  currencyFormat,
  dateFormat,
  getPathFromPagUrl,
  spacing,
  yearDateFormat,
  routesPath,
  formatAMPM,
  showMessage,
} from "../../utils";
import {
  AllTransactionContainer,
  AllTransactionContent,
  DateContent,
  InfoCountContainer,
  InfoCountContent,
  TabViewContainer,
  TabContentTwo,
  ReconciliationSearchContainer,
  EscalateFormContainer,
  EscalateBtnContainer,
  CustomerNameContainer,
} from "./style";

import {
  getTransactionsRequest,
  getTransactionsReset,
  getReconciliationAccountDetailRequest,
  getReconciliationAccountDetailReset,
  getEscalationAgentsRequest,
  getTransactionByIdRequest,
  createEscalationTicketRequest,
  createEscalationTicketReset,
  getReconciliationAccountRequest,
  getReconciliationAccountReset,
  reconcileAccountRequest,
  reconcileAccountReset,
  exportTransactionByIdToMailRequest,
  exportTransactionByIdToMailReset,
} from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
type Dictionary = {
  [key: string]: any;
};
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

const { RECONCILIATIONUSERDETAILS } = routesPath;

function Reconciliation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedFailedTransaction, setSelectedFailedTransaction] =
    useState<any>({});
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState("");
  const [endDisplayRecordDate, setEndDisplayRecordDate] = useState("");
  const [transactionDataList, setTransactionDataList] = useState<any[]>([]);
  const [transactionFilterParams, setTransactionFilterParams] = useState({
    reference: "",
    type: "",
    status: "",
    start_date: "",
    end_date: "",
  });

  const [userData, setUserData] = useState<Dictionary>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [searchProfileValue, setSearchProfileValue] = useState("");
  const [selectedTransactionActionText, setSelectedTransactionActionText] =
    useState("");
  const [escalationAgentsList, setEscalationAgentsList] = useState<any[]>([]);
  const [moreIsVisible, setMoreIsVisible] = useState(false);
  const [escalateModalVisible, setEscalateModalVisible] = useState(false);
  const [transactionDetailsModalVisible, setTransactionDetailsModalVisible] =
    useState(false);
  const [selectedEscalateTo, setSelectedEscalateTo] = useState("");
  const [selectedPriorityLevel, setSelectedPriorityLevel] = useState("");
  const [transactionByIdData, setTransactionByIdData] = useState<Dictionary>(
    {}
  );
  const [escalateSuccessfulModalVisible, setEscalateSuccessfulModalVisible] =
    useState(false);
  const [escalateSuccessfulData, setEscalateSuccessfulData] =
    useState<Dictionary>({});
  const transactionDetails = "Transaction Details";
  const escalate = "Escalate";
  const moreIconOption = [transactionDetails, escalate];

  // redux state
  const transactionState = useAppSelector((state) => state.getTransactions);
  const { status: getTransactionsStatus } = transactionState;

  const getEscalationAgentsState = useAppSelector(
    (state) => state.getEscalationAgents
  );
  const { status: getEscalationAgentsStatus } = getEscalationAgentsState;

  const getReconciliationAccountState = useAppSelector(
    (state) => state.getReconciliationAccount
  );
  const { status: getReconciliationAccountStatus } =
    getReconciliationAccountState;

  const createEscalationTicketState = useAppSelector(
    (state) => state.createEscalationTicket
  );
  const { status: createEscalationTicketStatus } = createEscalationTicketState;

  const exportTransactionByIdToMailState = useAppSelector(
    (state) => state.exportTransactionByIdToMail
  );
  const { status: exportTransactionByIdToMailStatus } =
    exportTransactionByIdToMailState;

  const getTransactionByIdState = useAppSelector(
    (state) => state.getTransactionById
  );

  const { status: getTransactionByIdStatus } = getTransactionByIdState;

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

  useEffect(() => {
    if (getTransactionByIdStatus === "succeeded") {
      const {
        amount,
        status,
        currency,
        transfer_purpose,
        beneficiary_account_id,
        charge,
        channel,
        created_at,
        user: { name },
      } = getTransactionByIdState.data.transaction;
      const result = {
        amount,
        status,
        currency,
        data: [
          {
            id: 1,
            text: transfer_purpose,
            helper: "Transaction Type",
          },
          {
            id: 2,
            text: name,
            helper: "Wallet Name",
          },
          {
            id: 3,
            text: name,
            helper: "Wallet Name",
          },
          {
            id: 4,
            text: beneficiary_account_id,
            helper: "Beneficiary Account Id",
          },
          {
            id: 5,
            text: `N${charge}`,
            helper: "Charges",
          },
          {
            id: 6,
            text: channel,
            helper: "Channel",
          },
          {
            id: 7,
            text: formatAMPM(created_at),
            helper: "Time",
          },
          {
            id: 8,
            text: dateFormat(created_at),
            helper: "Date",
          },
        ],
      };

      console.log(result, "result");

      setTransactionByIdData(result);
    }
  }, [getTransactionByIdState]);

  useEffect(() => {
    if (createEscalationTicketStatus === "succeeded") {
      setEscalateSuccessfulData(createEscalationTicketState.data.ticket);
      setEscalateSuccessfulModalVisible(true);
      setEscalateSuccessfulData({});
    }
  }, [createEscalationTicketState]);

  useEffect(() => {
    if (exportTransactionByIdToMailStatus === "succeeded") {
      setTransactionDetailsModalVisible(false);
      showMessage({
        type: "success",
        message: exportTransactionByIdToMailState?.data?.message,
      });
      dispatch(exportTransactionByIdToMailReset());
    }
  }, [exportTransactionByIdToMailState]);

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
            phoneNumber: item.user.telephone,
            transId: item.id,
            email: item.user.email,
          });
        }
      );

      const {
        meta: { links },
      } = transactionState?.data?.transactions;

      setTotalPages(links.length - 2);

      setTransactionDataList(updatedList);
    }
  }, [transactionState]);

  useEffect(() => {
    if (getReconciliationAccountStatus === "succeeded") {
      setUserData(getReconciliationAccountState?.data?.user);
    }
  }, [getReconciliationAccountState]);

  useEffect(() => {
    // fetch escalation agents on when escalation is clicked from options
    if (selectedTransactionActionText === escalate) {
      dispatch(getEscalationAgentsRequest({ id: "user" }));
    }
  }, [selectedTransactionActionText]);

  useEffect(() => {
    if (getEscalationAgentsStatus === "succeeded") {
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

  const handleTransactionFilter = () => {
    setTransactionFilterParams({
      reference: searchValue,
      type: "",
      status: "",
      start_date: yearDateFormat(startDisplayRecordDate),
      end_date: yearDateFormat(endDisplayRecordDate),
    });
  };

  const handleSearchUserReconciliation = () => {
    dispatch(getReconciliationAccountRequest({ search: searchProfileValue }));
  };

  // handle different excalation modules
  const handleMoreIconOptions = async (item: string) => {
    if (selectedFailedTransaction.hasOwnProperty("name") && item === escalate) {
      setMoreIsVisible(false);
      setEscalateModalVisible(true);
    }
    if (
      selectedFailedTransaction.hasOwnProperty("name") &&
      item === transactionDetails
    ) {
      setMoreIsVisible(false);
      setTransactionDetailsModalVisible(true);
      dispatch(
        getTransactionByIdRequest({
          transId: selectedFailedTransaction.transId,
        })
      );
    }
  };

  const handleCloseEscalateModal = () => {
    setEscalateModalVisible(false);
    setSelectedTransactionActionText("");
    setSelectedFailedTransaction({});
  };

  const handleCloseEscalateSuccessfulModal = () => {
    setEscalateSuccessfulModalVisible(false);
    setEscalateSuccessfulData({});
    dispatch(createEscalationTicketReset());
    handleCloseEscalateModal();
  };

  return (
    <AppContainer navTitle="RECONCILIATION">
      <div style={{ marginTop: spacing.small }}>
        <H2 semiBold color={colors.primary} left>
          Find Profile
        </H2>
        <ReconciliationSearchContainer>
          <div style={{ width: "70%", marginRight: spacing.small }}>
            <SearchInput
              backgroundColor={"transparent"}
              name="searchProfileValue"
              value={searchProfileValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchProfileValue(e.target.value)
              }
              placeholder="Search by Phone Number or Account Number"
            />
          </div>

          <BorderedText
            onClick={handleSearchUserReconciliation}
            backgroundColor={colors.primary}
            color={colors.white}
            text="Search Records"
          />
        </ReconciliationSearchContainer>

        <div style={{ marginBottom: spacing.large }}>
          {userData.hasOwnProperty("name") && (
            <ReconcialiationCard
              onClick={() => {
                navigate(`${RECONCILIATIONUSERDETAILS}${userData.id}`);
              }}
              name={userData.name}
              kycLevel={userData.kyc_level}
              lastSeen={dateFormat(userData.updated_at)}
            />
          )}
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
                name="SearchValue"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
                placeholder="Search Records"
              />

              <DatePicker selectedDate={setStartDisplayRecordDate} />

              <DatePicker selectedDate={setEndDisplayRecordDate} />

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
            type={"transactions"}
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
          onPageChange={(selectedPage) => {
            setCurrentPage(selectedPage);
          }}
        />

        <Modal
          isModalVisible={escalateModalVisible}
          closeModal={handleCloseEscalateModal}
        >
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
              const { title, description } = values;

              await dispatch(
                createEscalationTicketRequest({
                  title,
                  description,
                  internal_user_id: selectedEscalateTo,
                  priority_level: selectedPriorityLevel,
                  customer_telephone: selectedFailedTransaction?.phoneNumber,
                })
              );

              setSubmitting(false);
            }}
          >
            {(formikProps) => {
              const { handleChange, values, handleSubmit, errors } =
                formikProps;
              return (
                <form onSubmit={handleSubmit}>
                  <EscalateFormContainer>
                    <CustomerNameContainer>
                      <div>dgfjkdkj</div>
                      <Input
                        label="Customer Name"
                        backgroundColor={colors.white}
                        borderColor={colors.grey}
                        placeholder="Enter title"
                        type="text"
                        value={selectedFailedTransaction?.name}
                        name={"name"}
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
                      name={"title"}
                      onChange={handleChange}
                      error={errors.title}
                    />

                    <TextArea
                      label="Title"
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder="Type here..."
                      value={values.description}
                      name={"description"}
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
                        { label: "Low", value: "low" },
                        { label: "Medium", value: "medium" },
                        { label: "High", value: "high" },
                      ]}
                    />
                    <EscalateBtnContainer>
                      <Button
                        type="submit"
                        text="Escalate"
                        disabled={
                          createEscalationTicketStatus === "loading"
                            ? true
                            : false
                        }
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
          text={"Complaint has been escalated with Ticket Id:"}
          copyIconText={"Copy Ticket:Id"}
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
              })
            )
          }
          exportBtnDisabled={
            exportTransactionByIdToMailStatus === "loading" ? true : false
          }
          data={transactionByIdData?.data}
          isLoading={
            getTransactionByIdState.status === "loading" ? true : false
          }
        />

        <MoreIconView
          setSelectedText={setSelectedTransactionActionText}
          isModalVisible={moreIsVisible}
          closeModal={() => setMoreIsVisible(false)}
          options={moreIconOption}
          onClick={(item) => handleMoreIconOptions(item)}
        />

        <LoaderModal
          isModalVisible={
            getTransactionsStatus === "loading" ||
            getReconciliationAccountStatus === "loading"
          }
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default Reconciliation;
