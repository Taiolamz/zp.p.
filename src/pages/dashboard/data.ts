import { ChartLegendIPropsIProps } from '../../components/chartLegend';
import { colors } from '../../utils';

export const kycLevelData = [
  {
    id: 1,
    level: 'NO KYC',
    count: 500,
    iconColor: colors.red,
  },
  {
    id: 2,
    level: 'Level 1',
    count: 7034,
    iconColor: colors.green,
  },
  {
    id: 3,
    level: 'Level 2',
    count: 2300,
    iconColor: colors.orange,
  },
  {
    id: 4,
    level: 'Level 3',
    count: 150,
    iconColor: colors.primary,
  },
];

export const transactionVolumeChartData: ChartLegendIPropsIProps[] = [
  {
    id: 1,
    name: 'Cash Requests',
    count: 49,
    backgroundColor: colors.green,
  },
  {
    id: 2,
    name: 'TV Subscription',
    count: 19,
    backgroundColor: colors.orange,
  },
  {
    id: 3,
    name: 'Airtime & Data Bills',
    count: 15,
    backgroundColor: colors.blue,
  },
  {
    id: 4,
    name: 'Other Bills',
    count: 15,
    backgroundColor: colors.purple,
  },
];

export const dashboardBarData = [1000, 600, 1200, 687, 800, 1200, 1000, 800, 594, 797, 392, 500];
// export const transactionInfoBarData = [1000, 600, 1200, 687];

export const transactionInfoBarData = [
  {
    id: 3,
    name: 'Airtime & Data Bills',
    count: 2985000,
    backgroundColor: colors.purple,
  },
  {
    id: 1,
    name: 'Cash Requests',
    count: 9751270,
    backgroundColor: colors.green,
  },
  {
    id: 2,
    name: 'TV Subscription',
    count: 3781100,
    backgroundColor: colors.orange,
  },

  {
    id: 4,
    name: 'Other Bills',
    count: 3282100,
    backgroundColor: colors.blue,
  },
];

export const transactionInformationStats = [
  {
    id: 1,
    title: 'Amount Transacted',
    count: '19900560',
    backgroundColor: colors.white,
    countColor: colors.primary,
    type: 'money',
  },
  {
    id: 2,
    title: 'Total Revenue',
    count: '9000000',
    backgroundColor: colors.white,
    countColor: colors.primary,
    type: 'money',
  },
  {
    id: 3,
    title: 'Total Transactions',
    count: '1500',
    backgroundColor: colors.white,
    countColor: colors.primary,
    type: 'figure',
  },
];
