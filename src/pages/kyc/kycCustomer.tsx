import { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

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
  console.log(kycLvl, "id");
  // states
  const [tabViewSelectedIndex, setTabViewSelectedIndex] =
    useState<any[number]>(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectionIsModalVisible, setRejectionIsModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

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
