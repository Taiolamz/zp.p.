import { Container, Content, ContentItem, ContentItemTwo, CardContainer } from './style';
import { Modal, BorderedText, Button } from '../../components';
import { H1, H5 } from '../../styles';
import { colors, currencyFormat, spacing } from '../../utils';
export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  status: 'success' | 'failed';
  data: any[];
  amount: string;
  currency: string;
  onClickExportBtn?: () => void;
  isLoading?: boolean;
  exportBtnDisabled: boolean;
  actionBtnText?: string;
}

interface IPropsCard {
  text: string;
  helper: string;
}

function TransactionDataCard({ text, helper }: IPropsCard) {
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

function TransactionDetailsModal({
  isModalVisible,
  closeModal,
  status,
  amount,
  data,
  currency,
  onClickExportBtn,
  isLoading,
  exportBtnDisabled,
  actionBtnText,
}: IProps) {
  return (
    <Modal title="Transaction Details" isModalVisible={isModalVisible} closeModal={closeModal}>
      <div>
        {isLoading ? (
          <Container>
            <H5>Loading...</H5>
          </Container>
        ) : (
          <Container>
            <H5 center>Amount</H5>
            <H1 center bold>
              {currencyFormat(parseFloat(amount), true, currency)}
            </H1>
            <Content>
              <ContentItem>
                {data && data.map(item => <TransactionDataCard key={item.id} text={item.text} helper={item.helper} />)}
              </ContentItem>
              <ContentItemTwo>
                <H5 left>Status</H5>
                <div
                  style={{
                    marginBottom: spacing.medium,
                    marginTop: spacing.xxsmall,
                  }}>
                  <BorderedText
                    text={status === 'success' ? 'Successful' : 'Failed'}
                    backgroundColor={status === 'success' ? colors.greenVariantThree : colors.pink}
                    color={status === 'success' ? colors.greenVariantFour : colors.red}
                  />
                </div>
                <Button
                  disabled={exportBtnDisabled}
                  text={actionBtnText ? actionBtnText : 'Export To Email'}
                  onClick={onClickExportBtn}
                />
              </ContentItemTwo>
            </Content>
          </Container>
        )}
      </div>
    </Modal>
  );
}

export default TransactionDetailsModal;
