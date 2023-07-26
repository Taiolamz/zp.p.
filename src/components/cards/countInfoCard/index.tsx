import { memo } from 'react';

import { HB, H1, H4 } from '../../../styles';
import { colors } from '../../../utils';
import { Container } from './style';

export interface CountInfoCardIProps {
  id?: number;
  isSelected?: boolean;
  count: number | string;
  title: string;
  helper?: string;
  color?: string;
  background?: string;
  shadow?: string;
}

interface IProps extends CountInfoCardIProps {
  onClick?: () => void;
}
function CountInfoCard({
  isSelected,
  count,
  title,
  color,
  helper,
  background = colors.white,
  shadow,
  onClick,
}: IProps) {
  return (
    <Container background={background} isSelected={isSelected} onClick={onClick} shadow={shadow}>
      <H4 left color={colors.grey}>
        {title}
      </H4>
      <HB style={{ fontFamily: 'Poppins', fontWeight: '700' }} left bold color={color ? color : colors.primary}>
        {count}
      </HB>
      <H4 left color={colors.grey}>
        {helper ? helper : 'Total Records'}
      </H4>
    </Container>
  );
}

export default memo(CountInfoCard);
