import React, { useState, memo } from "react";
import { MdEmail, MdOutlineCheck } from "react-icons/md";
import { FiEyeOff, FiEye, FiSearch } from "react-icons/fi";
import { AiFillUnlock } from "react-icons/ai";
import { H6 } from "../../styles";
import { colors } from "../../utils";
import {
  InputContainer,
  InputContent,
  InputCover,
  InputIconContainer,
  FormInputContainer,
  LabelContainer,
} from "./style";

interface IProps {
  name: string;
  type: "email" | "password" | "text";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  backgroundColor?: string;
  value: string;
  borderColor?: string;
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
}: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  if (type === "email") {
    return (
      <FormInputContainer>
        {label && (
          <LabelContainer>
            <H6 left color={colors.grey}>
              {label}
            </H6>
          </LabelContainer>
        )}
        <InputContainer backgroundColor={backgroundColor} error={error}>
          <InputCover>
            <MdEmail color={colors.greyVariantOne} size={"25px"} />
            <InputContent
              value={value}
              name={name}
              type={type}
              onChange={onChange}
              placeholder={placeholder}
            />
          </InputCover>

          <InputIconContainer error={error}>
            {value.length > 1 && (
              <MdOutlineCheck color={colors.green} size={"25px"} />
            )}
          </InputIconContainer>
        </InputContainer>
        <H6 left color={colors.red}>
          {error}
        </H6>
      </FormInputContainer>
    );
  } else if (type === "password") {
    return (
      <FormInputContainer>
        {label && (
          <LabelContainer>
            <H6 left color={colors.grey}>
              {label}
            </H6>
          </LabelContainer>
        )}
        <InputContainer backgroundColor={backgroundColor} error={error}>
          <InputCover>
            <AiFillUnlock color={colors.greyVariantOne} size={"25px"} />
            <InputContent
              name={name}
              type={isPasswordVisible ? "text" : "password"}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
          </InputCover>
          <InputIconContainer>
            {isPasswordVisible ? (
              <FiEye
                color={colors.grey}
                size={"25px"}
                onClick={() => setIsPasswordVisible(false)}
              />
            ) : (
              <FiEyeOff
                color={colors.grey}
                size={"25px"}
                onClick={() => setIsPasswordVisible(true)}
              />
            )}
          </InputIconContainer>
        </InputContainer>
        <H6 left color={colors.red}>
          {error}
        </H6>
      </FormInputContainer>
    );
  }
  return (
    <div>
      {label && (
        <H6 left color={colors.grey}>
          {label}
        </H6>
      )}
      <InputContainer
        borderColor={borderColor}
        error={error}
        backgroundColor={backgroundColor}>
        <FiSearch color={colors.greyVariantOne} size={"25px"} />
        <InputContent
          placeholder={placeholder}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
        />
      </InputContainer>
      <H6 left color={colors.red}>
        {error}
      </H6>
    </div>
  );
}

export default memo(Input);
