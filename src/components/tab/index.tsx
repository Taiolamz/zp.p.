import { memo } from "react";
import { Container } from "./style";
import { H4 } from "../../styles";
import { colors } from "../../utils";

export interface TabIProps {
  id?: number;
  paddingRight?: boolean;
  isSelected: boolean;
  text: string;
  type?: string;
  tabViewSelectedIndex?: number;
  onClick?: () => void;
}

function Tab({
  text,
  isSelected,
  onClick,
  paddingRight,
  type,
  tabViewSelectedIndex,
}: TabIProps) {
  const colorUser =
    isSelected && tabViewSelectedIndex === 1
      ? colors.green
      : isSelected && tabViewSelectedIndex === 2
      ? colors.red
      : colors.grey;

  const colorSettle = isSelected ? colors.primary : colors.grey;

  return (
    <Container paddingRight={paddingRight} onClick={onClick}>
      <H4
        style={{
          borderBottomColor: isSelected
            ? colors.purpleVariantThree
            : "transparent",
          borderBottomStyle: isSelected ? "solid" : "none",
          borderBottomWidth: isSelected ? 2 : 0,
        }}
        semiBold
        color={type === "user" ? colorUser : colorSettle}
      >
        {text}
      </H4>
    </Container>
  );
}

export default memo(Tab);
