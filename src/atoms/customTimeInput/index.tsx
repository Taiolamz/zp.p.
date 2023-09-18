import React, { useState, useEffect } from 'react';

import { CustomTimeInputWrapper } from './style';
import { StepperInput } from '../../components';
import { colors } from '../../utils';
import { H4 } from '../../styles';

export interface CustomTimeInputIProps {
  setTimeValue: any;
  error?: string;
}

const CustomTimeInput = ({ setTimeValue, error }: CustomTimeInputIProps) => {
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    setTimeValue(`${hour < '10' && 0}${hour}:0${minutes}`);
  }, [hour, minutes, setTimeValue]);

  return (
    <div>
      <CustomTimeInputWrapper>
        <StepperInput maxValue={11} setValue={setHour} />
        <div>:</div>
        <StepperInput maxValue={59} setValue={setMinutes} />
      </CustomTimeInputWrapper>
      {error && (
        <H4 left color={colors.red}>
          {error}
        </H4>
      )}
    </div>
  );
};

export default CustomTimeInput;
