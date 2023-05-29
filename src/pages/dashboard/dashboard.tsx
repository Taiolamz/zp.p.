import { Activecard, CountInfoCard, CountInfoCardNoHelper } from '../../components';
import { colors, currencyFormat } from '../../utils';
import { AppContainer, AllUsersStat, KycDistributionStat, TransactionVolume, CustomerGrowth } from '../../atoms';
import {
  CardsContainer,
  ChartsContainer,
  Container,
  FourBoxContainer,
  StatCount,
  TwoBoxActive,
  TwoBoxContainerBottom,
  TwoBoxContainerTop,
  TwoBoxItemActive,
  TwoBoxItemBottom,
  TwoBoxItemTop,
} from './style';
import { kycLevelData, transactionVolumeChartData } from './data';

function Dashboard() {
  return (
    <AppContainer navTitle="DASHBOARD">
      <Container>
        <StatCount>
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
        </StatCount>
        <CardsContainer>
          <AllUsersStat />
          <KycDistributionStat kycLevelData={kycLevelData} />
          <FourBoxContainer>
            <TwoBoxContainerTop>
              <TwoBoxItemTop>
                <CountInfoCardNoHelper
                  title="Refferals"
                  // backgroundColor={colors.white}
                  color={colors.primary}
                  count={'4,324'}
                  type={'small'}
                />
              </TwoBoxItemTop>
              <TwoBoxItemTop>
                <CountInfoCardNoHelper
                  title="Active Cash Requests"
                  // backgroundColor={colors.white}
                  color={colors.primary}
                  count={'4,324'}
                  type={'small'}
                />
              </TwoBoxItemTop>
            </TwoBoxContainerTop>
            <TwoBoxContainerBottom>
              <TwoBoxItemBottom>
                <CountInfoCardNoHelper
                  title="Complaints"
                  backgroundColor={colors.white}
                  color={colors.primary}
                  count={'345'}
                />
              </TwoBoxItemBottom>
              <TwoBoxItemActive>
                <CountInfoCardNoHelper
                  title="Agents"
                  backgroundColor={colors.white}
                  color={colors.primary}
                  count={'345'}
                />
                <TwoBoxActive>
                  <Activecard count="7900" title="ACTIVE" />
                  <Activecard count="1400" title="INACTIVE" />
                </TwoBoxActive>
              </TwoBoxItemActive>
            </TwoBoxContainerBottom>
          </FourBoxContainer>
        </CardsContainer>
        <ChartsContainer>
          <TransactionVolume transactionVolumeChartData={transactionVolumeChartData} />
          <CustomerGrowth />
        </ChartsContainer>
      </Container>
    </AppContainer>
  );
}

export default Dashboard;
