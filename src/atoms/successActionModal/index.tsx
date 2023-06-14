import SuccessIcon from '../../assets/gif/successIcon.gif';
import { Container } from './style';
import { Modal, Button } from '../../components';
import { H2, H6 } from '../../styles';
import { colors, spacing } from '../../utils';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title: string;
  text?: string;
  actionText: string;
}

function SuccessActionModal({ isModalVisible, closeModal, title, text, actionText }: IProps) {
  return (
    <Modal title="" isModalVisible={isModalVisible} closeModal={closeModal}>
      <Container>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: spacing.xsmall,
            marginBottom: spacing.medium,
          }}>
          <img width={200} height={200} src={SuccessIcon} alt="success icon" />
        </div>
        <H2 semiBold style={{ marginBottom: spacing.small }}>
          {title}
        </H2>

        <H6 color={colors.grey}>{text}</H6>

        <div
          style={{
            width: 150,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: spacing.small,
          }}>
          <Button text={actionText} onClick={closeModal} />
        </div>
      </Container>
    </Modal>
  );
}

export default SuccessActionModal;
