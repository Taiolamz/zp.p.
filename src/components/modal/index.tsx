import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { memo, ReactElement } from "react";
import {
  Container,
  Content,
  CloseContainer,
  TitleContainer,
  ContentOne,
  ContentTwo,
  ContentThree,
} from "./style";
import "./style.css";
import { colors, boxShadow } from "../../utils";
import { H2 } from "../../styles";

interface IProps {
  closeModal: () => void;
  isModalVisible: boolean;
  backgroundColor?: string;
  children: ReactElement;
  title?: string;
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
  overlay: { backgroundColor: "rgba(0,0,0,0.6)" },
};

function RModal({
  closeModal,
  isModalVisible,
  backgroundColor = colors.white,
  children,
  title,
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
        <Content>
          <ContentOne></ContentOne>
          <ContentTwo>
            <TitleContainer>
              <H2 semiBold color={colors.primary}>
                {title}
              </H2>
            </TitleContainer>
          </ContentTwo>
          <ContentThree>
            <CloseContainer onClick={closeModal}>
              <FiX color={colors.white} size={15} />
            </CloseContainer>
          </ContentThree>
        </Content>
        {children}
      </Container>
    </Modal>
  );
}

export default memo(RModal);
