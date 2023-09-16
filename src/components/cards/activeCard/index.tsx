import { memo } from 'react';

import { H1, H2, H4, H6 } from '../../../styles';
import { colors } from '../../../utils';
import { Container } from './style';

export interface ActivecardIProps {
  count: number | string;
  title: string;
  color?: string;
  backgroundColor?: string;
}

function Activecard({ count, title, color, backgroundColor }: ActivecardIProps) {
  return (
    <Container backgroundColor={backgroundColor}>
      <H6 left color={title === 'ACTIVE' ? colors.green : colors.red}>
        {title}
      </H6>
      <H6 left semiBold color={color ? color : colors.greyVariantFour}>
        {count}
      </H6>
    </Container>
  );
}

export default memo(Activecard);
