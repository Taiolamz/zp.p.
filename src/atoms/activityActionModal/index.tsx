import { Container, BtnContainer } from "./style";
import { Modal, Button } from "../../components";
import { H2, H6 } from "../../styles";
import { colors, spacing } from "../../utils";

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  text?: string;

  actionText: string;
  secondaryActionText?: string;
  actionClick: () => void;
  image?: string;
}

function ActivityActionModal({
  isModalVisible,
  closeModal,
  title,
  text,
  actionText,
  actionClick,
  image,
  secondaryActionText,
}: IProps) {
  return (
    <Modal title='' isModalVisible={isModalVisible} closeModal={closeModal}>
      <Container>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: spacing.xsmall,
            marginBottom: spacing.small,
          }}>
          <img width={50} height={50} src={image} alt='loading...' />
        </div>
        {title && (
          <H2 semiBold style={{ marginBottom: spacing.small }}>
            {title}
          </H2>
        )}

        <H6 color={colors.primary}>{text}</H6>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginTop: spacing.small,
          }}>
          <BtnContainer />

          <BtnContainer>
            <Button text={actionText} onClick={actionClick} />
          </BtnContainer>
          {secondaryActionText && (
            <BtnContainer>
              <H2
                semiBold
                onClick={closeModal}
                color={colors.primary}
                style={{ cursor: "pointer" }}>
                {secondaryActionText}
              </H2>
            </BtnContainer>
          )}
        </div>
      </Container>
    </Modal>
  );
}

export default ActivityActionModal;
