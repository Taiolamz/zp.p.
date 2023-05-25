import { Container, Content, CardContainer } from './style';
import { Modal, Button, DocumentStatusTable } from '../../components';
import { H2, H3, H5 } from '../../styles';
import { borderRadius, colors, spacing } from '../../utils';

export interface DocumentHistoryIProps {
  id?: number;
  image: string;
  text: string;
  imgAlt: string;
}

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data?: DocumentHistoryIProps[];
  isLoading?: boolean;
}

function DocumentHistoryCard(item: DocumentHistoryIProps) {
  const { image, text, imgAlt } = item;
  return (
    <CardContainer>
      <H5 left color={colors.greyDark} semiBold style={{ marginBottom: spacing.xsmall }}>
        {text}
      </H5>
      <img
        src={image}
        alt={imgAlt}
        style={{ height: 220, width: '100%', maxWidth: 400, borderRadius: borderRadius.medium }}
      />
    </CardContainer>
  );
}

function DocumentHistoryModal({ isModalVisible, closeModal, title, data, isLoading }: IProps) {
  return (
    <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Loading...</H5>
        </Container>
      ) : (
        <Container>
          <Content>
            {data?.map(item => (
              <DocumentHistoryCard key={item.id} image={item.image} imgAlt={item.imgAlt} text={item.text} />
            ))}
          </Content>
        </Container>
      )}
    </Modal>
  );
}

export default DocumentHistoryModal;
