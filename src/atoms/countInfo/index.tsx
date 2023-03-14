import { useState, useLayoutEffect } from "react";
import { CountInfoCard } from "../../components";
import { Container, Content } from "./style";
import { CountInfoCardIProps } from "../../components/cards/countInfoCard";

export interface CountInfoIProps {
  data: CountInfoCardIProps[];
}

function CountInfo({ data }: CountInfoIProps) {
  const [dataList, setDataList] = useState([] as CountInfoCardIProps[]);

  useLayoutEffect(() => {
    let result: CountInfoCardIProps[] = [];
    data.forEach((item: CountInfoCardIProps) =>
      result.push({
        id: item.id,
        isSelected: item.id === 1 ? true : false,
        count: item.count,
        title: item.title,
      })
    );

    setDataList(result);
  }, []);

  const handleOnSelectCard = (item: CountInfoCardIProps) => {
    const itemToEdit = item;
    const updatedData: CountInfoCardIProps[] = [...dataList].map(
      (el: CountInfoCardIProps) => {
        if (itemToEdit.title === el.title) {
          el.isSelected = true;
        } else {
          el.isSelected = false;
        }
        return el;
      }
    );

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
            />
          </Content>
        ))}
      </Container>
    </>
  );
}

export default CountInfo;
