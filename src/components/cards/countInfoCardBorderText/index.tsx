import { memo } from 'react';

import { H1, H2, H3, H4, HB } from '../../../styles';
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
  titleColor?: string
}

function CountInfoCardBorderText({
  count,
  title,
  color,
  backgroundColor,
  borderText,
  borderTextColor,
  titleColor
}: CountInfoCardBorderTextIProps) {
  return (
    <Container backgroundColor={backgroundColor} borderTextColor={borderTextColor}>
      <H4 left color={titleColor ? titleColor : colors.primary}>
        {title}
      </H4>
      <Bottom>
        <HB left bold color={color ? color : colors.primary}>
          {count}
        </HB>
        <BottomBorder borderTextColor={borderTextColor}>
          <BorderedText text={borderText} backgroundColor="transparent" color={borderTextColor} />
        </BottomBorder>
      </Bottom>
    </Container>
  );
}

export default memo(CountInfoCardBorderText);
