import { useState } from "react";
import { Container } from "./style";
import { TabButton } from "../../components";
import { TabIProps } from "../../components/tab";

export interface TabViewIPropsIProps {
  data: TabIProps[];
  setSelectedIndex: any[number];
  backgroundColor?: string;
  type?: string;
  tabViewSelectedIndex?: number;
}

function TabViewLoginHistory({
  data,
  backgroundColor,
  setSelectedIndex,
  tabViewSelectedIndex,
  type,
}: TabViewIPropsIProps) {
  const [dataList, setDataList] = useState(data);

  const handleOnSelect = (item: TabIProps) => {
    const itemToEdit = item;
    const updatedData: TabIProps[] = [...dataList].map((el: TabIProps) => {
      if (itemToEdit.text === el.text) {
        el.isSelected = true;
      } else {
        el.isSelected = false;
      }
      return el;
    });

    setDataList(updatedData);
    setSelectedIndex(itemToEdit.id);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Container backgroundColor={backgroundColor}>
          {dataList.map((item: TabIProps) => (
            <TabButton
              onClick={() => handleOnSelect(item)}
              key={item.id}
              isSelected={item.isSelected}
              text={item.text}
              paddingRight={dataList.length === item.id ? false : true}
              type={type}
              tabViewSelectedIndex={tabViewSelectedIndex}
            />
          ))}
        </Container>
      </div>
    </>
  );
}

export default TabViewLoginHistory;
