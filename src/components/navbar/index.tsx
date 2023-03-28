import { memo } from "react";
import { Container, Content, ImgContent, Divider } from "./style";
import { H1, H4 } from "../../styles";
import { colors, images } from "../../utils";

interface IProps {
  title: string;
  helper?: string;
}

function Navbar({ title, helper }: IProps) {
  return (
    <Container>
      <Content>
        {helper ? (
          <H4 color={colors.grey}>{title}</H4>
        ) : (
          <H1 semiBold>{title}</H1>
        )}
        {helper && <Divider />}
        {helper ? <H1 semiBold>{helper}</H1> : <H4>{helper}</H4>}
      </Content>

      <ImgContent src={images.logoBordered} alt='logo' />
    </Container>
  );
}

export default memo(Navbar);
