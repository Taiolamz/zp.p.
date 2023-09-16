import { TableTag, TD, TH, TR, TableContainer, TDStatus } from './style';
import { Dictionary } from '../../../types';
import { capitalizeFirstLetter } from '../../../utils';
export interface TableIPropsIProps {
  data: any[];
  headerData: Dictionary;
}

function DocumentStatusTable({ data, headerData }: TableIPropsIProps) {
  return (
    <TableContainer>
      <TableTag>
        <thead>
          <tr>
            <TH>{headerData?.document}</TH>
            <TH>{headerData?.noOfUpload}</TH>
            <TH>{headerData?.status}</TH>
          </tr>
        </thead>

        <tbody>
          {data?.map((item: any, index: number) => (
            <TR key={item.id}>
              <TD>{item.document}</TD>
              <TD>{item.noOfUpload}</TD>
              <TD>
                <TDStatus
                  style={{
                    backgroundColor: item.statusBG,
                  }}>
                  {capitalizeFirstLetter(item.status)}
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
