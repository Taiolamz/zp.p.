import React, { useState, memo } from "react";
import { FiEyeOff, FiEye, FiSearch } from "react-icons/fi";

import { H6, H4 } from "../../styles";
import { colors } from "../../utils";
import { InputContainer, InputContent } from "./style";

interface IProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  backgroundColor?: string;
  value: string;
  borderColor?: string;
}

function SearchInput({
  name,
  onChange,
  error,
  label,
  placeholder,
  backgroundColor,
  value,
  borderColor,
}: IProps) {
  return (
    <div>
      <InputContainer
        borderColor={borderColor}
        error={error}
        backgroundColor={backgroundColor}>
        <InputContent
          placeholder={placeholder}
          name={name}
          type={"text"}
          onChange={onChange}
          value={value}
        />
        <FiSearch color={colors.grey} size={"20px"} />
      </InputContainer>
    </div>
  );
}

export default memo(SearchInput);
