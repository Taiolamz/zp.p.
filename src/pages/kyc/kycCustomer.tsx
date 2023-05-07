import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ImageWithLabel } from "../../components";
import {
  AppContainer,
  KycCustomerView,
  ActivityActionModal,
  RejectionActionModal,
} from "../../atoms";
import { H5 } from "../../styles";
import {
  CustomerContainer,
  CardContainer,
  CustomerContentOne,
  CustomerContentTwo,
  CustomerContentTwoVerified,
} from "./style";
import { colors, dateFormat, images, routesPath } from "../../utils";
import { getKycCustomerRequest, getKycCustomerReset } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { Dictionary } from "../../types";

const { KYC } = routesPath;

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  let {
    state: { kycLvl },
  } = useLocation();

  // states
  const [customerData, setCustomerData] = useState<Dictionary>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectionIsModalVisible, setRejectionIsModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const date = new Date().toDateString();

  // redux state
  const kycCustomerState = useAppSelector((state) => state.getKycCustomer);
  const { status: kycCustomerStatus } = kycCustomerState;

  console.log(kycCustomerStatus, "kycCustomerStatus");

  useEffect(() => {
    dispatch(
      getKycCustomerRequest({
        id: id,
      })
    );
  }, []);

  useEffect(() => {
    if (kycCustomerStatus === "succeeded") {
      setCustomerData(kycCustomerState?.data?.user);
    }
  }, [kycCustomerState]);

  console.log(customerData, "customerData");

  const userDetails: any = [
    {
      id: 1,
      helper: "Full Name",
      text: customerData?.name,
    },

    {
      id: 2,
      helper: "Email",
      text: customerData?.email,
    },

    {
      id: 3,
      helper: "Phone Number",
      text: customerData?.telephone,
    },

    {
      id: 4,
      helper: "BVN",
      text: customerData?.bvn !== null ? customerData?.bvn?.bvn_number : "N/A",
    },

    {
      id: 5,
      helper: "Residential Address",
      text: customerData?.location,
    },

    { id: 6, text: dateFormat(date), helper: "Date of Birth" },
    {
      id: 7,
      helper: "ID Number",
      text: customerData?.nin !== null ? customerData?.nin : "N/A",
    },
  ];

  return (
    <AppContainer
      goBack={() => navigate(KYC)}
      navTitle={`KYC  |  ${kycLvl}`}
      navHelper='CUSTOMER`S DOC'>
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
            <KycCustomerView
              title={"National ID Card"}
              onClickApprove={() => {
                setIsModalVisible(true);
              }}
              onClickReject={() => {
                setRejectionIsModalVisible(true);
              }}
            />
          </CustomerContentTwo>
        </CustomerContainer>
        <ActivityActionModal
          actionClick={() => {}}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          text={`Are you sure you want to approve this customer's document`}
          actionText='Submit'
          image={images.list}
        />
        <RejectionActionModal
          actionClick={() => {}}
          closeModal={() => setRejectionIsModalVisible(false)}
          isModalVisible={rejectionIsModalVisible}
          title={`Select Rejection Reason`}
          actionText='Submit'
          image={images.reject}
          rejectionList={[
            { id: 1, value: "Allen", label: "Allen" },
            { id: 2, value: "Kardic", label: "Kardic" },
            { id: 3, value: "James", label: "James" },
          ]}
          rejectionValue={setRejectionReason}
        />
      </div>
    </AppContainer>
  );
}

export default KycCustomer;
