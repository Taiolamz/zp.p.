import { memo } from 'react';

import { H6, H7 } from '../../../styles';
import { colors } from '../../../utils';
import { Container } from './style';
import { FaSquareFull } from 'react-icons/fa';

export interface LevelCardIPropsIProps {
  id: number;
  level: string;
  count: number;
  iconColor: string;
}
export interface LevelCardIProps {
  data: LevelCardIPropsIProps[];
}

function LevelCard({ data }: LevelCardIProps) {
  console.log(data);
  return (
    <>
      {data?.map(item => {
        return (
          <Container key={item.id}>
            <FaSquareFull size={7} color={item.iconColor} />
            <H6 left color={colors.primary}>
              {item.level}
            </H6>
            <H6 left semiBold color={colors.primary}>
              {item.count}
            </H6>
          </Container>
        );
      })}
    </>
  );
}

export default memo(LevelCard);
