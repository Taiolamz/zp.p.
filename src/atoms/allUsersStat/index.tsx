import { Activecard, CountInfoCard, CountInfoCardNoHelper, Ratecard } from '../../components';
import { colors, currencyFormat, fontWeight } from '../../utils';
import { Bottom, Container, Top } from './style';

export interface allUsersDataIpropsIprops {
  usersCount: number;
  conversionRate: string;
}

export interface activeDataIpropsIprops {
  id: number;
  title: string;
  count: number;
}

export interface allUsersDataIprops {
  allUsersData: allUsersDataIpropsIprops;
  activeData: activeDataIpropsIprops[];
  onClick?: () => void;
}

const AllUsersStat = ({ allUsersData, activeData, onClick }: allUsersDataIprops) => {
  return (
    <div>
      <Container onClick={onClick}>
        <Top>
          <CountInfoCardNoHelper
            title="All Users"
            backgroundColor="transparent"
            color={colors.primary}
            titleColor={colors.greyVariantOne}
            count={allUsersData.usersCount}
            titleWeight={fontWeight.lightBold}
            onClick={onClick}
          />
          <Ratecard
            count={allUsersData.conversionRate}
            title="CONVERSION RATE"
            backgroundColor={colors.greyVariantFive}
            titleColor={colors.green}
            countColor={colors.primary}
          />
        </Top>
        <Bottom>
          {activeData.map(item => {
            return <Activecard key={item.id} count={item.count} title={item.title} />;
          })}
        </Bottom>
      </Container>
    </div>
  );
};

export default AllUsersStat;
