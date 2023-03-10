import { useState } from "react";
import { KycLevels } from "../../atoms";
import { Container } from "./style";
import { AppContainer } from "../../styles";
function Kyc() {
  const data = [
    {
      id: 1,
      count: 45,
      title: "Level 1",
    },
    {
      id: 2,
      count: 55,
      title: "Level 2",
    },
    {
      id: 3,
      count: 75,
      title: "Level 3",
    },
    {
      id: 4,
      count: 45,
      title: "Agency",
    },
  ];
  return (
    <AppContainer>
      <KycLevels data={data} />
    </AppContainer>
  );
}

export default Kyc;
