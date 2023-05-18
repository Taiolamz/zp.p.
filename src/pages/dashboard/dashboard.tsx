import { useState } from 'react';
import {
  AppContainer,
  SavedBanksModal,
  TransactionHistoryModal,
} from '../../atoms';
import {
  SavedBanksData,
  TransactionHistoryHeader,
  savedBanksDataHeader,
  transactionHistoryData,
} from '../users/data';
function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <AppContainer navTitle='DASHBOARD'>
      <div>
        <h1>Dashboard</h1>
        <h1>Dashboard</h1>
        <h1>Dashboard</h1>

        <TransactionHistoryModal
          actionClick={() => {}}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          title='Transaction History'
          data={transactionHistoryData}
          headerData={TransactionHistoryHeader}
        />

        {/* <SavedBanksModal
          actionClick={() => {}}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          title='Bank & Cards'
          data={SavedBanksData}
          headerData={savedBanksDataHeader}
        /> */}
      </div>
    </AppContainer>
  );
}

export default Dashboard;
