import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Container } from './style';
import { spacing } from '../../utils';

export interface BarChartIPropsIProps {
  id: number;
  name: string;
  count: number;
  backgroundColor: string;
}

export interface BarChartIProps {
  data: BarChartIPropsIProps[];
}

function BarChart({ data }: BarChartIProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,

    Tooltip,
  );

  console.log(data);
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    // scale: false,
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        formatter: Math.round,
        anchor: 'end',
        offset: -16,
        align: 'start',
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: false,
          autoSkip: true,
          autoSkipPadding: 15,
          max: 5,
          min: 200000,
          callback: function (value: number, index: number, array: []) {
            return value < 1000000 ? value / 1000 : value / 1000000;
          },
        },
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = data.map(item => item.name);
  const backgroundColor = data.map(item => item.backgroundColor);
  const count = data.map(item => item.count);

  const fakerOne = count;

  const dataChart = {
    labels,
    datasets: [
      {
        label: '',
        data: fakerOne,
        backgroundColor: backgroundColor,
        grouped: true,
        barThickness: 100,
        borderRadius: 6,
      },
    ],
  };

  return (
    <div style={{ marginTop: spacing.small }}>
      <Bar options={options} data={dataChart} plugins={[ChartDataLabels]} height={200} width={'100'} />
    </div>
  );
}

function TransactionInfoBarChart({ data }: BarChartIProps) {
  return (
    <>
      <Container>
        <BarChart data={data} />
      </Container>
    </>
  );
}

export default TransactionInfoBarChart;
