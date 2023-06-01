import { memo } from 'react';

import { H1, H2, H4 } from '../../../styles';
import { colors } from '../../../utils';
import { Bottom, BottomBorder, Container } from './style';
import { BorderedText } from '../../index';

export interface CountInfoCardBorderTextIProps {
  count: number | string;
  title: string;
  color?: string;
  backgroundColor?: string;
  borderText: string;
  borderTextColor?: string;
}

function CountInfoCardBorderText({
  count,
  title,
  color,
  backgroundColor,
  borderText,
  borderTextColor,
}: CountInfoCardBorderTextIProps) {
  return (
    <Container backgroundColor={backgroundColor} borderTextColor={borderTextColor}>
      <H2 left color={colors.primary}>
        {title}
      </H2>
      <Bottom>
        <H1 left bold color={color ? color : colors.primary}>
          {count}
        </H1>
        <BottomBorder borderTextColor={borderTextColor}>
          <BorderedText text={borderText} backgroundColor="transparent" color={borderTextColor} />
        </BottomBorder>
      </Bottom>
    </Container>
  );
}

export default memo(CountInfoCardBorderText);
