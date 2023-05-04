import { TableTag, TD, TH, TR, TableContainer } from "./style";
import { TransactionCard } from "../..";
import { RxCaretRight } from "react-icons/rx";
import { colors, currencyFormat, dateFormat } from "../../../utils";

export interface TableIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
}

function UsersTable({ data, headerData, type, onClick }: any) {
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
        {type === "transactions" && (
          <tbody>
            {data.map((item: any) => (
              <TR onClick={() => handleOnSelect(item)} key={item.id}>
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
        )}

        {type === "billHistory" && (
          <div>
            {data.map((item: any) => (
              <TransactionCard
                cardType={type}
                key={item.id}
                onClick={() => handleOnSelect(item)}
                id={item.id}
                tid={item.tid}
                name={item.name}
                amount={item.name}
                status={item.status}
                type={item.type}
                time={item.type}
              />
            ))}
          </div>
        )}
      </TableTag>
    </TableContainer>
  );
}

export default UsersTable;
