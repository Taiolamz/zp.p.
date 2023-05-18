import { memo } from 'react';

import { H1, H4 } from '../../../styles';
import { colors } from '../../../utils';
import { Container } from './style';

export interface CountInfoCardIProps {
  id?: number;
  isSelected?: boolean;
  count: number | string;
  title: string;
  helper?: string;
  color?: string;
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
  onClick,
}: IProps) {
  return (
    <Container isSelected={isSelected} onClick={onClick}>
      <H4 left color={colors.grey}>
        {title}
      </H4>
      <H1 left bold color={color ? color : colors.primary}>
        {count}
      </H1>
      <H4 left color={colors.grey}>
        {helper ? helper : 'Total Records'}
      </H4>
    </Container>
  );
}

export default memo(CountInfoCard);
