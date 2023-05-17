import { TableTag, TD, TH, TR, TableContainer } from "./style";
import { ReactComponent as EmptySearchIcon } from "../../../assets/svg/emptySearch.svg";

const emptyListCenterStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export interface PrevTransactionTableIPropsIProps {
  id?: number | string;
  tType?: string;
  tid: string;
  amount: number | string;
  status: string;
  date?: string;
  transId: string;
}

export interface PrevTransactionIPropsIProps {
  data: PrevTransactionTableIPropsIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: any;
}

function PreviousTransactionsTable({
  data,
  setSelectedItem,
  headerData,
  onClick,
}: PrevTransactionIPropsIProps) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
    onClick(item);
  };

  return (
    <div>
      {data?.length < 1 ? (
        <div style={emptyListCenterStyle}>
          <EmptySearchIcon />
        </div>
      ) : (
        <TableContainer>
          <TableTag>
            <TR>
              <TH></TH>
              <TH>{headerData.tType}</TH>
              <TH>{headerData.tid}</TH>
              <TH>{headerData.amount}</TH>
              <TH>{headerData.status}</TH>
              <TH>{headerData.date}</TH>
            </TR>

            <>
              {data.map(
                (item: PrevTransactionTableIPropsIProps, index: number) => (
                  <TR key={index} onClick={() => handleOnSelect(item)}>
                    <TD>{item.id}</TD>
                    <TD>{item.tType}</TD>
                    <TD>{item.tid}</TD>
                    <TD>{item.amount}</TD>
                    <TD>{item.status}</TD>
                    <TD>{item.date}</TD>
                  </TR>
                )
              )}
            </>
          </TableTag>
        </TableContainer>
      )}
    </div>
  );
}

export default PreviousTransactionsTable;
