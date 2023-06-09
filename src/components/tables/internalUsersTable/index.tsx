import { TableTag, TD, TH, TR, TableContainer } from './style';
import { MoreIcon } from '../..';
import { colors, currencyFormat, dateFormat, capitalizeFirstLetter } from '../../../utils';
import { ReactComponent as EmptySearchIcon } from '../../../assets/svg/emptySearch.svg';
import { Dictionary } from '../../../types';

export interface InternalUsersTableIPropsIProps {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
  lastSeen: string;
  dateEnrolled: string;
}

export interface InternalUsersTableIProps {
  data: InternalUsersTableIPropsIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: (item: Dictionary) => any;
}

const emptyListCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function InternaUsersTable({ data, setSelectedItem, headerData, onClick }: any) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div>
      {data?.length >= 1 ? (
        <TableContainer>
          <TableTag>
            <thead>
              <tr>
                <TH></TH>
                <TH>{headerData.name}</TH>
                <TH>{headerData.email}</TH>
                <TH>{headerData.role}</TH>
                <TH>{headerData.status}</TH>
                <TH>{headerData.lastSeen}</TH>
                <TH>{headerData.dateEnrolled}</TH>
              </tr>
            </thead>

            <tbody>
              {data?.map((item: any, index: number) => (
                <TR key={index}>
                  <TD>{item.id}</TD>
                  <TD>{item.name}</TD>
                  <TD>{item.email}</TD>
                  <TD>{item.role}</TD>
                  <TD color={item.status ? colors.greenVariantTwo : colors.red}>
                    {capitalizeFirstLetter(item.status) ? 'Active' : 'Inactive'}
                  </TD>
                  <TD>{dateFormat(item.lastSeen)}</TD>
                  <TD>{dateFormat(item.dateEnrolled)}</TD>
                  <TD>
                    <MoreIcon onClick={() => onClick(item)} />
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

export default InternaUsersTable;
