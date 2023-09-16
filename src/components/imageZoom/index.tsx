import { memo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Container, Image } from "./style";
import { H5 } from "../../styles";
import { colors, images } from "../../utils";

interface IProps {
  text: string;
  imgSrc: string;
  imgAlt: string;
  backgroundColor?: string;
  labelColor?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
}

function ImageZoom({
  text,
  imgSrc,
  imgAlt,
  backgroundColor,
  labelColor,
  height,
  width,
}: IProps) {
  return (
    <Container>
      <TransformWrapper>
        <TransformComponent>
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
          />
        </TransformComponent>
      </TransformWrapper>

      <H5 semiBold left color={labelColor ? labelColor : colors.grey}>
        {text}
      </H5>
    </Container>
  );
}

export default memo(ImageZoom);
