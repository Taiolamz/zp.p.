import { useState, useLayoutEffect } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { Container, BorderedTextContainer, Content } from './style';
import { colors, spacing } from '../../utils';
import { BorderedText } from '../../components';
import { H3 } from '../../styles';

export interface BarChartIProps {
  dailyData: number[];
  weeklyData: number[];
  monthlyData: number[];
}

export interface SettlementBarChartOptionsIProps {
  text: string;
  id: number;
  isSelected: boolean;
}

export interface SettlementBarChartIProps extends BarChartIProps {
  barChartSelectedData?: any[];
  setBarChartSelectedText?: any;
}

function BarChart({ dailyData, weeklyData, monthlyData }: BarChartIProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,

    Tooltip,
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // scale: false,
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const fakerOne = dailyData;
  const fakerTwo = weeklyData;
  const fakerThree = monthlyData;

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: fakerOne,
        backgroundColor: colors.blueVariantOne,
        hoverBackgroundColor: colors.blueVariantOne,
        grouped: true,
        barThickness: 13,
      },
      {
        label: '',
        data: fakerTwo,
        backgroundColor: colors.orange,
        hoverBackgroundColor: colors.orange,
        grouped: true,
        barThickness: 13,
      },
      {
        label: '',
        data: fakerThree,
        backgroundColor: colors.greenVariantOne,
        hoverBackgroundColor: colors.greenVariantOne,
        grouped: true,
        barThickness: 13,
      },
    ],
  };

  return (
    <div style={{ marginTop: spacing.small }}>
      <Bar options={options} data={data} height={195} width={'100%'} />
    </div>
  );
}

const barChartSelectedDataIni = [
  { id: 1, text: 'Daily', isSelected: true },
  { id: 2, text: 'Weekly', isSelected: false },
  { id: 3, text: 'Monthly', isSelected: false },
];
function DashboardBarChart({ setBarChartSelectedText, dailyData, weeklyData, monthlyData }: SettlementBarChartIProps) {
  const [optionData, setOptionData] = useState<SettlementBarChartOptionsIProps[]>(barChartSelectedDataIni);

  // const handleOnSelect = (item: SettlementBarChartOptionsIProps) => {
  //   const itemToEdit = item;

  //   const updatedData = [...optionData].map((el: SettlementBarChartOptionsIProps) => {
  //     if (el.text === itemToEdit.text) {
  //       el.isSelected = true;
  //     } else {
  //       el.isSelected = false;
  //     }
  //     return el;
  //   });

  //   setOptionData(updatedData);
  //   setBarChartSelectedText(itemToEdit.text);
  // };
  return (
    <>
      <Container>
        <Content>
          <BorderedTextContainer></BorderedTextContainer>
        </Content>
        <BarChart dailyData={dailyData} weeklyData={weeklyData} monthlyData={monthlyData} />
      </Container>
    </>
  );
}

export default DashboardBarChart;
