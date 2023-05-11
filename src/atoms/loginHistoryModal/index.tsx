import { useState } from 'react';
import { Container, BtnContainer } from './style';
import { Modal, LoginHistoryTable } from '../../components';
import { H2, H3 } from '../../styles';
import { TabViewLoginHistory } from '../../atoms/';
import { colors, spacing } from '../../utils';

export interface LoginHistoryIProps {
  id: number;
  device: string;
  time: string;
  location: string;
  ipAddress: string;
}

export interface LoginHistory2IProps {
  id: number;
  time: string;
  staffName: string;
  machineName: string;
}

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: LoginHistoryIProps[];
  data2: LoginHistory2IProps[];
  headerData1?: any;
  headerData2?: any;
  actionClick: () => void;
}

const tabViewData = [
  { id: 1, isSelected: true, text: 'User`s History' },
  { id: 2, isSelected: false, text: 'Profile View History' },
];
function LoginHistoryModal({
  isModalVisible,
  closeModal,
  title,
  data,
  data2,
  headerData1,
  headerData2,
}: IProps) {
  const [
    tabViewLoginHistorySelectedIndex,
    setTabViewLoginHistorySelectedIndex,
  ] = useState<any[number]>(1);
  // const [tabViewSelectedIndex, setTabViewSelectedIndex] =
  //   useState<any[number]>(1);
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

        <TabViewLoginHistory
          data={tabViewData}
          setSelectedIndex={setTabViewLoginHistorySelectedIndex}
          tabViewSelectedIndex={tabViewLoginHistorySelectedIndex}
        />
        {tabViewLoginHistorySelectedIndex === 1 && (
          <LoginHistoryTable data={data} headerData={headerData1} />
        )}
        {tabViewLoginHistorySelectedIndex === 2 && (
          <LoginHistoryTable data={data2} headerData={headerData2} />
        )}
        <div
          style={{
            width: '100%',
            marginTop: spacing.xsmall,
          }}
        >
          <BtnContainer>
            <H3
              semiBold
              onClick={closeModal}
              color={colors.white}
              style={{ cursor: 'pointer' }}
            >
              Close
            </H3>
          </BtnContainer>
        </div>
      </Container>
    </Modal>
  );
}

export default LoginHistoryModal;
