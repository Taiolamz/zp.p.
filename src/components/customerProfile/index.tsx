// import { ReactElement } from 'react';
import {
  CustomerProfileContainer,
  HeaderContainer,
  Items,
  ItemsContainer,
} from './style';
import { H2, H3, H4 } from '../../styles';
import { colors } from '../../utils';
// import { colors } from '../../utils';
// import { ActivityIndicator } from '../';
interface IProps {
  customerDetails?: any[];
  title?: string;
}

function CustomerProfile({ customerDetails, title }: IProps) {
  return (
    <CustomerProfileContainer>
      <HeaderContainer>
        <H2 left lightBold color={'#6A616F'}>
          {title}
        </H2>
      </HeaderContainer>
      <ItemsContainer>
        {customerDetails?.map((item) => (
          <Items>
            <H4 left color={colors.primary} semiLight>
              {item.helper}
            </H4>
            <H3 left semiLight color={'#6A616F'}>
              {item.text}
            </H3>
          </Items>
        ))}
      </ItemsContainer>
    </CustomerProfileContainer>
  );
}

export default CustomerProfile;
