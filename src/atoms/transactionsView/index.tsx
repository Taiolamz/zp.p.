import { TransactionContainer } from "./style";
import { TransactionCard } from "../../components";

export interface TabViewIPropsIProps {
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
}: any) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
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
                amount={headerData.name}
                status={headerData.status}
                type={headerData.type}
                time={headerData.type}
              />
            </TransactionContainer>
          </div>
        )}
        <TransactionContainer backgroundColor={backgroundColor}>
          {data.map((item: any) => (
            <TransactionCard
              key={item.id}
              onClick={() => handleOnSelect(item)}
              id={item.id}
              tid={item.tid}
              name={item.name}
              amount={item.name}
              status={item.status}
              type={item.type}
              time={item.type}
              icon={item.icon}
            />
          ))}
        </TransactionContainer>
      </div>
    </>
  );
}

export default TransactionsView;
