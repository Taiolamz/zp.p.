import { useState } from "react";
import { Container, Tab } from "./style";
// import { Tab } from "../../components";
import { TabIProps } from "../../components/tab";
import { colors } from "../../utils";
import { H1 } from "../../styles";

export interface TabViewUsersIPropsIProps {
  data: TabIProps[];
  setSelectedIndex: any[number];
  backgroundColor?: string;
}

function TabViewUsers({
  data,
  backgroundColor,
  setSelectedIndex,
}: TabViewUsersIPropsIProps) {
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
            <H1
              semiBold={item.isSelected}
              color={item.isSelected ? colors.primary : colors.greyVariantFour}
              style={{
                borderBottomColor: item.isSelected
                  ? colors.primary
                  : "transparent",
                borderBottomStyle: item.isSelected ? "solid" : "none",
                borderBottomWidth: item.isSelected ? 3 : 0,
                cursor: "pointer",
              }}
              onClick={() => handleOnSelect(item)}
              key={item.id}
            >
              {item.text}
            </H1>
          ))}
        </Container>
      </div>
    </>
  );
}

export default TabViewUsers;
