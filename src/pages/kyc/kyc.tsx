import { useState } from "react";
import {
  Pagination,
  UserDetailsCard,
  SearchInput,
  CurrentPageCard,
} from "../../components";
import { AppContainer, CountInfo } from "../../atoms";
import { SearchContainer } from "./style";

import { colors } from "../../utils";

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
        <CountInfo data={data} />
        <SearchContainer>
          <CurrentPageCard pageNumber={1} />
          <SearchInput
            backgroundColor={colors.white}
            name='SearchValue'
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            placeholder='Search Records'
          />
        </SearchContainer>
        <div>
          <UserDetailsCard
            header={true}
            id='#'
            userName='Profile Name'
            bvn='BVN'
            phoneNo='Phone Number'
            onClick={() => {}}
          />
          {userDetails.map((item: any) => (
            <UserDetailsCard
              key={item.id}
              id={item.id}
              userName={item.userName}
              bvn={item.bvn}
              phoneNo={item.phone}
              onClick={() => {}}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(selectedPage) => {
            setCurrentPage(selectedPage);
          }}
        />
      </div>
    </AppContainer>
  );
}

export default Kyc;
