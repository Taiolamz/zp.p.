import { useState, useEffect, useLayoutEffect } from "react";
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
import {
  getKycsRequest,
  getKycsReset,
  getKycsAnalyticsRequest,
  getKycsAnalyticsReset,
} from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

const tabViewData = [
  { id: 1, isSelected: true, text: "Verified Users" },
  { id: 2, isSelected: false, text: "Pending Verifications" },
];
const { KYCDOC } = routesPath;
const kycLevelZero = "?level=level zero&include=bvn";
const kycLevelOne = "?level=level one&include=bvn";
const kycLevelTwo = "?level=level two&include=bvn";

const verifiedKycLevelOne = "/verified?level=level one";
const verifiedKycLevelTwo = "/verified?level=level two";

const verifiedUsers: string = "approved";
const pendingUsers: string = "pending";

function Kyc() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // states
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);

  const [kycData, setKycData] = useState<any[]>([]);
  const [kycCountList, setKycCountList] = useState<any[]>([]);
  const [selectedKycCard, setSelectedKycCard] = useState<Dictionary>({});
  const [selectedKycTable, setSelectedKycTable] = useState<Dictionary>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(5);

  // redux state
  const kycsState = useAppSelector((state) => state.getKycs);
  const { status: kycsStatus } = kycsState;
  const kycsAnalyticsState = useAppSelector((state) => state.getKycsAnalytics);
  const { status: kycsAnalyticsStatus } = kycsAnalyticsState;

  function determineKycToFetch() {
    let result: string;
    // Tab View for verified user
    if (tabViewSelectedIndex === 1) {
      if (!selectedKycCard?.hasOwnProperty("id")) {
        result = verifiedKycLevelOne;
      } else if (selectedKycCard?.id === 2) {
        result = verifiedKycLevelTwo;
      } else if (selectedKycCard?.id === 3) {
        result = kycLevelTwo;
      } else {
        result = verifiedKycLevelOne;
      }
    }
    // Tab View for unverified users
    else {
      if (!selectedKycCard?.hasOwnProperty("id")) {
        result = kycLevelZero;
      } else if (selectedKycCard?.id === 1) {
        result = kycLevelZero;
      } else if (selectedKycCard?.id === 2) {
        result = kycLevelOne;
      } else if (selectedKycCard?.id === 3) {
        result = kycLevelTwo;
      } else if (selectedKycCard?.id === 4) {
        result = kycLevelTwo;
      } else {
        result = kycLevelZero;
      }
    }

    return result;
  }

  let kycLevel = determineKycToFetch();

  // api
  useEffect(() => {
    dispatch(
      getKycsRequest({
        kycLevel: `${kycLevel}&term=${searchValue}`,
      })
    );
  }, [selectedKycCard, tabViewSelectedIndex, searchValue]);

  useEffect(() => {
    if (kycsStatus === "succeeded") {
      let updateData: KycDataTableIPropsIProps[] = [];

      kycsState.data.users.data.forEach((item: Dictionary, index: number) => {
        updateData.push({
          id: index + 1,
          userName: `${item?.bvn?.first_name} ${item?.bvn?.last_name}`,
          bvn: item?.bvn?.bvn_number ? ` ${item?.bvn?.bvn_number}` : "N/A",
          phoneNo: item?.telephone,
          detailsId:
            selectedKycCard?.hasOwnProperty("id") &&
            item?.bvn.hasOwnProperty("id")
              ? item?.bvn?.id
              : item?.id,
        });
      });
      setKycData(updateData);

      const {
        meta: { links },
      } = kycsState?.data?.users;

      setTotalPages(links.length - 2);
    }
  }, [kycsState]);

  // kycsAnalyticsStatus

  useEffect(() => {
    dispatch(
      getKycsAnalyticsRequest({
        kycType: tabViewSelectedIndex === 1 ? verifiedUsers : pendingUsers,
      })
    );
  }, [tabViewSelectedIndex]);

  useEffect(() => {
    if (kycsAnalyticsStatus === "succeeded") {
      let result: CountInfoCardIProps[];
      if (tabViewSelectedIndex === 1) {
        result = [
          {
            id: 1,
            count: kycsAnalyticsState?.data?.level_one_kyc_count,
            title: "Level 1",
          },
          {
            id: 2,
            count: kycsAnalyticsState?.data?.level_two_kyc_count,
            title: "Level 2",
          },
          {
            id: 3,
            count: kycsAnalyticsState?.data?.level_three_kyc_count,
            title: "Agency",
          },
        ];
      } else {
        result = [
          {
            id: 1,
            count: kycsAnalyticsState?.data?.level_one_kyc_count,
            title: "Level 1",
          },
          {
            id: 2,
            count: kycsAnalyticsState?.data?.level_two_kyc_count,
            title: "Level 2",
          },
          {
            id: 3,
            count: kycsAnalyticsState?.data?.agency_count,
            title: "Agency (Level 3)",
          },
          {
            id: 4,
            count: kycsAnalyticsState?.data?.business_address_count,
            title: "Business Address",
          },
        ];
      }

      setKycCountList(result);
    }
  }, [kycsAnalyticsState]);

  // console.log(kycData, "data");
  return (
    <AppContainer navTitle='KYC'>
      <div>
        <KYCTabViewContainer>
          <TabView
            data={tabViewData}
            setSelectedIndex={setTabViewSelectedIndex}
          />
        </KYCTabViewContainer>
        <CountInfo data={kycCountList} setSelectedData={setSelectedKycCard} />
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
