import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  SearchInput,
  CurrentPageCard,
  KycUserTable,
  BorderedText,
} from "../../components";
import { CountInfoCardIProps } from "../../components/cards/countInfoCard";
import { KycDataTableIPropsIProps } from "../../components/tables/kycUserTable";
import {
  AppContainer,
  CountInfo,
  TabView,
  LoaderModal,
  BusinessAddressVerificationModal,
  ActivityActionModal,
} from "../../atoms";
import {
  SearchContainer,
  KYCTabViewContainer,
  SearchInputContainer,
} from "./style";
import { Dictionary } from "../../types";
import { colors, routesPath, spacing, images } from "../../utils";
import {
  getKycsRequest,
  getKycsReset,
  getKycsAnalyticsRequest,
  getKycsAnalyticsReset,
  kycVerificationRequest,
  kycVerificationReset,
  getKycCustomerRequest,
  getKycCustomerReset,
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
const kycLevelAgency =
  "/fetchAgentVerification?level=level two&filterBy=cac document verification&include=bvn";
const kycLevelBusinessAdress =
  "/fetchAgentVerification?level=level two&filterBy=address verification&include=bvn";

const verifiedKycLevelOne = "/verified?level=level one";
const verifiedKycLevelTwo = "/verified?level=level two";
const verifiedKycLevelThree = "/verified?level=level three";

const verifiedUsers: string = "approved";
const pendingUsers: string = "pending";

const emptyListCenterStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const kycVerificationBusinessAddressVerification: string =
  "business address verification";

function getKycVerificationIdFromVerificationList(list: any[]) {
  let toFilterBy = kycVerificationBusinessAddressVerification;

  const result = list.filter((el) => el?.verification_type === toFilterBy);

  return result.length >= 1 ? result[0].id : "";
}

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
  const [isSearching, setIsSearching] = useState(false);
  const [businessAddressIsModalVisible, setBusinessAddressIsModalVisible] =
    useState(false);
  const [userVerificationId, setUserVerificationId] = useState("");
  const [customerData, setCustomerData] = useState<Dictionary>({});
  const [successIsModalVisible, setSuccessIsModalVisible] = useState(false);
  // redux state
  const kycsState = useAppSelector((state) => state.getKycs);
  const { status: kycsStatus } = kycsState;
  const kycsAnalyticsState = useAppSelector((state) => state.getKycsAnalytics);
  const { status: kycsAnalyticsStatus } = kycsAnalyticsState;
  const kycCustomerState = useAppSelector((state) => state.getKycCustomer);
  const { status: kycCustomerStatus } = kycCustomerState;
  const kycVerificationState = useAppSelector((state) => state.kycVerification);
  const { status: kycVerificationStatus } = kycVerificationState;
  function determineKycToFetch() {
    let result: Dictionary;

    // Tab View for verified user
    if (tabViewSelectedIndex === 1) {
      if (!selectedKycCard?.hasOwnProperty("id")) {
        result = { path: verifiedKycLevelOne, level: "LEVEL 1" };
      } else if (selectedKycCard?.id === 2) {
        result = { path: verifiedKycLevelTwo, level: "LEVEL 2" };
      } else if (selectedKycCard?.id === 3) {
        result = { path: verifiedKycLevelThree, level: "LEVEL 3" };
      } else {
        result = { path: verifiedKycLevelOne, level: "LEVEL 1" };
      }
    }
    // Tab View for unverified users
    else {
      if (!selectedKycCard?.hasOwnProperty("id")) {
        result = { path: kycLevelZero, level: "LEVEL 1" };
      } else if (selectedKycCard?.id === 1) {
        result = { path: kycLevelZero, level: "LEVEL 1" };
      } else if (selectedKycCard?.id === 2) {
        result = { path: kycLevelOne, level: "LEVEL 2" };
      } else if (selectedKycCard?.id === 3) {
        result = { path: kycLevelAgency, level: "LEVEL 3" };
      } else if (selectedKycCard?.id === 4) {
        result = { path: kycLevelBusinessAdress, level: "LEVEL 3" };
      } else {
        result = { path: kycLevelZero, level: "LEVEL 1" };
      }
    }

    return result;
  }

  let kycLevel = determineKycToFetch();

  // api
  useEffect(() => {
    dispatch(
      getKycsRequest({
        kycLevel: `${kycLevel.path}&term=${searchValue}`,
      })
    );
  }, [selectedKycCard, tabViewSelectedIndex, isSearching]);

  useEffect(() => {
    if (kycsStatus === "succeeded") {
      let updateData: KycDataTableIPropsIProps[] = [];

      kycsState.data.users.data.forEach((item: Dictionary, index: number) => {
        updateData.push({
          id: index + 1,
          userName: `${item?.bvn?.first_name} ${item?.bvn?.last_name}`,
          bvn: item?.bvn?.bvn_number ? ` ${item?.bvn?.bvn_number}` : "N/A",
          phoneNo: item?.telephone,
          detailsId: item?.id,
        });
      });
      setKycData(updateData);

      const {
        meta: { links },
      } = kycsState?.data?.users;

      setTotalPages(links.length - 2);
    }
  }, [kycsState]);

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

  // Navigate user to kyc doc page when user clicks on a table view button
  useEffect(() => {
    if (
      selectedKycTable.hasOwnProperty("id") &&
      selectedKycCard?.title !== "Business Address"
    ) {
      navigate(`${KYCDOC}${selectedKycTable?.detailsId}`, {
        state: {
          kycLvl: kycLevel?.level,
          verificationType:
            tabViewSelectedIndex === 1 ? verifiedUsers : pendingUsers,
        },
      });
    }

    if (
      selectedKycTable.hasOwnProperty("id") &&
      selectedKycCard?.title === "Business Address"
    ) {
      dispatch(
        getKycCustomerRequest({
          id: selectedKycTable?.detailsId,
        })
      );
      setBusinessAddressIsModalVisible(true);
    }
  }, [selectedKycTable]);

  // reset both kycCustomer api and verification api when the page first loads
  useEffect(() => {
    dispatch(kycVerificationReset());
    dispatch(getKycCustomerReset());
  }, []);

  useEffect(() => {
    if (kycCustomerStatus === "succeeded") {
      const userVerificationIdItem = getKycVerificationIdFromVerificationList(
        kycCustomerState?.data?.user?.verifications
      );

      setUserVerificationId(userVerificationIdItem);

      setCustomerData(kycCustomerState?.data?.user);
    }
  }, [kycCustomerState]);

  const businessAddressData = [
    {
      id: 1,
      text: customerData?.name,
      helper: "Full Name",
    },
    {
      id: 2,
      text: customerData?.telephone,
      helper: "Phone Number",
    },
    {
      id: 3,
      text: customerData?.email,
      helper: "Email",
    },
    {
      id: 4,
      text: customerData?.bvn !== null ? customerData?.bvn?.bvn_number : "N/A",
      helper: "BVN",
    },
    {
      id: 5,
      text: customerData?.location !== null ? customerData?.location : "N/A",
      helper: "Residential Address",
    },
    {
      id: 6,
      text:
        customerData?.created_at !== null
          ? new Date(customerData?.created_at).toDateString()
          : "N/A",
      helper: "Date Assigned",
    },
  ];

  useEffect(() => {
    if (kycVerificationStatus === "succeeded") {
      setSuccessIsModalVisible(true);
    }
  }, [kycVerificationState]);

  const handleVerifyBusinessAddress = () => {
    dispatch(
      kycVerificationRequest({
        verificationId: userVerificationId,
        status: "approved",
      })
    );
  };

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
          <SearchInputContainer>
            <SearchInput
              backgroundColor={colors.white}
              name='SearchValue'
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length === 0) {
                  setIsSearching(!isSearching);
                }
                setSearchValue(e.target.value);
              }}
              placeholder='Search Records'
            />
            <div style={{ marginLeft: spacing.xsmall }}>
              <BorderedText
                color={colors.white}
                backgroundColor={colors.primary}
                text='Search'
                onClick={() => setIsSearching(!isSearching)}
              />
            </div>
          </SearchInputContainer>
        </SearchContainer>
        {kycData.length >= 1 ? (
          <div>
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
                onClick={() => {}}
              />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(selectedPage) => {
                setCurrentPage(selectedPage);
              }}
            />
          </div>
        ) : (
          <div style={emptyListCenterStyle}>
            <img src={images.emptyList} alt='Empty container' />
          </div>
        )}

        <div onClick={() => setBusinessAddressIsModalVisible(true)}>open</div>
        <BusinessAddressVerificationModal
          isLoading={
            kycCustomerStatus === "loading" ||
            kycVerificationStatus === "loading"
          }
          data={businessAddressData}
          isModalVisible={businessAddressIsModalVisible}
          onClickVerify={handleVerifyBusinessAddress}
          closeModal={() => setBusinessAddressIsModalVisible(false)}
        />

        <ActivityActionModal
          actionClick={() => {
            setSuccessIsModalVisible(false);
            setBusinessAddressIsModalVisible(false);
          }}
          closeModal={() => {
            setSuccessIsModalVisible(false);
            setBusinessAddressIsModalVisible(false);
          }}
          isModalVisible={successIsModalVisible}
          text={`You have successfully approved the customer's address`}
          actionText='Close'
          image={images.check}
        />

        <LoaderModal
          isModalVisible={
            kycsStatus === "loading" || kycsAnalyticsStatus === "loading"
          }
          text='Loading please wait...'
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default Kyc;
