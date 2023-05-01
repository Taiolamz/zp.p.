import { memo } from "react";
import { Container, ApproveContainer, Image } from "./style";
import { H5, H6, H7 } from "../../styles";
import { colors, spacing, images, borderRadius } from "../../utils";

interface IProps {
  text: string;
  imgSrc: string;
  backgroundColor?: string;
  labelColor?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
  approved?: boolean;
}

const verifiedStyle = {
  backgroundColor: colors.greenVariantFive,
  borderRadius: borderRadius.medium,
  paddingRight: 5,
  paddingLeft: 5,
};

function ImageWithLabel({
  text,
  imgSrc,
  backgroundColor,
  labelColor,
  height,
  width,
  approved = false,
}: IProps) {
  return (
    <Container>
      {approved && (
        <div>
          <ApproveContainer>
            <H6 semiBold left color={labelColor ? labelColor : colors.grey}>
              {text}
            </H6>
            <div style={verifiedStyle}>
              <H7 semiBold color={labelColor ? labelColor : colors.white}>
                Verified
              </H7>
            </div>
          </ApproveContainer>

          <Image
            approved={approved}
            src={imgSrc}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
          />
        </div>
      )}

      {!approved && (
        <div>
          <Image
            approved={approved}
            src={imgSrc}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
          />
          <H5 semiBold left color={labelColor ? labelColor : colors.grey}>
            {text}
          </H5>
        </div>
      )}
    </Container>
  );
}

export default memo(ImageWithLabel);
