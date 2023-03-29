import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { memo, ReactElement } from "react";
import { Container, CloseContainer } from "./style";
import { colors, boxShadow } from "../../utils";

interface IProps {
  closeModal: () => void;
  isModalVisible: boolean;
  backgroundColor?: string;
  children: ReactElement;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: `1px solid ${colors.smokeWhite}`,
    boxShadow: boxShadow.light,
  },
};

function RModal({
  closeModal,
  isModalVisible,
  backgroundColor = colors.white,
  children,
}: IProps) {
  let subtitle: any;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={!!isModalVisible}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'>
      <Container backgroundColor={backgroundColor}>
        <CloseContainer onClick={closeModal}>
          <FiX color={colors.white} size={15} />
        </CloseContainer>
        {children}
      </Container>
    </Modal>
  );
}

export default memo(RModal);
