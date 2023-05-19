import { useState } from 'react';
import { Container, SubContainer } from './style';
import { Modal, SavedBanksTable } from '../../components';
import { H3, H5 } from '../../styles';
import { images } from '../../utils';
import { SavedBanksIProps } from '../../components/tables/savedBanksTable';
import { ActivityActionModal } from '..';
import { Dictionary } from '../../types';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title: string;
  data: SavedBanksIProps[];
  headerData?: any;
  deleteAction: () => void;
  isFetchingBanks: boolean;
  setSelectedItem: any;
}

const beforeDeleteAction = 'Delete';
const afterDeleteAction = 'Close';
function SavedBanksModal({
  isModalVisible,
  closeModal,
  title,
  data,
  headerData,
  deleteAction,
  isFetchingBanks,
  setSelectedItem,
}: IProps) {
  const [deleteIsModalVisible, setDeleteIsModalVisible] = useState(false);
  const [actionText, setActionText] = useState(beforeDeleteAction);
  const handleDeleteModalOpen = (item: Dictionary) => {
    setSelectedItem(item);
    setDeleteIsModalVisible(true);
  };

  const handleActionClick = () => {
    if (actionText === beforeDeleteAction && deleteIsModalVisible === true) {
      deleteAction();
      setActionText(afterDeleteAction);
    } else {
      setActionText(beforeDeleteAction);
      setDeleteIsModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setActionText(beforeDeleteAction);
    setDeleteIsModalVisible(false);
  };

  return (
    <div>
      <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
        {isFetchingBanks ? (
          <Container>
            <H5 center>Loading please wait...</H5>
          </Container>
        ) : (
          <Container>
            <SubContainer>
              <H3 left>Bank</H3>
            </SubContainer>
            <SavedBanksTable data={data} headerData={headerData} onClick={item => handleDeleteModalOpen(item)} />
          </Container>
        )}
      </Modal>
      <ActivityActionModal
        actionText={actionText}
        title=""
        text={
          actionText === beforeDeleteAction
            ? 'Are you sure you want to delete this record?'
            : 'Record has been successfully deleted'
        }
        isModalVisible={deleteIsModalVisible}
        closeModal={handleCloseModal}
        actionClick={handleActionClick}
        image={actionText === beforeDeleteAction ? images.reject : images.check}
        isLoading={false}
        secondaryActionText={actionText === beforeDeleteAction ? 'Cancel' : ''}
      />
    </div>
  );
}

export default SavedBanksModal;
