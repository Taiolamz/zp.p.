import { useState, useEffect } from "react";
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
  ReconciliationSearchContainer,
  EscalateFormContainer,
  EscalateBtnContainer,
  CustomerNameContainer,
} from "./style";

import {
  getTransactionsRequest,
  getTransactionsReset,
} from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

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

function Reconciliation() {
  const dispatch = useAppDispatch();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchProfileValue, setSearchProfileValue] = useState("");
  const totalPages = 5;

  // redux state
  const transactionState = useAppSelector((state) => state.getTransactions);

  const { status: getTransactionsStatus } = transactionState;

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
    <AppContainer navTitle='SETTLEMENTS' navHelper='Reconcialtiona'>
      <div style={{ marginTop: spacing.small }}>
        <H2 semiBold color={colors.primary} left>
          Find Profile
        </H2>
        <ReconciliationSearchContainer>
          <div style={{ width: "70%", marginRight: spacing.small }}>
            <SearchInput
              backgroundColor={"transparent"}
              name='SearchValue'
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
              placeholder='Search by Phone Number or Account Number'
            />
          </div>

          <BorderedText
            onClick={() => {}}
            backgroundColor={colors.primary}
            color={colors.white}
            text='Search Records'
          />
        </ReconciliationSearchContainer>

        <ReconcialiationCard
          name='Waden Warren'
          kycLevel='Level 1'
          lastSeen='20/24'
        />

        <div>
          <ReconcileView
            name='Wade Warren'
            zojaBalance='70000'
            kudaBalance='60000'
            onClick={() => {}}
            data={[
              { text: "+23489000", helper: "Phone Number" },
              { text: "+23489000", helper: "Phone Number" },
              { text: "+23489000", helper: "Phone Number" },
              { text: "+23489000", helper: "Phone Number" },
            ]}
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
      </div>
    </AppContainer>
  );
}

export default Reconciliation;
