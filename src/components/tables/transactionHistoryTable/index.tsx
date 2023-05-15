import { colors } from '../../../utils';
import { TableTag, TD, TH, TR, TableContainer, TDStatus } from './style';

export interface TransactionHistoryIProps {
  id: number;
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

function TransactionHistoryTable({
  data,
  setSelectedItem,
  headerData,
  onClick,
}: TableIPropsIProps) {
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
          {data.map((item: any, index: number) => (
            <TR key={item.id}>
              <TD>{item.time}</TD>
              <TD>{item.transactionType}</TD>
              <TD>{item.amount}</TD>
              <TD
                style={{
                  color:
                    item.status === 'In Progress'
                      ? colors.primary
                      : item.status === 'Failed- Declined'
                      ? colors.red
                      : colors.green,
                }}
              >
                {item.status}
              </TD>
              <TD>{item.recipient}</TD>
            </TR>
          ))}
        </tbody>
      </TableTag>
    </TableContainer>
  );
}

export default TransactionHistoryTable;
