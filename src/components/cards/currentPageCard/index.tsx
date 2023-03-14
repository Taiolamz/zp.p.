import { memo } from "react";

import { H3 } from "../../../styles";
import { colors } from "../../../utils";
import { Container, PageNumberContent } from "./style";

interface IProps {
  pageNumber?: number;
}

function CurrentPageCard({ pageNumber }: IProps) {
  return (
    <Container>
      <H3 semiBold left color={colors.primary}>
        Page
      </H3>
      <PageNumberContent>
        <H3 semiBold left color={colors.primary}>
          {pageNumber}
        </H3>
      </PageNumberContent>
    </Container>
  );
}

export default memo(CurrentPageCard);
