import { TableTag, TD, TH, TR, TableContainer } from './style';
import { MoreIcon } from '../..';
import { colors, currencyFormat, dateFormat, capitalizeFirstLetter } from '../../../utils';
import { ReactComponent as EmptySearchIcon } from '../../../assets/svg/emptySearch.svg';
import { Dictionary } from '../../../types';

export interface RolesAndPermissionTableIPropsIProps {
  id?: number;
  title: string;
  permissionCount: string;
  userCount: string;
  createdBy: string;
  roleId?: string;
}

export interface RolesAndPermissionTableIProps {
  data: RolesAndPermissionTableIPropsIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData: Dictionary;
  onClick: (item: Dictionary) => any;
}

const emptyListCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function RolesAndPermissionTable({ data, setSelectedItem, headerData, onClick }: RolesAndPermissionTableIProps) {
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
                <TH>{headerData.title}</TH>
                <TH>{headerData.permissionCount}</TH>
                <TH>{headerData.userCount}</TH>
                <TH>{headerData.createdBy}</TH>
              </tr>
            </thead>

            <tbody>
              {data?.map((item: Dictionary, index: number) => (
                <TR key={index}>
                  <TD>{item.id}</TD>
                  <TD>{item.title}</TD>
                  <TD>{item.permissionCount}</TD>
                  <TD>{item.userCount}</TD>
                  <TD>{item.createdBy}</TD>
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

export default RolesAndPermissionTable;
