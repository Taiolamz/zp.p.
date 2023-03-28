import Modal from "react-modal";
import { Container, OptionText } from "./style";
import { H3 } from "../../styles";
import { colors, boxShadow } from "../../utils";
export interface MoreViewIProps {
  options: string[];
  isModalVisible: boolean;
  setSelectedText: any;
  closeModal: () => void;
}

function MoreIconView({
  options,
  isModalVisible,
  closeModal,
  setSelectedText,
}: MoreViewIProps) {
  let subtitle: any;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    subtitle.style.color = "red";
  }
  const customStyles = {
    content: {
      top: "65%",
      left: "auto",
      right: "2%",
      padding: 0,
      margin: 0,
      bottom: "auto",
      boxShadow: boxShadow.light,
    },
  };

  return (
    <Modal
      isOpen={isModalVisible}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      preventScroll={true}
      contentLabel='Example Modal'>
      <Container>
        {options.map((item: string, index: number) => (
          <OptionText key={index}>
            <H3
              onClick={() => setSelectedText(item)}
              left
              color={colors.primary}>
              {item}
            </H3>
          </OptionText>
        ))}
      </Container>
    </Modal>
  );
}

export default MoreIconView;
