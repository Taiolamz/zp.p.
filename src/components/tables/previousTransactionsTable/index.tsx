import { TableTag, TD, TH, TR, TableContainer, ViewContent } from './style';
import { colors } from '../../../utils';
import { H6 } from '../../../styles';

export interface PrevTransactionTableIPropsIProps {
  id?: number | string;
  tType?: string;
  tid: string;
  amount: number | string;
  status: string;
  date?: string;
}

export interface PrevTransactionIPropsIProps {
  data: PrevTransactionTableIPropsIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: () => void;
}

function PreviousTransactionsTable({
  data,
  setSelectedItem,
  headerData,
  onClick,
}: PrevTransactionIPropsIProps) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
    // onClick();
    // setMoreIsVisible(true);
  };

  return (
    <TableContainer>
      <TableTag>
        <tr>
          <TH>#</TH>
          <TH>{headerData.tType}</TH>
          <TH>{headerData.tid}</TH>
          <TH>{headerData.phoneNo}</TH>
          <TH></TH>
        </tr>

        <>
          {data.map((item: PrevTransactionTableIPropsIProps, index: number) => (
            <TR key={index}>
              <TD>{item.id}</TD>
              <TD>{item.tType}</TD>
              <TD>{item.tid}</TD>
              <TD>{item.amount}</TD>
              <TD>{item.status}</TD>
              <TD>{item.date}</TD>
            </TR>
          ))}
        </>
      </TableTag>
    </TableContainer>
  );
}

export default PreviousTransactionsTable;
