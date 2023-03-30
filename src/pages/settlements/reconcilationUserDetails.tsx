import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  PerformActionModal,
  SuccessActionModal,
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

const { RECONCILIATION } = routesPath;

function ReconcilationUserDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
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

  const getReconciliationAccountDetailState = useAppSelector(
    (state) => state.getReconciliationAccountDetail
  );
  const { status: getReconciliationAccountDetailStatus } =
    getReconciliationAccountDetailState;

  const reconcileAccountState = useAppSelector(
    (state) => state.reconcileAccount
  );
  const { status: reconcileAccountStatus } = reconcileAccountState;

  // api
  useEffect(() => {
    dispatch(getTransactionsRequest(transactionFilterParams));
  }, [transactionFilterParams]);

  useEffect(() => {
    dispatch(getReconciliationAccountDetailRequest({ userId: id }));
  }, []);

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
    if (getReconciliationAccountDetailStatus === "succeeded") {
      setUserData(getReconciliationAccountDetailState?.data);
    }
  }, [getReconciliationAccountDetailState]);

  const handleTransactionFilter = () => {
    setTransactionFilterParams({
      reference: searchValue,
      type: "",
      status: "",
      start_date: yearDateFormat(startDisplayRecordDate),
      end_date: yearDateFormat(endDisplayRecordDate),
    });
  };

  const handleReconcileBalance = () => {
    dispatch(
      reconcileAccountRequest({
        account_number: userData?.user?.account?.number,
      })
    );
  };

  useEffect(() => {
    if (reconcileAccountStatus === "succeeded") {
      console.log(reconcileAccountState.data, "reconcileAccount");
    }
  }, [reconcileAccountState]);

  // console.log(userData, "userData");

  return (
    <AppContainer
      goBack={() => navigate(RECONCILIATION)}
      navTitle='RECONCILIATION'
      navHelper='USER PROFILE'>
      <div style={{ marginTop: spacing.small }}>
        <div>
          <ReconcileView
            name={userData?.user?.name}
            zojaBalance={userData?.user?.account?.available_balance}
            kudaBalance='60000'
            onClick={handleReconcileBalance}
            data={[
              { text: userData?.user?.telephone, helper: "Phone Number" },
              { text: userData?.user?.email, helper: "Email" },
              { text: "+23489000", helper: "BVN" },
              {
                text: userData?.user?.account?.number,
                helper: "Account Number",
              },
              { text: userData?.user?.location, helper: "Address" },
              { text: userData?.user?.kyc_level, helper: "KYC" },
              {
                text: dateFormat(userData?.user?.updated_at),
                helper: "Last Login",
              },
              {
                text: dateFormat(userData?.user?.created_at),
                helper: "Date of Onboarding",
              },
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

        <PerformActionModal
          isModalVisible={false}
          actionClick={() => {}}
          closeModal={() => {}}
          actionText='Proceed'
          title='You Are About To Perform A Reconciliation'
          isLoading={true}
          text='This will revert the account balance of the user on ZojaPay to match their account balance on KUDA'
        />

        <SuccessActionModal
          isModalVisible={true}
          actionText='Finish'
          closeModal={() => {}}
          title='Reconciliation Successful'
          text='User will be sent a notification informing them of the reversal.'
        />
      </div>
    </AppContainer>
  );
}

export default ReconcilationUserDetails;
