import { PrevTransactionTableIPropsIProps } from '../../components/tables/previousTransactionsTable';

export const previousTransactionDataHeader = {
  //   id: '',
  tType: 'Transaction Type',
  tid: 'Transaction ID',
  amount: 'Amount',
  status: 'Status',
  date: 'Date-Time',
};

export const previousTransactionData: PrevTransactionTableIPropsIProps[] = [
  {
    id: 1,
    tType: 'Cash Request',
    tid: 'CR12344U',
    amount: 'N12,000',
    status: 'Unsuccessful',
    date: '24/11/2021 - 17:01',
  },
  {
    id: 2,
    tType: 'Bill payment',
    tid: 'CR12344U',
    amount: 'N12,000',
    status: 'Unsuccessful',
    date: '24/11/2021 - 17:01',
  },
  {
    id: 3,
    tType: 'Cash provision',
    tid: 'CR12344U',
    amount: 'N12,000',
    status: 'Unsuccessful',
    date: '24/11/2021 - 17:01',
  },
  {
    id: 4,
    tType: 'Bill payment',
    tid: 'CR12344U',
    amount: 'N12,000',
    status: 'Unsuccessful',
    date: '24/11/2021 - 17:01',
  },
  {
    id: 5,
    tType: 'Transfer',
    tid: 'CR12344U',
    amount: 'N12,000',
    status: 'Unsuccessful',
    date: '24/11/2021 - 17:01',
  },
];
