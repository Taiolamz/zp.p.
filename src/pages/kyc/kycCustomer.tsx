import { useState } from "react";
import {
  Pagination,
  UserDetailsCard,
  SearchInput,
  CurrentPageCard,
} from "../../components";
import { AppContainer, CountInfo, TabView } from "../../atoms";
import { SearchContainer, KYCTabViewContainer } from "./style";

import { colors } from "../../utils";

const tabViewData = [
  { id: 1, isSelected: true, text: "Verified Users" },
  { id: 2, isSelected: false, text: "Pending Verifications" },
];

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

  const userDetails: any = [
    {
      id: 1,
      userName: "Wade Warren",
      bvn: 222233434555,
      phone: "+2348036329178",
    },

    {
      id: 2,
      userName: "Wade Warren",
      bvn: 222233434555,
      phone: "+2348036329178",
    },
    {
      id: 3,
      userName: "Wade Warren",
      bvn: 222233434555,
      phone: "+2348036329178",
    },
    {
      id: 4,
      userName: "Wade Warren",
      bvn: 222233434555,
      phone: "+2348036329178",
    },
    {
      id: 5,
      userName: "Wade Warren",
      bvn: 222233434555,
      phone: "+2348036329178",
    },
    {
      id: 6,
      userName: "Wade Warren",
      bvn: 222233434555,
      phone: "+2348036329178",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const totalPages = 5;

  return (
    <AppContainer navTitle='KYC'>
      <div>
        <div>kyc customer details</div>
        <div>kyc customer details</div>
        <div>kyc customer details</div>
        <div>kyc customer details</div>
      </div>
    </AppContainer>
  );
}

export default KycCustomer;
