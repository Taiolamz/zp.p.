import {
  Activecard,
  CountInfoCard,
  CountInfoCardBorderText,
  CountInfoCardNoHelper,
  LevelCard,
  Ratecard,
} from '../../components';
import { LevelCardIPropsIProps } from '../../components/cards/levelCard';
import { H1 } from '../../styles';
import { colors, currencyFormat } from '../../utils';
import { Bottom, Container, Top, TopItemOne } from './style';

export interface KycDistributionStatIProps {
  kycLevelData: LevelCardIPropsIProps[];
}

const KycDistributionStat = ({ kycLevelData }: KycDistributionStatIProps) => {
  return (
    <div>
      <Container>
        <H1 left semiBold color={colors.greyVariantFour}>
          KYC Distribution
        </H1>
        <Top>
          <TopItemOne>
            <CountInfoCardNoHelper
              title="Total Customers"
              backgroundColor="transparent"
              color={colors.primary}
              count={'11,234'}
            />
          </TopItemOne>
          <CountInfoCardBorderText
            title="Pending Verification"
            backgroundColor="transparent"
            color={colors.primary}
            count={'705'}
            borderText="Resolve"
            borderTextColor={colors.yellow}
          />
        </Top>
        <Bottom>
          <LevelCard data={kycLevelData} />
        </Bottom>
      </Container>
    </div>
  );
};

export default KycDistributionStat;
