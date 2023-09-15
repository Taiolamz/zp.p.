import { TableTag, TD, TH, TR, TableContainer } from './style';
import { RxCaretRight } from 'react-icons/rx';
import { colors } from '../../../utils';
import { ReactComponent as EmptySearchIcon } from '../../../assets/svg/emptySearch.svg';
import { MoreIcon } from '../..';

export interface NotificationDataIProps {
  id: number;
  title: string;
  interval: string;
  createdBy: string;
  dateCreated: string;
}

export interface TableIPropsIProps {
  data: NotificationDataIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  type?: string;
  onClick?: any;
}

const emptyListCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function NotificationTable({ data, headerData, onClick, setSelectedItem, type }: TableIPropsIProps) {
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
                {type !== 'article' && <TH>{headerData.interval}</TH>}
                <TH>{headerData.createdBy}</TH>
                <TH>{headerData.dateCreated}</TH>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => (
                <TR key={item.articleId}>
                  <TD>{item.id}</TD>
                  <TD>{item.title}</TD>
                  {type !== 'article' && <TD>{item.interval}</TD>}
                  <TD>{item.createdBy}</TD>
                  <TD>{item.dateCreated}</TD>
                  <TD>
                    <div onClick={() => handleOnSelect(item)}>
                      <MoreIcon onClick={() => onClick(item)} />
                    </div>
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

export default NotificationTable;
