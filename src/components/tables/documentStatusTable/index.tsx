import { TableTag, TD, TH, TR, TableContainer, TDStatus } from './style';
import { TransactionCard, MoreIcon } from '../..';
import { colors, currencyFormat, dateFormat } from '../../../utils';

export interface TableIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
}

function DocumentStatusTable({
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

  console.log(data);
  return (
    <TableContainer>
      <TableTag>
        <thead>
          <tr>
            <TH>{headerData.document}</TH>
            <TH>{headerData.noOfUpload}</TH>
            <TH>{headerData.status}</TH>
          </tr>
        </thead>

        <>
          {data.map((item: any, index: number) => (
            <TR key={index}>
              <TD>{item.document}</TD>
              <TD>{item.noOfUpload}</TD>
              <TD>
                <TDStatus
                  style={{
                    backgroundColor: item.statusBG,
                  }}
                >
                  {item.status}
                </TDStatus>
              </TD>
            </TR>
          ))}
        </>
      </TableTag>
    </TableContainer>
  );
}

export default DocumentStatusTable;
