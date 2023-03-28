import { memo } from "react";
import { Container } from "./style";
import { H4 } from "../../styles";
import { colors } from "../../utils";

export interface TabIProps {
  id?: number;
  paddingRight?: boolean;
  isSelected: boolean;
  text: string;
  onClick?: () => void;
}

function Tab({ text, isSelected, onClick, paddingRight }: TabIProps) {
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
        color={isSelected ? colors.primary : colors.grey}>
        {text}
      </H4>
    </Container>
  );
}

export default memo(Tab);
