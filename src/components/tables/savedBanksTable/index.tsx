import { useState } from 'react';
import Button from '../../button';
import { TableTag, TD, TH, TR, TableContainer } from './style';

export interface SavedBanksIProps {
  id: number;
  accNo: string;
  accName: string;
  bank: string;
}

export interface TableIPropsIProps {
  data: SavedBanksIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: () => void;
}

function SavedBanksTable({
  data,
  setSelectedItem,
  headerData,
  onClick,
}: TableIPropsIProps) {
  return (
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
                <Button text='Delete' onClick={onClick} />
              </TD>
            </TR>
          ))}
        </tbody>
      </TableTag>
    </TableContainer>
  );
}

export default SavedBanksTable;
