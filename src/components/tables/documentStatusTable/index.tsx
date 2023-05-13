import { TableTag, TD, TH, TR, TableContainer, TDStatus } from './style';

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

        <tbody>
          {data.map((item: any, index: number) => (
            <TR key={item.id}>
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
        </tbody>
      </TableTag>
    </TableContainer>
  );
}

export default DocumentStatusTable;
