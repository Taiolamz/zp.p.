import Modal from 'react-modal';
import { Container, OptionText } from './style';
import { H3 } from '../../styles';
import { colors, boxShadow } from '../../utils';

export interface MoreViewIProps {
  options: string[];
  isModalVisible: boolean;
  setSelectedText: any;
  closeModal: () => void;
  onClick: (item: string) => any;
}

function MoreIconView({ options, isModalVisible, closeModal, setSelectedText, onClick }: MoreViewIProps) {
  let subtitle: any;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    subtitle.style.color = 'red';
  }
  const customStyles = {
    content: {
      top: '65%',
      left: 'auto',
      right: '2%',
      padding: 0,
      margin: 0,
      bottom: 'auto',
      boxShadow: boxShadow.light,
    },
    overlay: { backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 },
  };

  const handleClick = (item: string) => {
    setSelectedText(item);
    onClick(item);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalVisible}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      preventScroll={true}
      contentLabel="Example Modal">
      <Container>
        {options.map((item: string, index: number) => (
          <OptionText key={index}>
            <H3 onClick={() => handleClick(item)} left color={colors.primary}>
              {item}
            </H3>
          </OptionText>
        ))}
      </Container>
    </Modal>
  );
}

export default MoreIconView;
