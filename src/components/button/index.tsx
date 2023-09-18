import { memo } from 'react';
import { ReactElement } from 'react';
import { Container, ButtonIcon, DisabledContainer } from './style';
import { H2 } from '../../styles';
import { colors } from '../../utils';
import { ActivityIndicator } from '../';
interface IProps {
  text: string;
  icon?: ReactElement;
  onClick?: () => void | null;
  disabled?: boolean;
  type?: 'button' | 'submit';
  secondary?: boolean;
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
  formIsNotValid?: boolean;
}

function Button({
  text,
  icon,
  onClick,
  type = 'button',
  secondary = false,
  disabled = false,
  borderColor,
  color,
  backgroundColor = colors.primary,
  boxShadow,
  formIsNotValid,
}: IProps) {
  return (
    <Container
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      secondary={secondary}
      boxShadow={boxShadow}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {icon && <ButtonIcon color={color}>{icon}</ButtonIcon>}
      {!disabled && (
        <H2 color={color ? color : icon ? colors.primary : colors.white} semiBold>
          {text}
        </H2>
      )}
      {disabled && (
        <DisabledContainer>
          <ActivityIndicator />
        </DisabledContainer>
      )}
    </Container>
  );
}

export default memo(Button);
