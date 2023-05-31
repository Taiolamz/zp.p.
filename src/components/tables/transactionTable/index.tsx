import { TableTag, TD, TH, TR, TableContainer } from './style';
import { TransactionCard, MoreIcon } from '../..';
import { colors, currencyFormat, dateFormat, capitalizeFirstLetter } from '../../../utils';
import { ReactComponent as EmptySearchIcon } from '../../../assets/svg/emptySearch.svg';

export interface TableIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
}

const emptyListCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function TransactionTable({ data, setSelectedItem, headerData, type, onClick }: any) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
    onClick(item);
    // setMoreIsVisible(true);
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
                <TH>{headerData.tid}</TH>
                <TH>{headerData.amount}</TH>
                <TH>{headerData.type}</TH>
                <TH>{headerData.status}</TH>
                <TH>{headerData.time}</TH>
              </tr>
            </thead>

            {type === 'transactions' && (
              <tbody>
                {data?.map((item: any, index: number) => (
                  <TR key={index} onClick={() => handleOnSelect(item)}>
                    <TD>{item.id}</TD>
                    <TD>{item.name}</TD>
                    <TD>{item.tid}</TD>
                    <TD>{currencyFormat(item.amount, false, item.currency)}</TD>
                    <TD>{capitalizeFirstLetter(item.type)}</TD>
                    <TD color={item.status === 'success' ? colors.greenVariantTwo : colors.red}>
                      {item.status === 'success' ? 'Successful' : 'Unseccessful'}
                    </TD>
                    <TD>{dateFormat(item.time)}</TD>
                    <TD>
                      <MoreIcon onClick={onClick} />
                    </TD>
                  </TR>
                ))}
              </tbody>
            )}

            {type === 'mainTransactions' && (
              <tbody>
                {data?.map((item: any, index: number) => (
                  <TR style={{ cursor: 'pointer' }} key={index} onClick={() => onClick(item)}>
                    <TD>{item.id}</TD>
                    <TD>{item.name}</TD>
                    <TD>{item.tid}</TD>
                    <TD>{currencyFormat(item.amount, false, item.currency)}</TD>
                    <TD>{capitalizeFirstLetter(item.type)}</TD>
                    <TD color={item.status === 'success' ? colors.greenVariantTwo : colors.red}>
                      {item.status === 'success' ? 'Successful' : 'Unseccessful'}
                    </TD>
                    <TD>{dateFormat(item.time)}</TD>
                    <TD>{/* <MoreIcon onClick={onClick} /> */}</TD>
                  </TR>
                ))}
              </tbody>
            )}

            {type === 'billHistory' && (
              <div>
                {data.map((item: any) => (
                  <TransactionCard
                    cardType={type}
                    key={item.id}
                    onClick={() => handleOnSelect(item)}
                    id={item.id}
                    tid={item.tid}
                    name={item.name}
                    amount={item.name}
                    status={item.status}
                    type={item.type}
                    time={item.type}
                  />
                ))}
              </div>
            )}
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

export default TransactionTable;
