import { AppContainer, PageContainer } from "../../styles";
import { Navbar, CountInfoCard, DatePicker } from "../../components";
// import { CountInfo } from "../../atoms";
import { colors, currencyFormat } from "../../utils";
import { InfoCountContainer, InfoCountContent } from "./style";
import { useState } from "react";

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
function Settlements() {
  const [transactionStartDate, setTransactionStartDate] = useState("");
  const [transactionEndDate, setTransactionEndDate] = useState("");
  return (
    <AppContainer>
      <Navbar title='SETTLEMENTS' />
      <PageContainer>
        {/* <CountInfo data={data} /> */}
        <InfoCountContainer>
          {data.map((item: any) => (
            <InfoCountContent>
              <CountInfoCard
                title={item.title}
                helper={item.helper}
                color={item.color}
                count={currencyFormat(item.count)}
              />
            </InfoCountContent>
          ))}

          <div>
            <DatePicker selectedDate={setTransactionStartDate} />
            fm,dm,fgj
          </div>
        </InfoCountContainer>
      </PageContainer>
    </AppContainer>
  );
}

export default Settlements;
