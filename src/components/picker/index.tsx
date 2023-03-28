import { memo, useState } from "react";
import { Container, OptionText, ContentContainer, Content } from "./style";
import { H5, H6 } from "../../styles";
import { colors, spacing } from "../../utils";
import { H3 } from "../../styles";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
type PickerOptionsIProps = {
  label: string;
  value: string | number;
};

interface IProps {
  backgroundColor?: string;
  color?: string;
  options: PickerOptionsIProps[];
  label?: string;
  placeholder?: string;
  onClick?: () => void;
  height?: number | string;
  selectedValue: any;
  error?: string;
  marginBottom?: number | string;
}

function Picker({
  backgroundColor,
  options,
  label,
  placeholder,
  height,
  selectedValue,
  error,
  marginBottom,
}: IProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<any>("");

  const handleTextClick = (item: any) => {
    selectedValue(item.value);
    setValue(item?.value);
    setIsVisible(false);
  };
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

      <Container
        error={value.length < 2 && error ? "error" : ""}
        onClick={() => setIsVisible(!isVisible)}
        height={height}
        backgroundColor={backgroundColor}>
        <H5
          left
          semiBold
          color={value.length ? colors.black : colors.greyVariantFour}>
          {value.length > 2 ? value : placeholder}
        </H5>
        {isVisible ? (
          <FiChevronUp size={20} color={colors.grey} />
        ) : (
          <FiChevronDown size={20} color={colors.grey} />
        )}
      </Container>
      {isVisible && (
        <ContentContainer>
          <Content>
            {options.map((item: PickerOptionsIProps, index: number) => (
              <OptionText key={index} onClick={() => handleTextClick(item)}>
                <H3 left color={colors.primary}>
                  {item.label}
                </H3>
              </OptionText>
            ))}
          </Content>
        </ContentContainer>
      )}

      {value.length < 2 && error && (
        <H5 left color={error ? colors.red : colors.grey}>
          {error}
        </H5>
      )}
    </div>
  );
}

export default memo(Picker);
