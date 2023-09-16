import { memo } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Container, InfluncerText, Image } from "./style";
import { H3, H6 } from "../../../styles";
import { colors, images } from "../../../utils";
import { Button } from "../..";

interface IProps {
  title: string;
  helper: string;
  onClick?: () => void;
  btnDisabled?: boolean;
}

function UserActivityCard({ title, helper, onClick, btnDisabled }: IProps) {
  return (
    <Container>
      <Image src={images.user} alt='user acount' />
      <H3 color={colors.grey} semiBold>
        {title}
      </H3>
      <InfluncerText>
        <H6>{helper}</H6>
      </InfluncerText>
      <Button
        color={colors.red}
        borderColor={colors.red}
        disabled={btnDisabled}
        onClick={onClick}
        secondary={true}
        text='Logout'
        icon={<RiLogoutBoxRLine size={"15px"} />}
      />
    </Container>
  );
}

export default memo(UserActivityCard);
