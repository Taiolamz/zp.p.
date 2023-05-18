import { DocumentStatusIProps } from '../../atoms/documentStatusModal';
import { UserSupportActivityIProps } from '../../atoms/userSupportActivity';
import { CustomerProfileIProps } from '../../components/customerProfile';
import { SavedBanksIProps } from '../../components/tables/savedBanksTable';
import { TransactionHistoryIProps } from '../../components/tables/transactionHistoryTable';
import { colors, dateFormat } from '../../utils';
const date = new Date().toDateString();

export const TransactionHistoryHeader = {
  time: 'Time',
  transactionType: 'Transaction Type',
  amount: 'Amount',
  status: 'Status',
  recipient: 'Recipient',
};

export const savedBanksDataHeader = {
  accNo: 'Acct No',
  accName: 'Acct Name',
  bank: 'Bank',
};

export const customerDetails: CustomerProfileIProps[] = [
  {
    id: 1,
    helper: 'Full Name',
    text: 'Wade Warren Chukwuma',
  },

  {
    id: 2,
    helper: 'Email',
    text: 'wadewarren@gmail.com',
  },

  {
    id: 3,
    helper: 'Phone Number',
    text: '2348036329157',
  },

  {
    id: 4,
    helper: 'BVN',
    text: '3094095959',
  },

  {
    id: 5,
    helper: 'Residential Address',
    text: '3995 Valley View Ln undefined Red Oak, Oklahoma 51671 United States',
  },

  { id: 6, text: dateFormat(date), helper: 'Date of Birth' },
  {
    id: 7,
    helper: 'Address Verification Status',
    text: 'Unverified',
  },
  {
    id: 8,
    helper: 'Account Number',
    text: '77123456781',
  },
  {
    id: 9,
    helper: 'Bank Name',
    text: 'KUDA',
  },
  {
    id: 10,
    helper: 'Profile Level',
    text: 'Level 1',
  },
];

export const appActivity: CustomerProfileIProps[] = [
  {
    id: 1,
    helper: 'Onboarding Date',
    text: 'Jul 12, 2021',
  },

  {
    id: 2,
    helper: 'Last Login',
    text: 'Jan 8, 2022',
  },

  {
    id: 3,
    helper: 'Last Device Login',
    text: 'Iphone 14 pro max',
  },

  {
    id: 4,
    helper: 'Profile Status',
    text: 'Deactivated',
  },

  {
    id: 5,
    helper: 'Deactivation Comment',
    text: 'EFCC Order',
  },
];

export const supportActivitiesData: UserSupportActivityIProps[] = [
  {
    id: 1,
    text: 'Document Status',
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 2,
    text: 'Transaction History',
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 3,
    text: 'Upload Document',
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 4,
    text: 'Document History',
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 5,
    text: 'Saved Banks',
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 6,
    text: 'Login History',
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 7,
    text: 'Reactivate Profile',
    backgroundColor: colors.green,
  },
];

export const docStatus: DocumentStatusIProps[] = [
  {
    id: 1,
    document: 'Passport',
    noOfUpload: 2,
    status: 'Approved',
    statusBG: colors.green,
  },
  {
    id: 2,
    document: 'ID Card',
    noOfUpload: 2,
    status: 'Approved',
    statusBG: colors.green,
  },
  {
    id: 3,
    document: 'Address Verification',
    noOfUpload: 1,
    status: 'Rejected',
    statusBG: colors.red,
  },
  {
    id: 4,
    document: 'Signature',
    noOfUpload: 2,
    status: 'N/A',
    statusBG: colors.green,
  },
  {
    id: 5,
    document: 'Resident Permit',
    noOfUpload: 0,
    status: 'N/A',
    statusBG: colors.primary,
  },
  {
    id: 6,
    document: 'Birth Certificate',
    noOfUpload: 0,
    status: 'N/A',
    statusBG: colors.primary,
  },

  {
    id: 7,
    document: 'Passport (Minor)',
    noOfUpload: 0,
    status: 'N/A',
    statusBG: colors.primary,
  },
];

export const documentStatusDataHeader = {
  document: 'Document',
  noOfUpload: 'No of Upload',
  status: 'Status',
};

export const loginHistoryDataHeader1 = {
  time: 'Time',
  device: 'Device',
  location: 'Location',
  ipAddress: 'IP Address',
};

export const loginHistoryDataHeader2 = {
  time: 'Time',
  staffName: 'Staff Name',
  machineName: 'Machine Name',
};

export const userCountData = [
  {
    id: 1,
    count: 3,
    title: 'Active Users',
  },
  {
    id: 2,
    count: 3,
    title: 'Super Agents',
  },
  {
    id: 3,
    count: 3,
    title: 'Inactive Users',
  },
];

export const usersDataLastSeen = [
  {
    id: 1,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
    lastSeen: '12/22/2021',
  },
  {
    id: 2,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
    lastSeen: '12/22/2021',
  },
  {
    id: 3,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
    lastSeen: '12/22/2021',
  },
];

export const usersDataSuperAgent = [
  {
    id: 1,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
    subAgents: 12,
  },
  {
    id: 2,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
    subAgents: 12,
  },
  {
    id: 3,
    name: 'Fola Debo',
    userId: '001234526789',
    walletNo: '2034567584',
    phone: '08142346753',
    subAgents: 12,
  },
];


export const subAgentData: SubAgentIPropsIprops[] = [
  {
    id: 1,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 2,
    name: 'Subagent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 3,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: false,
  },
  {
    id: 4,
    name: 'Real Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 5,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: false,
  },
  {
    id: 6,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 7,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: false,
  },
  {
    id: 8,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 9,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 10,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,
  },
  {
    id: 11,
    name: 'Agent Name',
    dateAdded: 'Jul 12, 2021',
    active: true,

export const transactionHistoryData: TransactionHistoryIProps[] = [
  {
    id: 1,
    time: '12/22/2021 - 22:46',
    transactionType: 'Cash Request',
    amount: 2500,
    status: 'In Progress',
    recipient: 'In Progress',
  },
  {
    id: 2,
    time: '12/22/2021 - 22:46',
    transactionType: 'Cash Request -3rd Party',
    amount: 2500,
    status: 'Failed- Declined',
    recipient: '3rd Party - Folashade Gabriel',
  },
  {
    id: 3,
    time: '12/22/2021 - 22:46',
    transactionType: 'Cash Provide',
    amount: 2500,
    status: 'Successful',
    recipient: 'Gbemi Faloun',
  },
  {
    id: 4,
    time: '12/22/2021 - 22:46',
    transactionType: 'Bills - Data(MTN)',
    amount: 2500,
    status: 'Successful',
    recipient: '0812345678',
  },
  {
    id: 5,
    time: '12/22/2021 - 22:46',
    transactionType: 'Cash Request',
    amount: 2500,
    status: 'Successful',
    recipient: 'Wade williams',
  },
];

export const SavedBanksData: SavedBanksIProps[] = [
  {
    id: 1,
    accNo: '20***90',
    accName: 'Wade Warren Chukwuma',
    bank: 'Zenith',
  },
];
