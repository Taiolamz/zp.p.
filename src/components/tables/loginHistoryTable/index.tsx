import { TableTag, TD, TH, TR, TableContainer } from "./style";
import { Dictionary } from "../../../types";

export interface LoginHistoryIProps {
  id: number;
  device: string;
  time: string;
  location?: string;
  ipAddress?: string;
  staffName?: string;
  machineName?: string;
}

export interface TableIPropsIProps {
  type?: string;
  data?: LoginHistoryIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: Dictionary;
}

function LoginHistoryTable({
  data,
  setSelectedItem,
  headerData,
  type,
}: TableIPropsIProps) {
  return (
    <TableContainer>
      <TableTag>
        <thead>
          <tr>
            <TH>{headerData?.time}</TH>
            <TH>{headerData?.device || headerData?.staffName}</TH>
            <TH>{headerData?.location || headerData?.machineName}</TH>
            {headerData?.ipAddress && <TH>{headerData?.ipAddress}</TH>}
          </tr>
        </thead>

        <tbody>
          {data?.map((item: LoginHistoryIProps) => (
            <TR key={item?.id}>
              <TD>{item?.time}</TD>
              <TD>{item?.device || item?.staffName}</TD>
              <TD>{item?.location || item?.machineName}</TD>
              {item?.ipAddress && <TD>{item?.ipAddress}</TD>}
            </TR>
          ))}
        </tbody>
      </TableTag>
    </TableContainer>
  );
}

export default LoginHistoryTable;
