import { Dictionary } from '../../../types';
import { Button } from '../..';
import { TableTag, TD, TH, TR, TableContainer } from './style';
import { H3 } from '../../../styles';
export interface SavedBanksIProps {
  id: number;
  accNo: string;
  accName: string;
  bank: string;
}

export interface TableIPropsIProps {
  data: SavedBanksIProps[];
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: (item: Dictionary) => any;
}

function SavedBanksTable({ data, headerData, onClick }: TableIPropsIProps) {
  return (
    <div>
      {data.length < 1 ? (
        <H3 center>This user does not have a saved bank yet!</H3>
      ) : (
        <TableContainer>
          <TableTag>
            <thead>
              <tr>
                <TH>{headerData.accNo}</TH>
                <TH>{headerData.accName}</TH>
                <TH>{headerData.bank}</TH>
              </tr>
            </thead>
            <tbody>
              {data.map((item: SavedBanksIProps, index: number) => (
                <TR key={item.id}>
                  <TD>{item.accNo}</TD>
                  <TD>{item.accName}</TD>
                  <TD>{item.bank}</TD>
                  <TD>
                    <Button text="Delete" onClick={() => onClick(item)} />
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableTag>
        </TableContainer>
      )}
    </div>
  );
}

export default SavedBanksTable;
