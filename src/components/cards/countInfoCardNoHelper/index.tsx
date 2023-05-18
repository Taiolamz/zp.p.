import { memo } from 'react';

import { H1, H4 } from '../../../styles';
import { colors } from '../../../utils';
import { Container } from './style';

export interface CountInfoCardNoHelperIProps {
  id?: number;
  isSelected?: boolean;
  count: number | string;
  title: string;
  helper?: string;
  color?: string;
  backgroundColor?: string;
}

interface IProps extends CountInfoCardNoHelperIProps {
  onClick?: () => void;
}
function CountInfoCardNoHelper({
  isSelected,
  count,
  title,
  color,
  helper,
  backgroundColor,
  onClick,
}: IProps) {
  return (
    <Container
      backgroundColor={backgroundColor}
      isSelected={isSelected}
      onClick={onClick}
    >
      <H4 color={colors.primary}>{title}</H4>
      <H1 bold color={color ? color : colors.primary}>
        {count}
      </H1>
    </Container>
  );
}

export default memo(CountInfoCardNoHelper);
