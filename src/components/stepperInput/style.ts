import styled from 'styled-components';
import { spacing, colors, borderRadius } from '../../utils';

export const StepperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 37px;
`;

export const StepperButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;

  image-rendering,
  svg {
    vertical-align: top;
  }
`;

export const StepperNumber = styled.input`
  border: 1px solid rgba(106, 97, 111, 0.2);

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type='number'] {
    -moz-appearance: textfield;
  }
`;
