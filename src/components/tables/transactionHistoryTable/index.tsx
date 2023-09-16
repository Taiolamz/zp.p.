import { capitalizeFirstLetter, colors, currencyFormat, dateFormat, spacing, timeFormat } from '../../../utils';
import { TableTag, TD, TH, TR, TableContainer, TDStatus } from './style';
import { H1 } from '../../../styles';

export interface TransactionHistoryIProps {
  id: string | number;
  time: string;
  transactionType: string;
  amount: number;
  status: string;
  recipient: string;
}

export interface TableIPropsIProps {
  data: TransactionHistoryIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: () => void;
}

function TransactionHistoryTable({ data, setSelectedItem, headerData, onClick }: TableIPropsIProps) {
  return (
    <TableContainer>
      <TableTag>
        <thead>
          <tr>
            <TH>{headerData.time}</TH>
            <TH>{headerData.transactionType}</TH>
            <TH>{headerData.amount}</TH>
            <TH>{headerData.status}</TH>
            <TH>{headerData.recipient}</TH>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <TR key={item.id}>
              <TD>{`${dateFormat(item.time)} - ${timeFormat(item.time)}`}</TD>
              <TD>{item.transactionType}</TD>
              <TD>{currencyFormat(item.amount)}</TD>
              <TD
                style={{
                  color:
                    item.status === 'In Progress'
                      ? colors.primary
                      : item.status === 'failed'
                      ? colors.red
                      : colors.green,
                }}>
                {capitalizeFirstLetter(item.status)}
              </TD>
              <TD>{item.recipient}</TD>
            </TR>
          ))}
        </tbody>
      </TableTag>
      {data.length < 1 && (
        <H1 style={{ marginTop: spacing.small }} center semiBold color={colors.grey}>
          No transaction found
        </H1>
      )}
    </TableContainer>
  );
}

export default TransactionHistoryTable;
