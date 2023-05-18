import { Container, SubCardContainer } from './style';
import { Modal, SubAgentCard } from '../../components';
import { H2, H5 } from '../../styles';
import { spacing } from '../../utils';
import { SubAgentIPropsIprops } from '../../components/subAgentCard';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: SubAgentIPropsIprops[];
  headerData?: any;
  isLoading?: boolean;
  description?: string;
}

function SubAgentModal({ isModalVisible, closeModal, data, isLoading, description, title }: IProps) {
  return (
    <Modal title="" isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Loading...</H5>
        </Container>
      ) : (
        <Container>
          <H2 bold left>
            {title}
          </H2>
          <H5 left>{description}</H5>
          <SubCardContainer>
            <SubAgentCard data={data} />
          </SubCardContainer>
          <div
            style={{
              width: '100%',
              marginTop: spacing.xsmall,
            }}></div>
        </Container>
      )}
    </Modal>
  );
}

export default SubAgentModal;
