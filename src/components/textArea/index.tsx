import { memo } from "react";
import { H5, H4 } from "../../styles";
import { colors, spacing } from "../../utils";
import { InputContainer } from "./style";

interface IProps {
  name: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: any;
  error?: string;
  label?: string;
  placeholder?: string;
  backgroundColor?: string;
  value: string;
  borderColor?: string;
  marginBottom?: number | string;
}

function TextArea({
  name,
  onChange,
  error,
  label,
  placeholder,
  backgroundColor,
  value,
  borderColor,
  marginBottom,
}: IProps) {
  return (
    <div style={{ marginBottom: marginBottom ? marginBottom : spacing.small }}>
      {label && (
        <H5
          semiBold
          style={{ marginLeft: 5, marginBottom: spacing.xsmall }}
          left
          color={colors.grey}>
          {label}
        </H5>
      )}
      <InputContainer
        borderColor={borderColor}
        error={error}
        backgroundColor={backgroundColor}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        rows={4}
      />

      {error && (
        <H4 left color={colors.red}>
          {error}
        </H4>
      )}
    </div>
  );
}

export default memo(TextArea);

// <textarea
