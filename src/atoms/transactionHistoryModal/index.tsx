import { useState, useEffect, ReactElement } from 'react';
import { Container, BtnContainer, SearchContainer, CountInfoContainer } from './style';
import { BorderedText, CountInfoCardNoHelper, Modal, SearchInput, TransactionHistoryTable } from '../../components';
import { H2, H3, H5 } from '../../styles';
import { colors, spacing } from '../../utils';
import { TransactionHistoryIProps } from '../../components/tables/transactionHistoryTable';
import { Dictionary } from '../../types';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: TransactionHistoryIProps[];
  headerData?: Dictionary;
  actionClick: () => void;
  firstCount: number;
  secondCount: number;
  thirdCount: number;
  isLoading: boolean;
  children: ReactElement;
}

function TransactionHistoryModal({
  isModalVisible,
  closeModal,
  title,
  data,
  headerData,
  actionClick,
  firstCount,
  secondCount,
  thirdCount,
  isLoading,
  children,
}: IProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Please wait loading...</H5>
        </Container>
      ) : (
        <Container>
          <CountInfoContainer>
            <CountInfoCardNoHelper count={firstCount} title="Cash Requests" backgroundColor="transparent" />
            <CountInfoCardNoHelper count={secondCount} title="Cash Delivery" backgroundColor="transparent" />
            <CountInfoCardNoHelper count={thirdCount} title="Bill Transaction" backgroundColor="transparent" />
          </CountInfoContainer>

          {/* <SearchContainer>
            <SearchInput
              placeholder="Search Records"
              backgroundColor={'transparent'}
              name="SearchValue"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length === 0) {
                  setIsSearching(!isSearching);
                }
                setSearchValue(e.target.value);
              }}
            />
            <div style={{ marginLeft: spacing.xsmall }}>
              <BorderedText
                color={colors.white}
                backgroundColor={colors.primary}
                text="Search"
                onClick={() => setIsSearching(!isSearching)}
              />
            </div>
          </SearchContainer> */}
          <TransactionHistoryTable data={data} headerData={headerData} onClick={() => {}} />
          {/* <div
            style={{
              width: '100%',
              marginTop: spacing.xsmall,
            }}>
            <BtnContainer>
              <H3 semiBold onClick={closeModal} color={colors.white} style={{ cursor: 'pointer' }}>
                Print Statement
              </H3>
            </BtnContainer>
          </div> */}
          {data.length > 0 && <div style={{ marginTop: spacing.xsmall }}>{children}</div>}
        </Container>
      )}
    </Modal>
  );
}

export default TransactionHistoryModal;
