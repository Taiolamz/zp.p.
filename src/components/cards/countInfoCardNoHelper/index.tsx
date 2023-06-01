import { memo } from 'react';

import { H1, H2, H4 } from '../../../styles';
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
  type?: string;
}

function CountInfoCardNoHelper({
  isSelected,
  count,
  title,
  color,
  backgroundColor,
  type,
}: CountInfoCardNoHelperIProps) {
  return (
    <Container backgroundColor={backgroundColor} isSelected={isSelected}>
      {type === 'small' ? (
        <H4 left color={colors.primary}>
          {title}
        </H4>
      ) : (
        <H2 left color={colors.primary}>
          {title}
        </H2>
      )}
      {type === 'small' ? (
        <H2 left bold color={color ? color : colors.primary}>
          {count}
        </H2>
      ) : (
        <H1 left bold color={color ? color : colors.primary}>
          {count}
        </H1>
      )}
    </Container>
  );
}

export default memo(CountInfoCardNoHelper);
