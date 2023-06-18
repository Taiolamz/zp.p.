import React, { useState, useEffect } from 'react';

import { CustomTimeInputWrapper } from './style';
import { StepperInput } from '../../components';

export interface CustomTimeInputIProps {
  setTimeValue: any;
}

const CustomTimeInput = ({ setTimeValue }: any) => {
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    setTimeValue(`${hour}:${minutes}`);
  }, [hour, minutes, setTimeValue]);

  return (
    <CustomTimeInputWrapper>
      <StepperInput maxValue={23} setValue={setHour} />
      <div>:</div>
      <StepperInput maxValue={59} setValue={setMinutes} />
    </CustomTimeInputWrapper>
  );
};

export default CustomTimeInput;
