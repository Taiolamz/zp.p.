import { memo, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Container } from "./style";
import { H6 } from "../../styles";
import { colors, showMessage, spacing } from "../../utils";

interface IProps {
  placeholderText: string;
  text: string;
}

function Clipboard({ text, placeholderText }: IProps) {
  const handleClicked = () => {
    showMessage({ type: "info", message: "Text copied to clipboard" });
  };
  return (
    <CopyToClipboard text={text} onCopy={() => {}}>
      <div style={{ display: "flex" }}>
        <Container onClick={handleClicked}>
          <FiCopy color={colors.grey} size={15} />
          <H6
            semiBold
            color={colors.grey}
            style={{
              marginLeft: spacing.xxsmall,
              borderBottomColor: colors.grey,
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }}>
            {placeholderText}
          </H6>
        </Container>
      </div>
    </CopyToClipboard>
  );
}

export default memo(Clipboard);
