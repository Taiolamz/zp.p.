import { ChartLegendIPropsIProps } from '../../components/chartLegend';
import { colors } from '../../utils';
import numberFormat from '../../utils/numberFormat';
import { dashboardMainCountDataIProps } from './dashboard';

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

export const allUsersData = {
  usersCount: 9300,
  conversionRate: '77%',
};

export const activeData = [
  { id: 1, title: 'ACTIVE', count: 7900 },
  { id: 2, title: 'INACTIVE', count: 1400 },
];

export const totalCustomers = { title: 'Total Customers', count: numberFormat(11234) };

export const pendingVerification = { title: 'Pending Verification', count: 705 };

export const dashboardMainCountData: dashboardMainCountDataIProps[] = [
  {
    id: 1,
    title: 'Inflow',
    count: 19990560,
    helperText: 'Total Income',
    backgroundColor: 'transparent',
    color: colors.blueVariantOne,
  },
  {
    id: 2,
    title: 'Outflow',
    count: 10590000,
    helperText: 'Total Withdrawals',
    backgroundColor: 'transparent',
    color: colors.orange,
  },
  {
    id: 3,
    title: 'Revenue',
    count: 1450000,
    helperText: 'Tansaction Profit',
    backgroundColor: 'transparent',
    color: colors.green,
  },
  {
    id: 4,
    title: 'Current In-App Balance',
    count: 9400000,
    helperText: 'Transaction Aggregate',
    backgroundColor: 'transparent',
    color: colors.greenVariantOne,
  },
];

export const refferals = {
  title: 'Refferals',
  color: colors.primary,
  count: numberFormat(4324),
  type: 'small',
  titleColor: colors.greyVariantOne,
};

export const activeCash = {
  title: 'Active Cash Requests',
  color: colors.primary,
  count: numberFormat(4324),
  type: 'small',
  titleColor: colors.greyVariantOne,
};

export const complaints = {
  title: 'Complaints',
  color: colors.primary,
  count: 345,
  type: 'small',
  titleColor: colors.greyVariantSeven,
};

export const agents = {
  title: 'Agents',
  color: colors.primary,
  count: 345,
  type: 'small',
  titleColor: colors.greyVariantSeven,
};

export const customersCount = [
  {
    id: 1,
    title: 'Total Customer',
    count: numberFormat(5234),
  },
  {
    id: 2,
    title: 'New Customer',
    count: numberFormat(2161),
  },
];
