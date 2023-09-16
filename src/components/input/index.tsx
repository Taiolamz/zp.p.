import React, { useState, memo } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';

import { H5, H4 } from '../../styles';
import { colors, spacing } from '../../utils';
import {
  InputContainer,
  InputContent,
  InputCover,
  InputIconContainer,
  FormInputContainer,
  LabelContainer,
  LabelContent,
} from './style';

interface IProps {
  name: string;
  type: 'email' | 'password' | 'text';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  backgroundColor?: string;
  value: string;
  borderColor?: string;
  marginBottom?: number | string;
  normalEmail?: boolean;
}

function Input({
  name,
  type,
  onChange,
  error,
  label,
  placeholder,
  backgroundColor,
  value,
  borderColor,
  marginBottom,
  normalEmail = false,
}: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  if (type === 'email' && normalEmail === false) {
    return (
      <FormInputContainer>
        <LabelContent>
          {label && (
            <LabelContainer>
              <H4 semiBold left color={colors.primary}>
                {label}
              </H4>
            </LabelContainer>
          )}
        </LabelContent>
        <InputContainer backgroundColor={backgroundColor} error={error}>
          <InputCover>
            <InputContent value={value} name={name} type={type} onChange={onChange} placeholder={placeholder} />
          </InputCover>
        </InputContainer>
        {error && (
          <H4 left color={colors.red}>
            {error}
          </H4>
        )}
      </FormInputContainer>
    );
  } else if (type === 'email' && normalEmail === true) {
    return (
      <div style={{ marginBottom: marginBottom ? marginBottom : spacing.small }}>
        {label && (
          <H5 semiBold style={{ marginLeft: 5, marginBottom: spacing.xsmall }} left color={colors.grey}>
            {label}
          </H5>
        )}

        <InputContainer borderColor={borderColor} error={error} backgroundColor={backgroundColor}>
          <InputContent placeholder={placeholder} name={name} type={type} onChange={onChange} value={value} />
        </InputContainer>
        {error && (
          <H4 left color={colors.red}>
            {error}
          </H4>
        )}
      </div>
    );
  } else if (type === 'password') {
    return (
      <FormInputContainer>
        <LabelContent>
          {label && (
            <LabelContainer>
              <H4 semiBold left color={colors.primary}>
                {label}
              </H4>
            </LabelContainer>
          )}
        </LabelContent>
        <InputContainer backgroundColor={backgroundColor} error={error}>
          <InputCover>
            <InputContent
              name={name}
              type={isPasswordVisible ? 'text' : 'password'}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
          </InputCover>
          <InputIconContainer>
            {isPasswordVisible ? (
              <FiEye color={colors.primary} size={'20px'} onClick={() => setIsPasswordVisible(false)} />
            ) : (
              <FiEyeOff color={colors.primary} size={'20px'} onClick={() => setIsPasswordVisible(true)} />
            )}
          </InputIconContainer>
        </InputContainer>
        {error && (
          <H4 left color={colors.red}>
            {error}
          </H4>
        )}
      </FormInputContainer>
    );
  }

  return (
    <div style={{ marginBottom: marginBottom ? marginBottom : spacing.small }}>
      {label && (
        <H5 semiBold style={{ marginLeft: 5, marginBottom: spacing.xsmall }} left color={colors.grey}>
          {label}
        </H5>
      )}

      <InputContainer borderColor={borderColor} error={error} backgroundColor={backgroundColor}>
        <InputContent placeholder={placeholder} name={name} type={type} onChange={onChange} value={value} />
      </InputContainer>
      {error && (
        <H4 left color={colors.red}>
          {error}
        </H4>
      )}
    </div>
  );
}

export default memo(Input);
