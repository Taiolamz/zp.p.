import { AppContainer } from "../../atoms";
import { CountInfoCard } from "../../components";
import { colors, currencyFormat } from "../../utils";
function Dashboard() {
  return (
    <AppContainer navTitle="DASHBOARD">
      <div>
        <CountInfoCard
          title="Inflow"
          helper="Total Income"
          background="transparent"
          color={colors.blueVariantOne}
          count={currencyFormat(19990560)}
          // shadow="none"
        />
        <CountInfoCard
          title="Outflow"
          helper="Total Withdrawals"
          background="transparent"
          color={colors.orange}
          count={currencyFormat(10590000)}
        />
        <CountInfoCard
          title="Revenue"
          helper="Tansaction Profit"
          background="transparent"
          color={colors.green}
          count={currencyFormat(1450000)}
        />
        <CountInfoCard
          title="Current In-App Balance"
          helper="Transaction Aggregate"
          background="transparent"
          color={colors.greenVariantOne}
          count={currencyFormat(9400000)}
        />
      </div>
    </AppContainer>
  );
}

export default Dashboard;
