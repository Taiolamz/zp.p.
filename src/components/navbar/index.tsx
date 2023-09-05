import { memo } from 'react';
import { Container, Content, ImgContent, Divider, BackBtnContainer, HamburgerContainer } from './style';
import { H1, H4 } from '../../styles';
import { colors, images } from '../../utils';
import { FiArrowLeft } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
interface IProps {
  title: string;
  helper?: string;
  goBack?: () => void;
  onClick?: () => void;
}

function Navbar({ title, helper, goBack, onClick }: IProps) {
  return (
    <Container>
      <Content>
        <HamburgerContainer>
          <RxHamburgerMenu onClick={onClick} />
        </HamburgerContainer>
        {helper ? (
          <BackBtnContainer onClick={goBack}>
            <FiArrowLeft size={20} color={colors.grey} />
            <H4 color={colors.grey}>{title}</H4>
          </BackBtnContainer>
        ) : (
          <H1 semiBold>{title}</H1>
        )}
        {helper && <Divider />}
        {helper ? <H1 semiBold>{helper}</H1> : <H4>{helper}</H4>}
      </Content>

      <ImgContent src={images.logoBordered} alt="logo" />
    </Container>
  );
}

export default memo(Navbar);
