// import SuccessIcon from "../../assets/gif/successIcon.gif";
import { Container, BtnContainer } from "./style";
import { Modal, Button, Picker } from "../../components";
import { H2, H6 } from "../../styles";
import { colors, spacing } from "../../utils";

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  actionText: string;
  actionClick: () => void;
  image?: string;
  rejectionValue: any;
  rejectionList: any[];
}

function RejectionActionModal({
  isModalVisible,
  closeModal,
  title,
  actionText,
  actionClick,
  image,
  rejectionValue,
  rejectionList,
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

        <H2
          semiBold
          style={{ marginBottom: spacing.small }}
          color={colors.primary}>
          {title}
        </H2>
        <Picker
          label=''
          selectedValue={rejectionValue}
          placeholder='Select options'
          options={rejectionList}
        />

        <div style={{ width: 140 }}>
          <Button text={actionText} onClick={actionClick} />
        </div>
      </Container>
    </Modal>
  );
}

export default RejectionActionModal;
