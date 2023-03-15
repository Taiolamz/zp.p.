import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { AppContainer, PageContainer, H1 } from "../../styles";
import {
  Navbar,
  CountInfoCard,
  DatePicker,
  BorderedText,
} from "../../components";
import { SettlementBarChart } from "../../atoms";
import { colors, currencyFormat, spacing } from "../../utils";
import {
  AllTransactionContainer,
  AllTransactionContent,
  DateContent,
  InfoCountContainer,
  InfoCountContent,
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

const inflowData = [1000, 90, 100, 800, 500, 100, 900, 70, 80, 100, 800, 700];
const outflowData = [100, 10, 20, 80, 100, 800, 700, 800, 90, 100, 800, 500];
const profitData = [90, 50, 100, 91, 68, 100, 45, 70, 80, 30, 800, 50];
const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function Settlements() {
  const [transactionStartDate, setTransactionStartDate] = useState("");
  const [transactionEndDate, setTransactionEndDate] = useState("");
  const [barChartSelectedText, setBarChartSelectedText] = useState("All Data");

  return (
    <AppContainer>
      <Navbar title='SETTLEMENTS' />
      <PageContainer>
        {/* <CountInfo data={data} /> */}
        <AllTransactionContainer>
          <H1>All Transaction</H1>
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
            // inflowData={inflowData}
            // outflowData={outflowData}
            // profitData={profitData}

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
      </PageContainer>
    </AppContainer>
  );
}

export default Settlements;
