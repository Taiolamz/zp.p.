import Switch from "react-switch";
import { memo } from "react";
import { Container } from "./style";
import { H3 } from "../../styles";
import { spacing, colors } from "../../utils";

interface IProps {
  label?: string;
  checked: boolean;
  onChange: () => void;
}
function RSwitch({ label, checked, onChange }: IProps) {
  return (
    <label>
      <Container>
        <Switch
          onChange={onChange}
          checked={checked}
          uncheckedIcon={false}
          checkedIcon={false}
        />
        <H3 style={{ marginLeft: spacing.xsmall }} color={colors.primary}>
          {label}
        </H3>
      </Container>
    </label>
  );
}

export default memo(RSwitch);
