import { useState } from 'react';
import { AppContainer, SubAgentModal } from '../../atoms';
import { subAgentData } from '../users/data';
function Dashboard() {
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
      </div>
    </AppContainer>
  );
}

export default Dashboard;
