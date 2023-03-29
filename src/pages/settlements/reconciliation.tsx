import { useState, useEffect } from "react";
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
} from "../../components";
import {
  SettlementBarChart,
  TabView,
  TransactionsView,
  MoreIconView,
  AppContainer,
  ReconcileView,
} from "../../atoms";
import {
  colors,
  currencyFormat,
  dateFormat,
  getPathFromPagUrl,
  spacing,
  yearDateFormat,
  routesPath,
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
  getReconciliationAccountRequest,
  getReconciliationAccountReset,
  reconcileAccountRequest,
  reconcileAccountReset,
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
  const [searchValue, setSearchValue] = useState("");
  const [searchProfileValue, setSearchProfileValue] = useState("");
  const totalPages = 5;

  // redux state
  const transactionState = useAppSelector((state) => state.getTransactions);
  const { status: getTransactionsStatus } = transactionState;

  const getReconciliationAccountState = useAppSelector(
    (state) => state.getReconciliationAccount
  );
  const { status: getReconciliationAccountStatus } =
    getReconciliationAccountState;

  //   console.log(getReconciliationAccountState, "state");
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

      setTransactionDataList(updatedList);
    }
  }, [transactionState]);

  useEffect(() => {
    if (getReconciliationAccountStatus === "succeeded") {
      console.log(getReconciliationAccountState.data.user, "acount state");
      setUserData(getReconciliationAccountState?.data?.user);
    }
  }, [getReconciliationAccountState]);

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
  return (
    <AppContainer navTitle='RECONCILIATION'>
      <div style={{ marginTop: spacing.small }}>
        <H2 semiBold color={colors.primary} left>
          Find Profile
        </H2>
        <ReconciliationSearchContainer>
          <div style={{ width: "70%", marginRight: spacing.small }}>
            <SearchInput
              backgroundColor={"transparent"}
              name='searchProfileValue'
              value={searchProfileValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchProfileValue(e.target.value)
              }
              placeholder='Search by Phone Number or Account Number'
            />
          </div>

          <BorderedText
            onClick={handleSearchUserReconciliation}
            backgroundColor={colors.primary}
            color={colors.white}
            text='Search Records'
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
      </div>
    </AppContainer>
  );
}

export default Reconciliation;
