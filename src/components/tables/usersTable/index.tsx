import { TableTag, TD, TH, TR, TableContainer } from './style';
import { TransactionCard } from '../..';
import { RxCaretRight } from 'react-icons/rx';
import { colors, currencyFormat, dateFormat, routesPath } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EmptySearchIcon } from '../../../assets/svg/emptySearch.svg';
import { Dictionary } from '@reduxjs/toolkit';

const { USERDETAILS } = routesPath;

export interface userDataIProps {
  id: number;
  name: string;
  userId: string;
  walletNo: string;
  email: string;
  phone: string;
  subAgents?: number;
  lastSeen?: string;
}

export interface TableIPropsIProps {
  type: string;
  data: userDataIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: (item: any) => void;
}

const emptyListCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function UsersTable({ data, headerData, type, onClick }: TableIPropsIProps) {
  return (
    <div>
      {data?.length >= 1 ? (
        <TableContainer>
          <TableTag>
            <thead>
              <tr>
                <TH></TH>
                <TH>{headerData.id}</TH>
                <TH>{headerData.name}</TH>
                <TH>{headerData.email}</TH>
                <TH>{headerData.walletNo}</TH>
                <TH>{headerData.phone}</TH>
                <TH>
                  {type === 'inactive' ? headerData.lastSeen : type === 'subagents' ? headerData.subAgents : null}
                </TH>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => (
                <TR key={item.id} onClick={() => onClick(item)}>
                  <TD></TD>
                  <TD>{item.id}</TD>
                  <TD>{item.name}</TD>
                  <TD>{item.email}</TD>
                  <TD>{item.walletNo}</TD>
                  <TD>{item.phone}</TD>
                  <TD>{type === 'inactive' ? item.lastSeen : type === 'subagents' ? item.subAgents : null}</TD>
                  <TD>
                    <RxCaretRight size={20} color={colors.grey} />
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableTag>
        </TableContainer>
      ) : (
        <div style={emptyListCenterStyle}>
          <EmptySearchIcon />
        </div>
      )}
    </div>
  );
}

export default UsersTable;
