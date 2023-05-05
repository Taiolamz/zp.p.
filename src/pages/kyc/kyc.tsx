import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  SearchInput,
  CurrentPageCard,
  KycUserTable,
} from "../../components";
import { CountInfoCardIProps } from "../../components/cards/countInfoCard";
import { KycDataTableIPropsIProps } from "../../components/tables/kycUserTable";
import { AppContainer, CountInfo, TabView, LoaderModal } from "../../atoms";
import { SearchContainer, KYCTabViewContainer } from "./style";
import { Dictionary } from "../../types";
import { colors, routesPath } from "../../utils";
import { getKycsRequest, getKycsReset } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

const tabViewData = [
  { id: 1, isSelected: true, text: "Verified Users" },
  { id: 2, isSelected: false, text: "Pending Verifications" },
];
const { KYCDOC } = routesPath;
const kycLevelZero = "level zero";
const kycLevelOne = "level one";

function Kyc() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // states
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
  const data: CountInfoCardIProps[] = [
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

  const [kycData, setKycData] = useState<any[]>([]);
  const [selectedKycCard, setSelectedKycCard] = useState<Dictionary>({});
  const [selectedKycTable, setSelectedKycTable] = useState<Dictionary>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(5);

  // redux state
  const kycsState = useAppSelector((state) => state.getKycs);
  const { status: kycsStatus } = kycsState;

  // api
  useEffect(() => {
    dispatch(
      getKycsRequest({
        kycLevel: !selectedKycCard?.hasOwnProperty("id")
          ? kycLevelZero
          : selectedKycCard?.id === 1
          ? kycLevelZero
          : kycLevelOne,
      })
    );
  }, [selectedKycCard]);

  useEffect(() => {
    if (kycsStatus === "succeeded") {
      let updateData: KycDataTableIPropsIProps[] = [];

      kycsState.data.users.data.forEach((item: Dictionary, index: number) => {
        updateData.push({
          id: index + 1,
          userName: `${item?.bvn?.first_name} ${item?.bvn?.last_name}`,
          bvn: `${item?.bvn?.bvn_number}`,
          phoneNo: item?.telephone,
        });
      });
      setKycData(updateData);

      const {
        meta: { links },
      } = kycsState?.data?.users;

      setTotalPages(links.length - 2);
    }
  }, [kycsState]);
  return (
    <AppContainer navTitle='KYC'>
      <div>
        <KYCTabViewContainer>
          <TabView
            data={tabViewData}
            setSelectedIndex={setTabViewSelectedIndex}
          />
        </KYCTabViewContainer>
        <CountInfo data={data} setSelectedData={setSelectedKycCard} />
        <SearchContainer>
          <CurrentPageCard pageNumber={currentPage} />
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
          <KycUserTable
            setSelectedItem={setSelectedKycTable}
            headerData={{
              id: "#",
              userName: "Profile Name",
              bvn: "BVN",
              phoneNo: "Phone Number",
            }}
            data={kycData}
            onClick={() => {
              console.log(selectedKycTable, "Clicked");
            }}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(selectedPage) => {
            setCurrentPage(selectedPage);
          }}
        />

        <LoaderModal
          isModalVisible={kycsStatus === "loading"}
          text='Loading please wait...'
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default Kyc;
