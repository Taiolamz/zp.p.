import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ImageWithLabel } from "../../components";
import {
  AppContainer,
  KycCustomerView,
  ActivityActionModal,
  RejectionActionModal,
  LoaderModal,
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
import {
  getKycCustomerRequest,
  getKycCustomerReset,
  kycVerificationRequest,
  kycVerificationReset,
} from "../../redux/slice";
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

const verifiedUsers: string = "approved";
const pendingUsers: string = "pending";

function KycCustomer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  let {
    state: { kycLvl, verificationType },
  } = useLocation();

  // states
  const [customerData, setCustomerData] = useState<Dictionary>({});
  const [mediaData, setMediaData] = useState<Dictionary>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectionIsModalVisible, setRejectionIsModalVisible] = useState(false);
  const [successIsModalVisible, setSuccessIsModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [userVerificationId, setUserVerificationId] = useState("");
  const date = new Date().toDateString();

  // redux state
  const kycCustomerState = useAppSelector((state) => state.getKycCustomer);
  const { status: kycCustomerStatus } = kycCustomerState;

  const kycVerificationState = useAppSelector((state) => state.kycVerification);
  const { status: kycVerificationStatus } = kycVerificationState;

  const kycLevelOneStatic: string = "LEVEL 1";
  const kycLevelTwoStatic: string = "LEVEL 2";
  const kycLevelThreeStatic: string = "LEVEL 3";

  const kycVerificationbvn: string = "bvn-selfie-verification";
  const kycVerificationidentityCard: string = "identity-card-verification";
  const kycVerificationCACDocumentVerification: string =
    "cac document verification";
  const kycVerificationBusinessAddressVerification: string =
    "business address verification";

  function getKycVerificationIdFromVerificationList(
    list: any[],
    kycLevelState: string
  ) {
    let toFilterBy =
      kycLevelState === kycLevelOneStatic
        ? kycVerificationbvn
        : kycLevelState === kycLevelTwoStatic
        ? kycVerificationidentityCard
        : kycVerificationCACDocumentVerification;

    const result = list.filter((el) => el?.verification_type === toFilterBy);

    return result.length >= 1 ? result[0].id : "";
  }

  useEffect(() => {
    dispatch(
      getKycCustomerRequest({
        id: id,
      })
    );
  }, []);

  useEffect(() => {
    if (kycCustomerStatus === "succeeded") {
      const userVerificationId = getKycVerificationIdFromVerificationList(
        kycCustomerState?.data?.user?.verifications,
        kycLvl
      );

      setUserVerificationId(userVerificationId);

      setCustomerData(kycCustomerState?.data?.user);
      let result: any;
      if (kycLvl === kycLevelOneStatic && verificationType === pendingUsers)
        result = {
          verifyingImageTitle: "BVN Photo",
          approvedMedia: [],
          approvedMediaId: [],
          verifyingMedia: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.bvn_photo,
              label: "BVN Picture",
              imgAlt: "BVN Picture",
            },

            {
              id: 2,
              img: kycCustomerState?.data?.media?.selfie_photos.bvn,
              label: "Uploaded Selfie",
              imgAlt: "Uploaded Selfie",
            },
          ],
        };

      if (kycLvl === kycLevelTwoStatic && verificationType === pendingUsers)
        result = {
          verifyingImageTitle: "Identity Card",
          approvedMedia: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.bvn_photo,
              label: "BVN Picture",
              imgAlt: "BVN Picture",
              approved: true,
            },

            {
              id: 2,
              img: kycCustomerState?.data?.media?.selfie_photos?.bvn,
              label: "Uploaded Selfie",
              imgAlt: "Uploaded Selfie",
              approved: true,
            },
          ],
          approvedMediaId: [],
          verifyingMedia: [
            {
              id: 1,
              img:
                kycCustomerState?.data?.media?.identity_card !== null
                  ? kycCustomerState?.data?.media?.identity_card
                  : images.user,
              label: "Identity Card",
              imgAlt: "Identity Card",
            },
          ],
        };

      if (kycLvl === kycLevelThreeStatic && verificationType === pendingUsers)
        result = {
          verifyingImageTitle: "CAC Document",
          approvedMedia: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.bvn_photo,
              label: "BVN Picture",
              imgAlt: "BVN Picture",
              approved: true,
            },

            {
              id: 2,
              img: kycCustomerState?.data?.media?.selfie_photos?.bvn,
              label: "Uploaded Selfie",
              imgAlt: "Uploaded Selfie",
              approved: true,
            },
          ],
          approvedMediaId: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.identity_card,
              label: "Identity Card",
              imgAlt: "Identity Card",
              approved: true,
            },
          ],
          verifyingMedia: [
            {
              id: 1,
              img:
                kycCustomerState?.data?.media?.cac_document !== null
                  ? kycCustomerState?.data?.media?.cac_document
                  : images.user,
              label: "CAC Document",
              imgAlt: "CAC Document",
            },
          ],
        };

      if (kycLvl === kycLevelOneStatic && verificationType === verifiedUsers) {
        result = {
          verifyingImageTitle: "BVN Photo",
          approvedMedia: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.bvn_photo,
              label: "BVN Picture",
              imgAlt: "BVN Picture",
              approved: true,
            },

            {
              id: 2,
              img: kycCustomerState?.data?.media?.selfie_photos.bvn,
              label: "Uploaded Selfie",
              imgAlt: "Uploaded Selfie",
              approved: true,
            },
          ],
          approvedMediaId: [],
          verifyingMedia: [],
        };
      }

      if (kycLvl === kycLevelTwoStatic && verificationType === verifiedUsers) {
        result = {
          verifyingImageTitle: "BVN Photo",
          approvedMedia: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.bvn_photo,
              label: "BVN Picture",
              imgAlt: "BVN Picture",
              approved: true,
            },

            {
              id: 2,
              img: kycCustomerState?.data?.media?.selfie_photos.bvn,
              label: "Uploaded Selfie",
              imgAlt: "Uploaded Selfie",
              approved: true,
            },
          ],
          approvedMediaId: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.identity_card,
              label: "Identity Document",
              imgAlt: "Identity Document",
              approved: true,
            },
          ],
          verifyingMedia: [],
        };
      }

      if (
        kycLvl === kycLevelThreeStatic &&
        verificationType === verifiedUsers
      ) {
        result = {
          verifyingImageTitle: "BVN Photo",
          approvedMedia: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.bvn_photo,
              label: "BVN Picture",
              imgAlt: "BVN Picture",
              approved: true,
            },

            {
              id: 2,
              img: kycCustomerState?.data?.media?.selfie_photos.bvn,
              label: "Uploaded Selfie",
              imgAlt: "Uploaded Selfie",
              approved: true,
            },
          ],
          approvedMediaId: [
            {
              id: 1,
              img: kycCustomerState?.data?.media?.identity_card,
              label: "Identity Document",
              imgAlt: "Identity Document",
              approved: true,
            },
          ],
          approvedMediaCAC: [
            {
              id: 1,
              img:
                kycCustomerState?.data?.media?.cac_document !== null
                  ? kycCustomerState?.data?.media?.cac_document
                  : images.user,
              label: "CAC Document",
              imgAlt: "CAC Document",
              approved: true,
            },
          ],
          verifyingMedia: [],
        };
      }

      setMediaData(result);
    }
  }, [kycCustomerState]);

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

  useEffect(() => {
    dispatch(kycVerificationReset());
  }, []);

  useEffect(() => {
    if (kycVerificationStatus === "succeeded") {
      setSuccessIsModalVisible(true);
    }
  }, [kycVerificationState]);

  const handleApproveVerification = () => {
    dispatch(
      kycVerificationRequest({
        verificationId: userVerificationId,
        status: "approved",
      })
    );
  };

  const handleRejectVerification = () => {
    dispatch(
      kycVerificationRequest({
        verificationId: userVerificationId,
        status: "rejected",
        comment: rejectionReason,
      })
    );
  };

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
              {mediaData.hasOwnProperty("approvedMedia") &&
                mediaData?.approvedMedia?.map((item: any) => (
                  <ImageWithLabel
                    approved={item.approved}
                    imgSrc={item.img}
                    text={item.label}
                    imgAlt={item.imgAlt}
                  />
                ))}
            </CustomerContentTwoVerified>

            <CustomerContentTwoVerified>
              {mediaData.hasOwnProperty("approvedMediaId") &&
                mediaData?.approvedMediaId?.map((item: any) => (
                  <ImageWithLabel
                    approved={item.approved}
                    imgSrc={item.img}
                    text={item.label}
                    imgAlt={item.imgAlt}
                  />
                ))}
            </CustomerContentTwoVerified>

            {verificationType === verifiedUsers && (
              <CustomerContentTwoVerified>
                {mediaData.hasOwnProperty("approvedMediaId") &&
                  mediaData?.approvedMediaCAC?.map((item: any) => (
                    <ImageWithLabel
                      approved={item.approved}
                      imgSrc={item.img}
                      text={item.label}
                      imgAlt={item.imgAlt}
                    />
                  ))}
              </CustomerContentTwoVerified>
            )}

            {verificationType === pendingUsers && (
              <KycCustomerView
                title={
                  mediaData.hasOwnProperty("verifyingImageTitle")
                    ? mediaData?.verifyingImageTitle
                    : ""
                }
                verifingImages={
                  mediaData.hasOwnProperty("verifyingMedia")
                    ? mediaData?.verifyingMedia
                    : []
                }
                onClickApprove={() => {
                  setIsModalVisible(true);
                }}
                onClickReject={() => {
                  setRejectionIsModalVisible(true);
                }}
              />
            )}
          </CustomerContentTwo>
        </CustomerContainer>
        <ActivityActionModal
          actionClick={handleApproveVerification}
          closeModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          text={`Are you sure you want to approve this customer's document`}
          actionText='Submit'
          secondaryActionText='Cancel'
          image={images.list}
          isLoading={kycVerificationStatus === "loading"}
        />
        <RejectionActionModal
          actionClick={handleRejectVerification}
          closeModal={() => setRejectionIsModalVisible(false)}
          isModalVisible={rejectionIsModalVisible}
          title={`Select Rejection Reason`}
          actionText='Submit'
          image={images.reject}
          rejectionList={[
            { id: 1, value: "Blurry Image", label: "Blurry Image" },
            {
              id: 2,
              value: "Selfie is different from BVN Image",
              label: "Selfie is different from BVN Image",
            },
            {
              id: 3,
              value: "Poor Background lightening",
              label: "Poor Background lightening",
            },
            {
              id: 4,
              value: "Image not fully captured",
              label: "Image not fully captured",
            },
            { id: 5, value: "Invalid Image", label: "Invalid Image" },
          ]}
          rejectionValue={setRejectionReason}
          isLoading={kycVerificationStatus === "loading"}
        />

        {/*ACTIVITY CONCLUSION MODAL */}

        <ActivityActionModal
          actionClick={() => navigate(KYC)}
          closeModal={() => navigate(KYC)}
          isModalVisible={successIsModalVisible}
          text={`You have successfully approved the customer's documents`}
          actionText='Close'
          image={images.check}
        />

        <LoaderModal
          isModalVisible={kycCustomerStatus === "loading"}
          text='Loading please wait...'
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default KycCustomer;
