import { useState, useLayoutEffect } from 'react';
import { CountInfoCard } from '../../components';
import { Container, Content } from './style';
import { CountInfoCardIProps } from '../../components/cards/countInfoCard';

export interface CountInfoIProps {
  data: CountInfoCardIProps[];
  setSelectedData?: any;
  type?: string;
  shadow?: string;
}

function CountInfo({ data, setSelectedData, type, shadow }: CountInfoIProps) {
  const [dataList, setDataList] = useState(data as CountInfoCardIProps[]);

  useLayoutEffect(() => {
    let result: CountInfoCardIProps[] = [];
    data.forEach((item: CountInfoCardIProps) =>
      result.push({
        id: item.id,
        isSelected: type === 'settings' ? false : item.id === 1 ? true : false,
        count: item.count,
        title: item.title,
      }),
    );

    setDataList(result);
  }, [data]);

  const handleOnSelectCard = (item: CountInfoCardIProps) => {
    const itemToEdit = item;
    const updatedData: CountInfoCardIProps[] = [...dataList].map((el: CountInfoCardIProps) => {
      if (itemToEdit.title === el.title) {
        el.isSelected = true;
      } else {
        el.isSelected = false;
      }
      return el;
    });

    setSelectedData(itemToEdit);
    setDataList(updatedData);
  };

  return (
    <>
      <Container>
        {dataList.map((item: CountInfoCardIProps) => (
          <Content key={item.id}>
            <CountInfoCard
              isSelected={item.isSelected}
              onClick={() => handleOnSelectCard(item)}
              count={item.count}
              title={item.title}
              shadow={shadow}
            />
          </Content>
        ))}
      </Container>
    </>
  );
}

export default CountInfo;
