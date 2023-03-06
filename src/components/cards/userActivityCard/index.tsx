import { memo } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Container, InfluncerText, Image } from "./style";
import { H2, H6 } from "../../../styles";
import { colors, images } from "../../../utils";
import { Button } from "../../index";

interface IProps {
  title: string;
  helper: string;
  onClick?: () => void;
}

function UserActivityCard({ title, helper, onClick }: IProps) {
  return (
    <Container>
      <Image src={images.user} alt='user acount' />
      <H2 color={colors.grey} semiBold>
        {title}
      </H2>
      <InfluncerText>
        <H6>{helper}</H6>
      </InfluncerText>
      <Button
        onClick={onClick}
        secondary={true}
        text='Logout'
        icon={<RiLogoutBoxRLine size={"15px"} />}
      />
    </Container>
  );
}

export default memo(UserActivityCard);
