import { DocumentStatusIProps } from '../../atoms/documentStatusModal';
import { UserSupportActivityIProps } from '../../atoms/userSupportActivity';
import { CustomerProfileIProps } from '../../components/customerProfile';
import { colors, dateFormat } from '../../utils';
const date = new Date().toDateString();

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

export const namedDocumentStatus = 'Document Status';
export const namedTransactionHistory = 'Transaction History';
export const namedDocumentHistory = 'Document History';
export const namedSavedBanks = 'Saved Banks';
export const namedLoginHistory = 'Login History';
export const namedReactivateProfile = 'Reactivate Profile';
export const namedDeactivateProfile = 'Deactivate Profile';
export const namedViewSubAgents = 'View Sub Agents';

export const supportActivitiesData: UserSupportActivityIProps[] = [
  {
    id: 1,
    text: namedDocumentStatus,
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 2,
    text: namedTransactionHistory,
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 3,
    text: namedDocumentHistory,
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 4,
    text: namedSavedBanks,
    backgroundColor: colors.purpleVariantThree,
  },
  {
    id: 5,
    text: namedLoginHistory,
    backgroundColor: colors.purpleVariantThree,
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

// export const loginHistory: LoginHistoryIProps[] = [
//   {
//     id: 1,
//     time: "12/22/2021 - 22:46",
//     device: "Iphone 14 pro max",
//     location: "Lagos, Nigeria",
//     ipAddress: "192.158. 1.38",
//   },
//   {
//     id: 2,
//     time: "12/22/2021 - 22:46",
//     device: "Web",
//     location: "Lagos, Nigeria",
//     ipAddress: "192.158. 1.42",
//   },
//   {
//     id: 3,
//     time: "12/22/2021 - 22:46",
//     device: "Iphone 14 pro max",
//     location: "Lagos, Nigeria",
//     ipAddress: "192.158. 1.38",
//   },
//   {
//     id: 4,
//     time: "12/22/2021 - 22:46",
//     device: "Iphone 14 pro max",
//     location: "Lagos, Nigeria",
//     ipAddress: "192.158. 1.38",
//   },
//   {
//     id: 5,
//     time: "12/22/2021 - 22:46",
//     device: "Iphone 14 pro max",
//     location: "Lagos, Nigeria",
//     ipAddress: "192.158. 1.38",
//   },

//   {
//     id: 6,
//     time: "12/22/2021 - 22:46",
//     device: "Iphone 14 pro max",
//     location: "Lagos, Nigeria",
//     ipAddress: "192.158. 1.38",
//   },
// ];

// export const loginHistory2: LoginHistory2IProps[] = [
//   {
//     id: 1,
//     time: "12/22/2021 - 22:46",
//     staffName: "Debo Dare",
//     machineName: "AIN723492",
//   },
//   {
//     id: 2,
//     time: "12/22/2021 - 22:46",
//     staffName: "Debo Dare",
//     machineName: "AIN723492",
//   },
//   {
//     id: 3,
//     time: "12/22/2021 - 22:46",
//     staffName: "Debo Dare",
//     machineName: "AIN723492",
//   },
//   {
//     id: 4,
//     time: "12/22/2021 - 22:46",
//     staffName: "Debo Dare",
//     machineName: "AIN723492",
//   },
//   {
//     id: 5,
//     time: "12/22/2021 - 22:46",
//     staffName: "Debo Dare",
//     machineName: "AIN723492",
//   },

//   {
//     id: 6,
//     time: "12/22/2021 - 22:46",
//     staffName: "Debo Dare",
//     machineName: "AIN723492",
//   },
// ];

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
