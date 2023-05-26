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

export const transactionVolumeChartData = [
  {
    id: 1,
    name: 'Cash Requests',
    percentage: 49,
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
    count: 2300,
    backgroundColor: colors.blue,
  },
  {
    id: 4,
    name: 'Other Bills',
    count: 150,
    backgroundColor: colors.purple,
  },
];

export const dashboardBarData = [1000, 600, 1200, 687, 800, 1200, 1000, 800, 594, 797, 392, 500];
