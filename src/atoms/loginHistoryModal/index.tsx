import { useState } from "react";
import { Container, BtnContainer } from "./style";
import { Modal, LoginHistoryTable } from "../../components";
import { H2, H3, H5 } from "../../styles";
import { TabViewLoginHistory } from "../../atoms/";
import { colors, spacing } from "../../utils";
import { LoginHistoryIProps } from "../../components/tables/loginHistoryTable";

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: LoginHistoryIProps[];
  data2: LoginHistoryIProps[];
  headerData1?: any;
  headerData2?: any;
  actionClick: () => void;
  isLoading: boolean;
}

const tabViewData = [
  { id: 1, isSelected: true, text: "User`s History" },
  { id: 2, isSelected: false, text: "Profile View History" },
];
function LoginHistoryModal({
  isModalVisible,
  closeModal,
  title,
  data,
  data2,
  headerData1,
  headerData2,
  isLoading,
}: IProps) {
  const [
    tabViewLoginHistorySelectedIndex,
    setTabViewLoginHistorySelectedIndex,
  ] = useState<any[number]>(1);
  // const [tabViewSelectedIndex, setTabViewSelectedIndex] =
  //   useState<any[number]>(1);

  return (
    <Modal
      title={title}
      isModalVisible={isModalVisible}
      closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Loading Please wait...</H5>
        </Container>
      ) : (
        <Container>
          <TabViewLoginHistory
            data={tabViewData}
            setSelectedIndex={setTabViewLoginHistorySelectedIndex}
            tabViewSelectedIndex={tabViewLoginHistorySelectedIndex}
          />
          {tabViewLoginHistorySelectedIndex === 1 && data?.length >= 1 && (
            <LoginHistoryTable data={data} headerData={headerData1} />
          )}
          {tabViewLoginHistorySelectedIndex === 2 && data2?.length >= 1 && (
            <LoginHistoryTable data={data2} headerData={headerData2} />
          )}

          {tabViewLoginHistorySelectedIndex === 1 && data?.length < 1 && (
            <H2
              center
              semiBold
              color={colors.grey}
              style={{
                marginTop: spacing.small,
                marginBottom: spacing.small,
              }}>
              you do not have any history
            </H2>
          )}
          {tabViewLoginHistorySelectedIndex === 2 && data2?.length < 1 && (
            <H2
              center
              semiBold
              color={colors.grey}
              style={{ marginTop: spacing.small, marginBottom: spacing.small }}>
              you do not have any history
            </H2>
          )}
          <div
            style={{
              width: "100%",
              marginTop: spacing.xsmall,
            }}>
            <BtnContainer>
              <H3
                semiBold
                onClick={closeModal}
                color={colors.white}
                style={{ cursor: "pointer" }}>
                Close
              </H3>
            </BtnContainer>
          </div>
        </Container>
      )}
    </Modal>
  );
}

export default LoginHistoryModal;
