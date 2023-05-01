import {
  Container,
  TopContent,
  TopContentItem,
  BottomContent,
  BottomContentMainText,
  BottomContentHelperText,
} from "./style";
import { BorderedText } from "../../components";
import { H1, H3 } from "../../styles";
import { colors, currencyFormat, spacing } from "../../utils";
export interface MoreViewIProps {
  profileImg?: string;
  name: string;
  data: any[];
  zojaBalance: string;
  kudaBalance: string;
}

interface IProps extends MoreViewIProps {
  onClick?: () => void;
}

function ReconcileView({
  profileImg,
  name,
  data,
  zojaBalance,
  kudaBalance,
  onClick,
}: IProps) {
  return (
    <Container>
      <TopContent>
        <TopContentItem>
          <H1 color={colors.primary}>{name}</H1>
        </TopContentItem>
        <TopContentItem>
          <H1 semiBold color={colors.primary}>
            Zojapay Bal
          </H1>
          <div
            style={{
              marginLeft: spacing.xxsmall,
              marginRight: spacing.xxsmall,
            }}>
            :
          </div>
          <H1 bold color={colors.primary}>
            {currencyFormat(parseFloat(zojaBalance), true, "N")}
          </H1>
        </TopContentItem>
        <TopContentItem>
          <H1 semiBold color={colors.primary}>
            Kuda Bal
          </H1>
          <div
            style={{
              marginLeft: spacing.xxsmall,
              marginRight: spacing.xxsmall,
            }}>
            :
          </div>
          <H1 bold color={colors.primary}>
            {currencyFormat(parseFloat(kudaBalance), true, "N")}
          </H1>
        </TopContentItem>
        <BorderedText
          text='Reconcile Balance'
          onClick={onClick}
          backgroundColor={colors.primary}
          color={colors.white}
        />
      </TopContent>

      {data.map((item, i) => (
        <BottomContent key={i}>
          <BottomContentHelperText>
            <H3 left color={colors.greyVariantOne}>
              {item.helper}
            </H3>
          </BottomContentHelperText>
          <div
            style={{
              width: "5%",
              marginLeft: spacing.xxsmall,
              marginRight: spacing.xxsmall,
            }}>
            :
          </div>
          <BottomContentMainText>
            <H3 left color={colors.greyVariantOne}>
              {item.text}
            </H3>
          </BottomContentMainText>
        </BottomContent>
      ))}
    </Container>
  );
}

export default ReconcileView;
