import { Activecard, CountInfoCard, CountInfoCardNoHelper, Ratecard } from '../../components';
import { colors, currencyFormat } from '../../utils';
import { Bottom, Container, Top } from './style';

const AllUsersStat = () => {
  return (
    <div>
      <Container>
        <Top>
          <CountInfoCardNoHelper
            title="All Users"
            backgroundColor="transparent"
            color={colors.primary}
            count={'93000'}
          />
          <Ratecard
            count="77%"
            title="CONVERSION RATE"
            backgroundColor={colors.greyVariantFive}
            titleColor={colors.green}
            countColor={colors.primary}
          />
        </Top>
        <Bottom>
          <Activecard count="7900" title="ACTIVE" />
          <Activecard count="1400" title="INACTIVE" />
        </Bottom>
      </Container>
    </div>
  );
};

export default AllUsersStat;
