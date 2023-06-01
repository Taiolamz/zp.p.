import { memo, ReactElement } from 'react';
import { Container } from './style';
import { H2, H3, H4, H5 } from '../../styles';
import { colors, currencyFormat, spacing } from '../../utils';

interface IProps {
  title: string;
  count: string;
  backgroundColor?: string;
  color?: string;
  height?: string | number;
  borderRadius?: string | number;
  type?: string;
  countColor?: string;
}

function HorizontalInfoCount({ title, backgroundColor, color, count, countColor, type }: IProps) {
  return (
    <Container backgroundColor={backgroundColor}>
      <H3 semiBold color={color ? color : colors.grey}>
        {title}:
      </H3>

      <H2 bold color={countColor ? countColor : colors.grey}>
        {type === 'money' ? currencyFormat(parseInt(count)) : count}
      </H2>
    </Container>
  );
}

export default memo(HorizontalInfoCount);
