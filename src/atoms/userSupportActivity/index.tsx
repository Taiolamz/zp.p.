import { BorderedText } from "../../components";
import { colors } from "../../utils";
import { Container } from "./style";

export interface UserSupportActivityIProps {
  id: number;
  text: string;
  backgroundColor: string;
}

export interface UserSupportActivitiesIProps {
  data: UserSupportActivityIProps[];
}

const UserSupportActivity = ({ data }: UserSupportActivitiesIProps) => {
  return (
    <Container>
      {data?.map((item: UserSupportActivityIProps) => (
        <BorderedText
          key={item.id}
          text={item.text}
          backgroundColor={item.backgroundColor}
          color={colors.white}
        />
      ))}
    </Container>
  );
};

export default UserSupportActivity;
