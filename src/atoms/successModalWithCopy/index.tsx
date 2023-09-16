import { Container } from "./style";
import { Modal, Clipboard, Button } from "../../components";
import { ReactComponent as SentIcon } from "../../assets/svg/sent.svg";
import { ReactComponent as CompletedIcon } from "../../assets/svg/completed.svg";
import { H5 } from "../../styles";
import { colors, spacing } from "../../utils";
export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  text: string;
  copyIconText: string;
  title: string;
  iconType?: "sent" | "completed";
  btnText?: string;
}

const btnContainerStyle = {
  width: 150,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: spacing.small,
};

function SuccessModalWithCopy({
  isModalVisible,
  closeModal,
  text,
  copyIconText,
  title,
  iconType,
  btnText = "Close",
}: IProps) {
  return (
    <Modal isModalVisible={isModalVisible} closeModal={closeModal}>
      <Container>
        <div style={{ marginBottom: spacing.small }}>
          {iconType === "sent" && <SentIcon />}
          {iconType === "completed" && <CompletedIcon />}
        </div>
        <H5 color={colors.grey}>{text}</H5>
        <H5
          semiBold
          color={colors.grey}
          style={{ marginTop: spacing.xxsmall, marginBottom: spacing.small }}>
          {title}
        </H5>
        {copyIconText && (
          <Clipboard text={title} placeholderText={copyIconText} />
        )}

        <div style={btnContainerStyle}>
          <Button text={btnText} onClick={closeModal} />
        </div>
      </Container>
    </Modal>
  );
}

export default SuccessModalWithCopy;
