import { memo } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Container, ViewContent } from "./style";
import { colors } from "../../utils";

interface IProps {
  onClick?: () => void;
}

function MoreIcon({ onClick }: IProps) {
  return (
    <Container>
      <ViewContent onClick={onClick}>
        <FiMoreVertical color={colors.white} size={20} />
      </ViewContent>
    </Container>
  );
}

export default memo(MoreIcon);
