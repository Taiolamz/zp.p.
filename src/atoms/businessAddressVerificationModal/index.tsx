import {
  Container,
  Content,
  ContentItem,
  ContentItemTwo,
  CardContainer,
} from "./style";
import { Modal, Button } from "../../components";
import { H5 } from "../../styles";
import { colors, spacing } from "../../utils";
export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  data: any[];
  onClickVerify: () => void;
  isLoading?: boolean;
}

interface IPropsCard {
  text: string;
  helper: string;
}

function DataCard({ text, helper }: IPropsCard) {
  return (
    <CardContainer>
      <H5 left color={colors.primary}>
        {helper}
      </H5>
      <H5 left color={colors.grey}>
        {text}
      </H5>
    </CardContainer>
  );
}

function BusinessAddressVerificationModal({
  isModalVisible,
  closeModal,
  data,
  onClickVerify,
  isLoading,
}: IProps) {
  return (
    <Modal
      title='Address Verification Details'
      isModalVisible={isModalVisible}
      closeModal={closeModal}>
      <div>
        {isLoading ? (
          <Container>
            <H5>Loading...</H5>
          </Container>
        ) : (
          <Container>
            <Content>
              <ContentItem>
                {data &&
                  data?.map((item) => (
                    <DataCard
                      key={item.id}
                      text={item.text}
                      helper={item.helper}
                    />
                  ))}
              </ContentItem>
              <ContentItemTwo>
                <Button
                  disabled={isLoading}
                  text='Mark Address as Verified'
                  onClick={onClickVerify}
                  backgroundColor={colors.greenVariantFour}
                  borderColor={colors.greenVariantFour}
                />
              </ContentItemTwo>
            </Content>
          </Container>
        )}
      </div>
    </Modal>
  );
}

export default BusinessAddressVerificationModal;
