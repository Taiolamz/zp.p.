import {
  CustomerProfileContainer,
  HeaderContainer,
  Items,
  ItemsContainer,
} from "./style";
import { H2, H3, H4 } from "../../styles";
import { colors } from "../../utils";

export interface CustomerProfileIProps {
  id: number;
  helper: string;
  text: string;
}

interface IProps {
  data?: CustomerProfileIProps[];
  title?: string;
}

function CustomerProfile({ data, title }: IProps) {
  return (
    <CustomerProfileContainer>
      <HeaderContainer>
        <H2 left lightBold color={"#6A616F"}>
          {title}
        </H2>
      </HeaderContainer>
      <ItemsContainer>
        {data?.map((item: CustomerProfileIProps) => (
          <Items key={item.id}>
            <H4 left color={colors.primary} semiLight>
              {item.helper}
            </H4>
            <H3 left semiLight color={"#6A616F"}>
              {item.text}
            </H3>
          </Items>
        ))}
      </ItemsContainer>
    </CustomerProfileContainer>
  );
}

export default CustomerProfile;
