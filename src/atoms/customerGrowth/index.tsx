import { useState } from 'react';
import { DatePicker, DoughnutChart } from '../../components';
import { H1, H2, H3, H4, H5, H6 } from '../../styles';
import {
  Container,
  CustomerGrowthChart,
  CustomerGrowthHeader,
  CustomerGrowthMain,
  CustomerGrowthStat,
  TransactionMainLegend,
  TransactionMainText,
} from './style';
import { colors } from '../../utils';
import { FaCircle } from 'react-icons/fa';
import CountInfoCardNoHelper from '../../components/cards/countInfoCardNoHelper';
import SettlementBarChart from '../settlementBarChart';
import { dashboardBarData } from '../../pages/dashboard/data';
import DashboardBarChart from '../dashboardBarChart';

export interface TransactionVolumeIProps {
  transactionVolumeChartData: any[];
}

const CustomerGrowth = ({ transactionVolumeChartData }: TransactionVolumeIProps) => {
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState('');
  const [barChartSelectedText, setBarChartSelectedText] = useState('Daily');

  const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Container>
      <CustomerGrowthHeader>
        <H2 left bold color={colors.primary}>
          Customer Growth Insight
        </H2>
        <DatePicker selectedDate={setStartDisplayRecordDate} />
      </CustomerGrowthHeader>
      <CustomerGrowthMain>
        <CustomerGrowthStat>
          <CountInfoCardNoHelper title="Total Customer" count={'5,234'} type={'small'} />
          <CountInfoCardNoHelper title="New Customers" count={'2164'} type={'small'} />
        </CustomerGrowthStat>

        <CustomerGrowthChart>
          <H4 left>3% growth in the past year</H4>
          <DashboardBarChart
            setBarChartSelectedText={setBarChartSelectedText}
            dailyData={barChartSelectedText === 'Daily' ? dashboardBarData : emptyData}
            weeklyData={barChartSelectedText === 'Weekly' ? dashboardBarData : emptyData}
            monthlyData={barChartSelectedText === 'Montthly' ? dashboardBarData : emptyData}
          />
        </CustomerGrowthChart>
      </CustomerGrowthMain>
    </Container>
  );
};

export default CustomerGrowth;
