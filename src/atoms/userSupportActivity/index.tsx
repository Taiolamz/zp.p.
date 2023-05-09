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
  onClick?: () => void;
  setSelectedItem: any;
}

const UserSupportActivity = ({
  data,
  onClick,
  setSelectedItem,
}: UserSupportActivitiesIProps) => {
  const handleSelectedItem = (item: UserSupportActivityIProps) => {
    console.log("item");
    setSelectedItem(item);
  };
  return (
    <Container>
      {data?.map((item: UserSupportActivityIProps) => (
        <BorderedText
          onClick={() => handleSelectedItem(item)}
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
