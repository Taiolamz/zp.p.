import { memo } from 'react';

import { H1, H2, H4, HB } from '../../../styles';
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
  titleColor?: string;
  titleWeight?: string;
  titleSmall?: boolean;
}

function CountInfoCardNoHelper({
  isSelected,
  count,
  title,
  color,
  titleColor,
  backgroundColor,
  type,
  titleWeight,
  titleSmall
}: CountInfoCardNoHelperIProps) {
  console.log(titleWeight)
  return (
    <Container  backgroundColor={backgroundColor} isSelected={isSelected}>
      {type === 'small' || titleSmall ? (
        <H4 font-weight={titleWeight ? titleWeight : ""} left color={titleColor ? titleColor : colors.primary}>
          {title}
        </H4>
      ) : (
        <H2 font-weight={titleWeight ? titleWeight : ""} left color={titleColor ? titleColor : colors.primary}>
          {title}
        </H2>
      )}
      {type === 'small' ? (
        <H2 left bold color={color ? color : colors.primary}>
          {count}
        </H2>
      ) : (
        <HB left bold color={color ? color : colors.primary}>
          {count}
        </HB>
      )}
    </Container>
  );
}

export default memo(CountInfoCardNoHelper);
