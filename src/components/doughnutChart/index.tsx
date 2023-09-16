import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Container } from './style';
import { colors, spacing } from '../../utils';

export interface DoughnutChartIPropsIProps {
  id: number;
  name: string;
  percentage: number;
  backgroundColor: string;
}

export interface SettlementBarChartOptionsIProps {
  data: DoughnutChartIPropsIProps[];
}

function DoughnutChart({ data }: SettlementBarChartOptionsIProps) {
  ChartJS.register(ArcElement, Tooltip);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // scale: false,
  };

  const chartData = {
    labels: ['Cash Requests', 'TV Subscription', 'Airtime & Data Bills', 'Other Bills'],
    datasets: [
      {
        label: 'Transaction Volume Insight',
        data: [49, 19, 15, 17],
        backgroundColor: [colors.greenVariantFive, colors.orange, colors.purple, colors.blue],

        borderWidth: 1,
      },
    ],
  };

  return (
    <Container style={{ marginTop: spacing.small }}>
      <Doughnut options={options} data={chartData} height={'90%'} width={'90%'} />
    </Container>
  );
}

export default DoughnutChart;
