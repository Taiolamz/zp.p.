import { useState, useLayoutEffect } from "react";

import { KycLevelCard } from "../../components/index";

import { colors } from "../../utils";
import { Container, Content } from "./style";

import { KycLevelCardIProps } from "../../components/cards/kycLevelCard";

export interface KycLevelsIProps {
  data: KycLevelCardIProps[];
}

function KycLevels({ data }: KycLevelsIProps) {
  const [kycLevels, setKycLevels] = useState([] as KycLevelCardIProps[]);

  useLayoutEffect(() => {
    let result: KycLevelCardIProps[] = [];
    data.forEach((item: KycLevelCardIProps) =>
      result.push({
        id: item.id,
        isSelected: item.id === 1 ? true : false,
        count: item.count,
        title: item.title,
      })
    );

    setKycLevels(result);
  }, []);

  console.log(kycLevels, "data");

  const handleOnSelectCard = (item: KycLevelCardIProps) => {
    const itemToEdit = item;
    const updatedData: KycLevelCardIProps[] = [...kycLevels].map(
      (el: KycLevelCardIProps) => {
        if (itemToEdit.title === el.title) {
          el.isSelected = true;
        } else {
          el.isSelected = false;
        }
        return el;
      }
    );

    setKycLevels(updatedData);
  };
  return (
    <>
      <Container>
        {kycLevels.map((item: KycLevelCardIProps) => (
          <Content key={item.id}>
            <KycLevelCard
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

export default KycLevels;
