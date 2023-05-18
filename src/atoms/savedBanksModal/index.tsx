import { Container, SubContainer } from './style';
import { Modal, SavedBanksTable } from '../../components';
import { H2, H3 } from '../../styles';
import { colors, spacing } from '../../utils';
import { SavedBanksIProps } from '../../components/tables/savedBanksTable';
import { useState } from 'react';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: SavedBanksIProps[];
  headerData?: any;
  actionClick: () => void;
}

function SavedBanksModal({
  isModalVisible,
  closeModal,
  title,
  data,
  headerData,
  actionClick,
}: IProps) {
  const [deleteIsModalVisible, setDeleteIsModalVisible] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteIsModalVisible(true);
  };
  return (
    <Modal title='' isModalVisible={isModalVisible} closeModal={closeModal}>
      <Container>
        {title && (
          <H2
            semiBold
            color={colors.primary}
            style={{ marginBottom: spacing.xsmall }}
          >
            {title}
          </H2>
        )}

        <SubContainer>
          <H3 left>Bank</H3>
        </SubContainer>

        <SavedBanksTable
          data={data}
          headerData={headerData}
          onClick={handleDeleteModalOpen}
        />
      </Container>
    </Modal>
  );
}

export default SavedBanksModal;
