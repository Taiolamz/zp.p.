import { H4, H6 } from '../../styles';
import { ChangeEvent, useState } from 'react';
import { CustomUploadContainer, FileInputs, InputButton, InputStyle } from './style';
import { colors } from '../../utils';

export interface CustomUploadIProps {
  label?: string;
  inputMessage: string;
  backgroundColor: string;
  icon?: any;
  setFileValue?: any;
  error?: string;
  name?: string;
}

const CustomUpload = ({
  label,
  inputMessage,
  backgroundColor,
  icon,
  setFileValue,
  error,
  name,
}: CustomUploadIProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileValue(e.target.files[0]);
    }
  };

  return (
    <CustomUploadContainer>
      {label && (
        <label htmlFor="">
          <H6>{label}</H6>
        </label>
      )}
      <FileInputs>
        <InputStyle name={name} id={name} type="file" onChange={handleFileChange} />
        <InputButton>
          {icon}
          <H6>{inputMessage}</H6>
        </InputButton>
      </FileInputs>{' '}
      {error && (
        <H4 left color={colors.red}>
          {error}
        </H4>
      )}
    </CustomUploadContainer>
  );
};

export default CustomUpload;
