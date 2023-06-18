import { H4, H6 } from '../../styles';
import { ChangeEvent, useState } from 'react';
import { CustomUploadContainer, FileInputs, InputButton, InputStyle } from './style';

export interface CustomUploadIProps {
  label?: string;
  inputMessage: string;
  backgroundColor: string;
  icon?: any;
  setFileValue?: any;
}

const CustomUpload = ({ label, inputMessage, backgroundColor, icon, setFileValue }: CustomUploadIProps) => {
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
        <InputStyle type="file" onChange={handleFileChange} />
        <InputButton>
          {icon}
          <H6>{inputMessage}</H6>
        </InputButton>
      </FileInputs>{' '}
    </CustomUploadContainer>
  );
};

export default CustomUpload;
