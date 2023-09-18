import { IPropsRadioData } from "../../atoms/newNotification";

export const notificationDataHeader = {
  id: 1,
  title: 'Notification Title',
  interval: 'Interval',
  createdBy: 'Created By',
  dateCreated: 'Date Created',
};

export const articleDataHeader = {
  id: 1,
  title: 'Article Title',
  interval: 'Interval',
  createdBy: 'Created By',
  dateCreated: 'Date Created',
};

export const faqDataHeader = {
  faqTitle: 'FAQ Title',
  helpful: 'Helpful',
  notHelpful: 'Not Helpful',
  createdBy: 'Created By',
  dateCreated: 'Date Created',
};

export const settingsCountData = [
  {
    id: 1,
    count: 3,
    title: 'in app notification',
  },
  {
    id: 2,
    count: 3,
    title: 'email notification',
  },
  {
    id: 3,
    count: 3,
    title: 'Articles',
  },
  {
    id: 4,
    count: 3,
    title: 'FAQs',
  },
];

export const notificationData = [
  {
    id: 1,
    title: 'Buy Bills Cheap Cheap',
    interval: 'Daily',
    createdBy: 'Debo Samuel',
    dateCreated: '24/11/2021',
  },
  {
    id: 2,
    title: 'Buy Bills Cheap Cheap',
    interval: 'Daily',
    createdBy: 'Debo Samuel',
    dateCreated: '24/11/2021',
  },
  {
    id: 3,
    title: 'Buy Bills Cheap Cheap',
    interval: 'Daily',
    createdBy: 'Debo Samuel',
    dateCreated: '24/11/2021',
  },
];

export const faqData = [
  {
    id: 1,
    faqTitle: 'Buy Bills Cheap Cheap',
    helpful: 'Daily',
    notHelpful: 'Daily',
    createdBy: 'Debo Samuel',
    dateCreated: '24/11/2021',
  },
  {
    id: 2,
    faqTitle: 'Buy Bills Cheap Cheap',
    helpful: 'Daily',
    notHelpful: 'Daily',
    createdBy: 'Debo Samuel',
    dateCreated: '24/11/2021',
  },
  {
    id: 3,
    faqTitle: 'Buy Bills Cheap Cheap',
    helpful: 'Daily',
    notHelpful: 'Daily',
    createdBy: 'Debo Samuel',
    dateCreated: '24/11/2021',
  },
];

export const notificationRecipents: IPropsRadioData[] = [
  {
    id: 1,
    label: 'Upload Specific Users',
    value: 'specific users',
  },
  {
    id: 2,
    label: 'All Users',
    value: 'all user',
  },
];
