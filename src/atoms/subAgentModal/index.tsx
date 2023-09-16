import { ReactElement } from 'react';
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
  children?: ReactElement;
}

function SubAgentModal({ isModalVisible, closeModal, data, isLoading, description, title, children }: IProps) {
  return (
    <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Loading...</H5>
        </Container>
      ) : (
        <Container>
          <H5 left>{description}</H5>
          <SubCardContainer>
            <SubAgentCard data={data} />
          </SubCardContainer>
          <div
            style={{
              width: '100%',
              marginTop: spacing.xsmall,
            }}></div>
          {children && <div>{children}</div>}
        </Container>
      )}
    </Modal>
  );
}

export default SubAgentModal;
