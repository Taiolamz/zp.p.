import { useState } from 'react';
import { Container, BtnContainer } from './style';
import { Modal, LoginHistoryTable } from '../../components';
import { H2, H3, H5 } from '../../styles';
import { colors, spacing } from '../../utils';
import { LoginHistoryIProps } from '../../components/tables/loginHistoryTable';
import { Dictionary } from '../../types';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: LoginHistoryIProps[];
  headerData1?: Dictionary;
  actionClick: () => void;
  isLoading: boolean;
}

function LoginHistoryOnlyModal({ isModalVisible, closeModal, title, data, headerData1, isLoading }: IProps) {
  return (
    <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Loading Please wait...</H5>
        </Container>
      ) : (
        <Container>
          {data?.length >= 1 && <LoginHistoryTable data={data} headerData={headerData1} />}

          {data?.length < 1 && (
            <H2 center semiBold color={colors.grey} style={{ marginTop: spacing.small, marginBottom: spacing.small }}>
              You do not have any history
            </H2>
          )}
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

export default LoginHistoryOnlyModal;
