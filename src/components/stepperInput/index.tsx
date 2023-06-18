import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { StepperButton, StepperNumber, StepperWrapper } from './style';
import { colors } from '../../utils';

export interface StepperInputIProps {
  maxValue: number;
  setValue: any;
}

const StepperInput = ({ maxValue, setValue }: any) => {
  const [time, setTime] = useState<any>(0);

  const handleChange = (arithmetic: string) => {
    if (arithmetic === 'minus') {
      setTime((prevState: any) => prevState - 1);
    } else {
      setTime((prevState: any) => prevState + 1);
    }
  };

  useEffect(() => {
    setValue(time);
  }, [time, setValue]);

  const disabled = (number: number) => (time === number ? true : false);
  return (
    <StepperWrapper>
      <StepperButton type="button" onClick={() => handleChange('plus')} disabled={disabled(maxValue)}>
        <MdKeyboardArrowUp color={time === maxValue ? colors.greyVariantTwo : colors.greyVariantFour} size={25} />
      </StepperButton>
      <StepperNumber type="number" max={59} min={0} value={time} />
      <StepperButton type="button" onClick={() => handleChange('minus')} disabled={disabled(0)}>
        <MdKeyboardArrowDown color={time === 0 ? colors.greyVariantTwo : colors.greyVariantFour} size={25} />
      </StepperButton>
    </StepperWrapper>
  );
};

export default StepperInput;
