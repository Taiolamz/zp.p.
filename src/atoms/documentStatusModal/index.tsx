import { Container, BtnContainer } from './style';
import { Modal, Button, DocumentStatusTable } from '../../components';
import { H2, H3, H5 } from '../../styles';
import { colors, spacing } from '../../utils';

export interface DocumentStatusIProps {
  id: number;
  document: string;
  noOfUpload: number;
  status: string;
  statusBG: string;
}

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: DocumentStatusIProps[];
  headerData?: any;
  actionClick: () => void;
  isLoading?: boolean;
}

function DocumentStatusModal({ isModalVisible, closeModal, title, data, headerData, actionClick, isLoading }: IProps) {
  return (
    <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Loading...</H5>
        </Container>
      ) : (
        <Container>
          <DocumentStatusTable data={data} headerData={headerData} />
          <div
            style={{
              width: '100%',
              marginTop: spacing.xsmall,
            }}>
            <BtnContainer>
              <H3 semiBold onClick={closeModal} color={colors.white} style={{ cursor: 'pointer' }}>
                Close
              </H3>
            </BtnContainer>
          </div>
        </Container>
      )}
    </Modal>
  );
}

export default DocumentStatusModal;
