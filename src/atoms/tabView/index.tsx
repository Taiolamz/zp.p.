import { useState, useLayoutEffect } from 'react';
import { Container } from './style';
import { Tab } from '../../components';
import { TabIProps } from '../../components/tab';

export interface TabViewIPropsIProps {
  data: TabIProps[];
  setSelectedIndex: any[number];
  backgroundColor?: string;
  type?: string;
  tabViewSelectedIndex?: number;
}

function TabView({
  data,
  backgroundColor,
  setSelectedIndex,
  tabViewSelectedIndex,
  type,
}: TabViewIPropsIProps) {
  const [dataList, setDataList] = useState<any[]>([]);
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

  useLayoutEffect(() => {
    setDataList(data);
  }, [data]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Container backgroundColor={backgroundColor}>
          {dataList.map((item: TabIProps) => (
            <Tab
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

export default TabView;
