import { Activecard, CountInfoCard, CountInfoCardNoHelper } from '../../components';
import { colors, currencyFormat, routesPath } from '../../utils';
import { AppContainer, AllUsersStat, KycDistributionStat, TransactionVolume, CustomerGrowth } from '../../atoms';
import {
  CardsContainer,
  ChartsContainer,
  Container,
  FourBoxContainer,
  StatCount,
  TransactionVolumeChart,
  TwoBoxActive,
  TwoBoxContainerItem,
  TwoBoxItemActive,
  TwoBoxItemBottom,
  TwoBoxItemTop,
} from './style';
import {
  activeCash,
  activeData,
  agents,
  allUsersData,
  complaints,
  customersCount,
  dashboardMainCountData,
  kycLevelData,
  pendingVerification,
  refferals,
  totalCustomers,
  transactionVolumeChartData,
} from './data';
import { Link, useNavigate } from 'react-router-dom';
const { SETTLEMENTS, USERS, KYC, SUPPORT } = routesPath;

export interface dashboardMainCountDataIProps {
  id: number;
  title: string;
  count: number;
  helperText: string;
  backgroundColor: string;
  color: string;
}

export interface fourBoxesIProps {
  title: string;
  color: string;
  count: number;
  type: string;
  titleColor: string;
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <AppContainer navTitle="DASHBOARD">
      <Container>
        <StatCount>
          {dashboardMainCountData.map(item => {
            return (
              <>
                <CountInfoCard
                  key={item.id}
                  title={item.title}
                  helper={item.helperText}
                  background={item.backgroundColor}
                  color={item.color}
                  count={currencyFormat(item.count)}
                  // shadow="none"
                  onClick={() => navigate(SETTLEMENTS)}
                />
              </>
            );
          })}
        </StatCount>
        <CardsContainer>
          <AllUsersStat allUsersData={allUsersData} activeData={activeData} onClick={() => navigate(USERS)} />
          <KycDistributionStat
            kycLevelData={kycLevelData}
            totalCustomers={totalCustomers}
            pendingVerification={pendingVerification}
            onClick={() => navigate(KYC)}
          />
          <TwoBoxContainerItem>
            <TwoBoxItemTop>
              <CountInfoCardNoHelper
                title={refferals.title}
                color={refferals.color}
                count={refferals.count}
                type={refferals.type}
                titleColor={refferals.titleColor}
              />
            </TwoBoxItemTop>
            <TwoBoxItemBottom onClick={() => navigate(SUPPORT)}>
              <CountInfoCardNoHelper
                title={complaints.title}
                color={complaints.color}
                count={complaints.count}
                titleColor={complaints.titleColor}
              />
            </TwoBoxItemBottom>
          </TwoBoxContainerItem>
          <TwoBoxContainerItem>
            <TwoBoxItemTop>
              <CountInfoCardNoHelper
                title={activeCash.title}
                color={activeCash.color}
                count={activeCash.count}
                type={activeCash.type}
                titleColor={activeCash.titleColor}
              />
            </TwoBoxItemTop>
            <TwoBoxItemActive onClick={() => navigate(SUPPORT)}>
              <CountInfoCardNoHelper
                title={agents.title}
                color={agents.color}
                count={agents.count}
                titleColor={agents.titleColor}
              />
              <TwoBoxActive>
                {activeData.map(item => {
                  return <Activecard key={item.id} count={item.count} title={item.title} />;
                })}
              </TwoBoxActive>
            </TwoBoxItemActive>
          </TwoBoxContainerItem>
        </CardsContainer>
        <ChartsContainer>
          <TransactionVolumeChart>
            <Link to={'/transactioninformation'}>
              <TransactionVolume transactionVolumeChartData={transactionVolumeChartData} />
            </Link>
          </TransactionVolumeChart>
          <CustomerGrowth customersCount={customersCount} />
        </ChartsContainer>
      </Container>
    </AppContainer>
  );
}

export default Dashboard;
