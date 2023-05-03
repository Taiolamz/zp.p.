import { TableTag, TD, TH, TR, TableContainer } from "./style";
import { TransactionCard, MoreIcon } from "../..";
import { colors, currencyFormat, dateFormat } from "../../../utils";

export interface TableIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
}

function TransactionTable({
  data,
  setSelectedItem,
  headerData,
  type,
  onClick,
}: any) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
    onClick(item);
    // setMoreIsVisible(true);
  };

  return (
    <TableContainer>
      <TableTag>
        <tr>
          <TH></TH>
          <TH>{headerData.name}</TH>
          <TH>{headerData.tid}</TH>
          <TH>{headerData.amount}</TH>
          <TH>{headerData.type}</TH>
          <TH>{headerData.status}</TH>
          <TH>{headerData.time}</TH>
        </tr>
        {type === "transactions" && (
          <>
            {data.map((item: any) => (
              <TR>
                <TD>{item.id}</TD>
                <TD>{item.name}</TD>
                <TD>{item.tid}</TD>
                <TD>{currencyFormat(item.amount, false, item.currency)}</TD>
                <TD>{item.type}</TD>
                <TD
                  color={
                    item.status === "success"
                      ? colors.greenVariantTwo
                      : colors.red
                  }>
                  {item.status === "success" ? "Successful" : "Unseccessful"}
                </TD>
                <TD>{dateFormat(item.time)}</TD>
                <TD>
                  <MoreIcon onClick={onClick} />
                </TD>
              </TR>
            ))}
          </>
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

export default TransactionTable;
