import { useState } from "react";
import {
  ContentContainer,
  TitleContainer,
  ActionBtnContainer,
  VerifyImageContainer,
  ImageComparisonContainer,
} from "./style";
import {
  BorderedText,
  OuterLabelButton,
  ImageWithLabel,
  Modal,
  ImageZoom,
} from "../../components";
import { H2, H6 } from "../../styles";
import { colors, boxShadow, spacing, images } from "../../utils";
import { FiCheck, FiX } from "react-icons/fi";

export interface IProps {
  onClickApprove?: () => void;
  onClickReject?: () => void;
  title: string;
}

const veriImage = [
  { id: 1, img: images.user, label: "ID Card (Front)" },
  { id: 2, img: images.user, label: "ID Card (Back)" },
];

function KycCustomerView({ onClickApprove, onClickReject, title }: IProps) {
  const [compareImgIsModalVisible, setCompareImgIsModalVisible] =
    useState(false);

  const openCompareImgModal = () => {
    setCompareImgIsModalVisible(true);
  };

  const closeCompareImgModal = () => {
    setCompareImgIsModalVisible(false);
  };
  return (
    <div>
      <ContentContainer>
        <TitleContainer>
          <H2 semiBold style={{ marginRight: spacing.small }}>
            {title}
          </H2>
          <BorderedText
            text='Compare Image'
            onClick={openCompareImgModal}
            backgroundColor={colors.primary}
            color={colors.white}
          />
        </TitleContainer>

        <VerifyImageContainer>
          {veriImage.map((item, index) => (
            <ImageWithLabel key={index} imgSrc={item.img} text={item.label} />
          ))}
        </VerifyImageContainer>

        <ActionBtnContainer>
          <OuterLabelButton
            onClick={onClickApprove}
            icon={<FiCheck size={30} color={colors.white} />}
            text='Approve'
          />
          <OuterLabelButton
            onClick={onClickReject}
            backgroundColor={colors.red}
            icon={<FiX size={30} color={colors.white} />}
            text='Reject'
          />
        </ActionBtnContainer>
      </ContentContainer>
      <Modal
        title={"Image Comparism"}
        isModalVisible={compareImgIsModalVisible}
        closeModal={closeCompareImgModal}>
        <ImageComparisonContainer>
          {veriImage.map((item, index) => (
            <ImageZoom
              key={index}
              height={"100%"}
              width={"100%"}
              imgAlt='kyc image'
              imgSrc={item.img}
              text={item.label}
            />
          ))}
        </ImageComparisonContainer>
      </Modal>
    </div>
  );
}

export default KycCustomerView;
