// import React from 'react';

import { BorderedText } from '../../components';
import { H2 } from '../../styles';
import { colors } from '../../utils';
import { Container } from './style';

export interface SupportFunctionIProps {
  supportFunctionItems: any[];
}

const SupportFunction = ({ supportFunctionItems }: SupportFunctionIProps) => {
  return (
    <Container>
      {supportFunctionItems.map((item) => (
        <BorderedText
          text={item.name}
          backgroundColor={item.color}
          color={colors.white}
        />
      ))}
    </Container>
  );
};

export default SupportFunction;
