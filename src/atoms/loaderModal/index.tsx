import Modal from "react-modal";
import SearchIcon from "../../assets/gif/searchingFile.gif";
import { Container } from "./style";

import { H6 } from "../../styles";
import { colors, boxShadow, spacing } from "../../utils";

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  text?: string;
  backgroundColor?: string;
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

function LoaderModal({
  isModalVisible,
  closeModal,
  text,
  backgroundColor,
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
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: spacing.xsmall,
            marginBottom: spacing.medium,
          }}>
          <img width={200} height={200} src={SearchIcon} alt='loading...' />
        </div>
        <H6>{text}</H6>
      </Container>
    </Modal>
  );
}

export default LoaderModal;
