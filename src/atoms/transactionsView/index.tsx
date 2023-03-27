import { TransactionContainer } from "./style";
import { TransactionCard } from "../../components";
import { currencyFormat, dateFormat } from "../../utils";

export interface TabViewIPropsIProps {
  type: string;
  data: any[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
}

function TransactionsView({
  data,
  backgroundColor,
  setSelectedItem,
  header = false,
  headerData,
  type,
}: any) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
    // setMoreIsVisible(true);
  };

  return (
    <>
      <div>
        {header && headerData && (
          <div style={{ display: "flex" }}>
            <TransactionContainer backgroundColor={"transparent"}>
              <TransactionCard
                header={true}
                onClick={() => {}}
                id={headerData.id}
                tid={headerData.tid}
                name={headerData.name}
                amount={headerData.amount}
                status={headerData.status}
                type={headerData.type}
                time={headerData.time}
              />
            </TransactionContainer>
          </div>
        )}
        <TransactionContainer backgroundColor={backgroundColor}>
          {type === "transactions" && (
            <div>
              {data.map((item: any) => (
                <TransactionCard
                  cardType={type}
                  key={item.id}
                  onClick={() => handleOnSelect(item)}
                  id={item.id}
                  tid={item.tid}
                  name={item.name}
                  amount={currencyFormat(item.amount, false, item.currency)}
                  status={item.status}
                  type={item.type}
                  time={dateFormat(item.time)}
                  icon={item.icon}
                />
              ))}
            </div>
          )}

          {type === "billHistory" && (
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
        </TransactionContainer>
      </div>
    </>
  );
}

export default TransactionsView;
