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


export interface kycDataIprops {
  title: string
  count: number
}
export interface KycDistributionStatIProps {
  kycLevelData: LevelCardIPropsIProps[];
  pendingVerification: kycDataIprops;
  totalCustomers: kycDataIprops;
}

const KycDistributionStat = ({ kycLevelData, pendingVerification, totalCustomers }: KycDistributionStatIProps) => {
  return (
    <div>
      <Container>
        <H1 left semiBold color={colors.greyVariantFour}>
          KYC Distribution
        </H1>
        <Top>
          <TopItemOne>
            <CountInfoCardNoHelper
              title={totalCustomers.title}
              backgroundColor="transparent"
              color={colors.primary}
              count={totalCustomers.count}
              titleColor={colors.greyVariantSeven}
              titleSmall={true}
            />
          </TopItemOne>
          <CountInfoCardBorderText
            title={pendingVerification.title}
            backgroundColor="transparent"
            color={colors.primary}
            count={pendingVerification.count}
            borderText="Resolve"
            titleColor={colors.greyVariantSeven}
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
