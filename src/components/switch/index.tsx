import Switch from 'react-switch';
import { memo } from 'react';
import { Container, CustomContainer } from './style';
import { H3 } from '../../styles';
import { spacing, colors, fontWeight } from '../../utils';

interface IProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  custom?: boolean;
  borderRadius?: boolean;
  paddingVertical?: number | string;
  backgroundColor?: string;
  borderColor?: string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  marginBottom?: number | string;
  labelColor?: string;
  labelTwo?: string;
  labelRightSpace?: boolean;
}
function RSwitch({
  label,
  checked,
  onChange,
  custom,
  borderRadius,
  paddingVertical,
  backgroundColor,
  borderColor,
  paddingLeft,
  paddingRight,
  marginBottom,
  labelColor,
  labelTwo,
  labelRightSpace,
}: IProps) {
  if (custom) {
    return (
      <div>
        <CustomContainer
          borderRadius={borderRadius}
          paddingVertical={paddingVertical}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          marginBottom={marginBottom}>
          <H3
            style={{
              marginLeft: labelRightSpace ? 0 : spacing.xsmall,
              fontWeight: labelTwo ? fontWeight.semiBold : fontWeight.light,
              marginRight: labelRightSpace ? spacing.small : 0,
            }}
            color={labelColor ? labelColor : colors.greyDark}>
            {label}
          </H3>
          {labelTwo && labelTwo?.length > 3 ? (
            <H3
              style={{ marginLeft: spacing.xsmall, fontWeight: labelTwo ? fontWeight.semiBold : fontWeight.light }}
              color={labelColor ? labelColor : colors.greyDark}>
              {labelTwo}
            </H3>
          ) : (
            <Switch onChange={() => onChange(!checked)} checked={checked} uncheckedIcon={false} checkedIcon={false} />
          )}
        </CustomContainer>
      </div>
    );
  } else {
    return (
      <label>
        <Container>
          <Switch onChange={onChange} checked={checked} uncheckedIcon={false} checkedIcon={false} />
          <H3 style={{ marginLeft: spacing.xsmall }} color={colors.primary}>
            {label}
          </H3>
        </Container>
      </label>
    );
  }
}

export default memo(RSwitch);
