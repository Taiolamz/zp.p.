import { useState } from 'react';
import { Container, SubContainer } from './style';
import { Modal, SavedBanksTable } from '../../components';
import { H2, H3, H5 } from '../../styles';
import { colors, spacing, images } from '../../utils';
import { SavedBanksIProps } from '../../components/tables/savedBanksTable';
import { SuccessActionModal, ActivityActionModal } from '..';
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
  // actionClick: () => void;
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
    if (actionText === beforeDeleteAction) {
      deleteAction();
      setActionText(afterDeleteAction);
    } else {
      setDeleteIsModalVisible(false);
    }
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
        closeModal={() => setDeleteIsModalVisible(false)}
        actionClick={handleActionClick}
        image={actionText === beforeDeleteAction ? images.reject : images.check}
        isLoading={false}
        secondaryActionText={actionText === beforeDeleteAction ? 'Cancel' : ''}
      />
    </div>
  );
}

export default SavedBanksModal;
