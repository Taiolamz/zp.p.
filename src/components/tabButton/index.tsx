import { memo } from 'react';
import { Container } from './style';
import { H4 } from '../../styles';
import { colors } from '../../utils';

export interface TabIProps {
  id?: number;
  paddingRight?: boolean;
  isSelected: boolean;
  text: string;
  type?: string;
  tabViewSelectedIndex?: number;
  onClick?: () => void;
}

function TabButton({
  text,
  isSelected,
  onClick,
  paddingRight,
  type,
  tabViewSelectedIndex,
}: TabIProps) {
  const color = isSelected ? colors.white : colors.primary;

  return (
    <Container
      style={{
        backgroundColor: isSelected ? colors.purpleVariantThree : 'transparent',
        border: isSelected ? '1px solid rgba(0, 0, 0, 0.2)' : '',
      }}
      isSelected
      paddingRight={paddingRight}
      onClick={onClick}
    >
      <H4 semiBold color={color}>
        {text}
      </H4>
    </Container>
  );
}

export default memo(TabButton);
