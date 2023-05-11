import { TableTag, TD, TH, TR, TableContainer } from './style';

export interface TableIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
}

function LoginHistoryTable({
  data,
  setSelectedItem,
  headerData,
  type,
  onClick,
}: any) {
  return (
    <TableContainer>
      <TableTag>
        <thead>
          <tr>
            <TH>{headerData.time}</TH>
            <TH>{headerData.device || headerData.staffName}</TH>
            <TH>{headerData.location || headerData.machineName}</TH>
            {headerData.ipAddress && <TH>{headerData.ipAddress}</TH>}
          </tr>
        </thead>

        <tbody>
          {data.map((item: any, index: number) => (
            <TR key={item.id}>
              <TD>{item.time}</TD>
              <TD>{item.device || item.staffName}</TD>
              <TD>{item.location || item.machineName}</TD>
              {item.ipAddress && <TD>{item.ipAddress}</TD>}
            </TR>
          ))}
        </tbody>
      </TableTag>
    </TableContainer>
  );
}

export default LoginHistoryTable;
