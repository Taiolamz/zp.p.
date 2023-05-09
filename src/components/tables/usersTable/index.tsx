import { TableTag, TD, TH, TR, TableContainer } from "./style";
import { TransactionCard } from "../..";
import { RxCaretRight } from "react-icons/rx";
import { colors, currencyFormat, dateFormat, routesPath } from "../../../utils";
import { useNavigate } from "react-router-dom";
const { USERDETAILS } = routesPath;

export interface TableIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick?: () => void;
}

function UsersTable({ data, headerData, type, onClick }: any) {
  const navigate = useNavigate();

  const handleOnSelect = (item: any) => {
    onClick(item);
  };

  return (
    <TableContainer>
      <TableTag>
        <thead>
          <tr>
            <TH></TH>
            <TH>{headerData.id}</TH>
            <TH>{headerData.name}</TH>
            <TH>{headerData.userId}</TH>
            <TH>{headerData.walletNo}</TH>
            <TH>{headerData.phone}</TH>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <TR
              key={item.id}
              onClick={() => navigate(`${USERDETAILS}${item.id}`)}>
              <TD></TD>
              <TD>{item.id}</TD>
              <TD>{item.name}</TD>
              <TD>{item.userId}</TD>
              <TD>{item.walletNo}</TD>
              <TD>{item.phone}</TD>
              <TD>
                <RxCaretRight size={20} color={colors.grey} />
              </TD>
            </TR>
          ))}
        </tbody>
      </TableTag>
    </TableContainer>
  );
}

export default UsersTable;
