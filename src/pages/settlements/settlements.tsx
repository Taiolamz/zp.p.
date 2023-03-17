import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { AppContainer, PageContainer, H1, H2, H3 } from "../../styles";
import {
  Navbar,
  CountInfoCard,
  DatePicker,
  BorderedText,
  Pagination,
  SearchInput,
} from "../../components";
import { SettlementBarChart, TabView, TransactionsView } from "../../atoms";
import { colors, currencyFormat, spacing } from "../../utils";
import {
  AllTransactionContainer,
  AllTransactionContent,
  DateContent,
  InfoCountContainer,
  InfoCountContent,
  TabViewContainer,
  TabContentTwo,
} from "./style";

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
  { id: 1, isSelected: true, text: "Failed Transactions" },
  { id: 2, isSelected: false, text: "Bills History" },
  { id: 3, isSelected: false, text: "Cash Request History" },
];

const transactionData = [
  {
    id: 1,
    tid: "CRIDD",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "Allen Kardic",
  },
  {
    id: 2,
    tid: "CRIDD",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "James Brown",
  },
  {
    id: 3,
    tid: "CRIDD",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "Enoch Yakubu",
  },
];

const transactionDataHeader = {
  id: "",
  name: "Customer",
  tid: "Transaction ID",
  amount: "Amount",
  type: "Transaction Type",
  status: "Failure Reason",
  time: "Time",
};

const inflowData = [1000, 90, 100, 800, 500, 100, 900, 70, 80, 100, 800, 700];
const outflowData = [100, 10, 20, 80, 100, 800, 700, 800, 90, 100, 800, 500];
const profitData = [90, 50, 100, 91, 68, 100, 45, 70, 80, 30, 800, 50];
const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function Settlements() {
  const [transactionStartDate, setTransactionStartDate] = useState("");
  const [transactionEndDate, setTransactionEndDate] = useState("");
  const [displayRecordDate, setDisplayRecordDate] = useState("");
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
  const [barChartSelectedText, setBarChartSelectedText] = useState("All Data");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const totalPages = 5;

  return (
    <AppContainer>
      <Navbar title='SETTLEMENTS' />
      <PageContainer>
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

          {tabViewSelectedIndex === 1 ? (
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

              <BorderedText
                backgroundColor={colors.primary}
                color={colors.white}
                icon={<FiDownload color={colors.white} size={15} />}
                text='Download records'
              />
            </TabContentTwo>
          ) : (
            <TabContentTwo>
              <DatePicker selectedDate={setDisplayRecordDate} />
              <BorderedText
                backgroundColor={colors.primary}
                color={colors.white}
                text='Display Records'
              />
            </TabContentTwo>
          )}
        </TabViewContainer>

        <TransactionsView
          type={""}
          headerData={transactionDataHeader}
          header={true}
          data={transactionData}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(selectedPage) => {
            setCurrentPage(selectedPage);
          }}
        />
      </PageContainer>
    </AppContainer>
  );
}

export default Settlements;
