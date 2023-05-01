import { useState } from "react";
import { ImageWithLabel } from "../../components";
import { AppContainer, KycCustomerView } from "../../atoms";
import { H1, H5 } from "../../styles";
import {
  CustomerContainer,
  CardContainer,
  CustomerContentOne,
  CustomerContentTwo,
  CustomerContentTwoVerified,
} from "./style";

import { colors, currencyFormat, dateFormat, images } from "../../utils";

const tabViewData = [
  { id: 1, isSelected: true, text: "Verified Users" },
  { id: 2, isSelected: false, text: "Pending Verifications" },
];

interface IPropsCard {
  text: string;
  helper: string;
}

function CustomerDataCard({ text, helper }: IPropsCard) {
  return (
    <CardContainer>
      <H5 left color={colors.primary}>
        {helper}
      </H5>
      <H5 left color={colors.grey}>
        {text}
      </H5>
    </CardContainer>
  );
}

function KycCustomer() {
  // states
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
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

  const date = new Date().toDateString();

  const userDetails: any = [
    {
      id: 1,
      helper: "Full Name",
      text: "Wade Warren Chukwuma",
    },

    {
      id: 2,
      helper: "Email",
      text: "wade@gmail.com",
    },

    {
      id: 3,
      helper: "Phone Number",
      text: "2348036329157",
    },

    {
      id: 4,
      helper: "BVN",
      text: "3094095959",
    },

    {
      id: 5,
      helper: "Residential Address",
      text: "Ason rock",
    },

    { id: 6, text: dateFormat(date), helper: "Date of Birth" },
    {
      id: 7,
      helper: "ID Number",
      text: "KKFHHFB",
    },
  ];

  return (
    <AppContainer navTitle='KYC'>
      <div>
        <CustomerContainer>
          <CustomerContentOne>
            {userDetails.map((item: any) => (
              <CustomerDataCard
                key={item.id}
                helper={item.helper}
                text={item.text}
              />
            ))}
          </CustomerContentOne>

          <CustomerContentTwo>
            <CustomerContentTwoVerified>
              <ImageWithLabel
                approved={true}
                imgSrc={images.user}
                text={"BVN Picture"}
              />
              <ImageWithLabel
                approved={true}
                imgSrc={images.user}
                text={"Uploaded Sefie"}
              />
            </CustomerContentTwoVerified>
            <KycCustomerView title={"National ID Card"} />
          </CustomerContentTwo>
        </CustomerContainer>
      </div>
    </AppContainer>
  );
}

export default KycCustomer;
