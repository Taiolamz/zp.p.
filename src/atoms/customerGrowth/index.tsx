import { useState } from 'react';
import { CustomSelect } from '../../components';
import { H2, H4 } from '../../styles';
import { Container, CustomerGrowthChart, CustomerGrowthHeader, CustomerGrowthMain, CustomerGrowthStat } from './style';
import { colors } from '../../utils';
import CountInfoCardNoHelper from '../../components/cards/countInfoCardNoHelper';
import { dashboardBarData } from '../../pages/dashboard/data';
import DashboardBarChart from '../dashboardBarChart';
import { CustomSelectOptionsIProps } from '../../components/customSelect';

export interface CustomersCountIProps {
  id: number;
  title: string;
  count: number | string;
}

export interface CustomerGrowthIProps {
  customersCount: CustomersCountIProps[];
}

const CustomerGrowth = ({ customersCount }: CustomerGrowthIProps) => {
  // const [startDisplayRecordDate, setStartDisplayRecordDate] = useState('');
  const [dateOption, setDateOption] = useState(['year', 'Year']);

  const [barChartSelectedText, setBarChartSelectedText] = useState('Daily');

  const dateOptions: CustomSelectOptionsIProps[] = [
    { key: 'daily', value: 'Daily' },
    { key: 'weekly', value: 'Weekly' },
    { key: 'monthly', value: 'Monthly' },
  ];

  const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Container>
      <CustomerGrowthHeader>
        <H2 left bold color={colors.primary}>
          Customer Growth Insight
        </H2>
        <CustomSelect value={dateOption} setValue={setDateOption} options={dateOptions} />
      </CustomerGrowthHeader>
      <CustomerGrowthMain>
        <CustomerGrowthStat>
          {customersCount.map(item => {
            return <CountInfoCardNoHelper key={item.id} title={item.title} count={item.count} />;
          })}
        </CustomerGrowthStat>

        <CustomerGrowthChart>
          <H4 left color={colors.primary}>
            3% growth in the past year
          </H4>
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
