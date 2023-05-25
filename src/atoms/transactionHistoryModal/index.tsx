import {
  Container,
  BtnContainer,
  SearchContainer,
  CountInfoContainer,
} from './style';
import {
  BorderedText,
  CountInfoCardNoHelper,
  Modal,
  SearchInput,
  TransactionHistoryTable,
} from '../../components';
import { H2, H3 } from '../../styles';
import { colors, spacing } from '../../utils';
import { TransactionHistoryIProps } from '../../components/tables/transactionHistoryTable';
import { useState, useEffect } from 'react';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title?: string;
  data: TransactionHistoryIProps[];
  headerData?: any;
  actionClick: () => void;
}

function TransactionHistoryModal({
  isModalVisible,
  closeModal,
  title,
  data,
  headerData,
  actionClick,
}: IProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

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

        <CountInfoContainer>
          <CountInfoCardNoHelper
            count={30}
            title='Cash Requests'
            backgroundColor='transparent'
          />
          <CountInfoCardNoHelper
            count={30}
            title='Cash Delivery'
            backgroundColor='transparent'
          />
          <CountInfoCardNoHelper
            count={30}
            title='Bill Transaction'
            backgroundColor='transparent'
          />
        </CountInfoContainer>

        <SearchContainer>
          <SearchInput
            placeholder='Search Records'
            backgroundColor={'transparent'}
            name='SearchValue'
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
              text='Search'
              onClick={() => setIsSearching(!isSearching)}
            />
          </div>
        </SearchContainer>
        <TransactionHistoryTable
          data={data}
          headerData={headerData}
          onClick={() => {}}
        />
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
              Print Statement
            </H3>
          </BtnContainer>
        </div>
      </Container>
    </Modal>
  );
}

export default TransactionHistoryModal;
