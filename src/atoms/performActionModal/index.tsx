import Spinner from "../../assets/gif/spinner.gif";
import { Container, BtnContainer } from "./style";
import { ReactComponent as ArrowCycle } from "../../assets/svg/arrowCycle.svg";

import { Modal, BorderedText, Button } from "../../components";
import { H1, H5, H6 } from "../../styles";
import { colors, currencyFormat, spacing } from "../../utils";
export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  actionClick: () => void;
  title: string;
  text?: string;
  isLoading?: boolean;
  actionText: string;
}

function PerformActionModal({
  isModalVisible,
  closeModal,
  title,
  text,
  actionClick,
  isLoading,
  actionText,
}: IProps) {
  return (
    <Modal
      title={title}
      isModalVisible={isModalVisible}
      closeModal={closeModal}>
      <div>
        {isLoading ? (
          <Container>
            <img width={200} height={200} src={Spinner} alt='loading...' />

            <H5>Please wait loading...</H5>
          </Container>
        ) : (
          <Container>
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              <ArrowCycle />
            </div>

            <H6>{text}</H6>

            <BtnContainer>
              <div style={{ width: "45%" }}>
                <Button text={actionText} onClick={actionClick} />
              </div>
              <div style={{ width: "45%" }}>
                <Button
                  text='Cancel'
                  onClick={closeModal}
                  secondary
                  borderColor={colors.red}
                  color={colors.red}
                />
              </div>
            </BtnContainer>
          </Container>
        )}
      </div>
    </Modal>
  );
}

export default PerformActionModal;
