import { memo } from 'react';

import { H1, H2, H4, H6 } from '../../../styles';
import { colors } from '../../../utils';
import { Container } from './style';

export interface RatecardIProps {
  count: number | string;
  title: string;
  titleColor?: string;
  countColor?: string;
  backgroundColor?: string;
}

function Ratecard({ count, title, countColor, titleColor, backgroundColor }: RatecardIProps) {
  return (
    <Container backgroundColor={backgroundColor}>
      <H6 left color={titleColor ? titleColor : colors.primary}>
        {title}
      </H6>
      <H1 left bold color={countColor ? countColor : colors.primary}>
        {count}
      </H1>
    </Container>
  );
}

export default memo(Ratecard);
