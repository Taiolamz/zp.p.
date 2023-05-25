import { useState } from 'react';
import { AppContainer, SavedBanksModal, TransactionHistoryModal, SubAgentModal } from '../../atoms';
import {
  SavedBanksData,
  TransactionHistoryHeader,
  savedBanksDataHeader,
  transactionHistoryData,
  subAgentData,
} from '../users/data';
function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subAgentIsModalVisible, setSubAgentIsModalVisible] = useState(false);

  return (
    <AppContainer navTitle="DASHBOARD">
      <div>
        <h1>Dashboard</h1>
        <h1>Dashboard</h1>
        <h1>Dashboard</h1>

        <button onClick={() => setSubAgentIsModalVisible(true)}>Open</button>

        <SubAgentModal
          isModalVisible={subAgentIsModalVisible}
          data={subAgentData}
          title="Sub-Agents"
          closeModal={() => setSubAgentIsModalVisible(false)}
          description="See all sub agents assigned to this user "
        />

        {/* <TransactionHistoryModal
          actionClick={() => {}}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          title='Transaction History'
          data={transactionHistoryData}
          headerData={TransactionHistoryHeader}
        /> */}

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
