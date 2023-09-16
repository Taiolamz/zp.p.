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
  navBarContentRight?: any
}

function Navbar({ title, helper, goBack, onClick, navBarContentRight }: IProps) {
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

      <div className='tw-flex tw-items-center tw-gap-x-2'>
        {navBarContentRight}
        <ImgContent src={images.logoBordered} alt="logo" />
      </div>
    </Container>
  );
}

export default memo(Navbar);
