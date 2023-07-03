import styled from 'styled-components';
import { spacing } from '../../utils';

export const CustomUploadContainer = styled.div`
  width: max-content;
`;

export const FileInputs = styled.div`
  position: relative;
  margin-top: ${spacing.xsmall};
  cursor: pointer;
`;

export const InputStyle = styled.input`
  position: relative;
  text-align: right;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  height: 46px;
  max-width: 200px;
`;

export const InputButton = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  /* width: 100%;
  height: 100%; */
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  border-radius: 10px;
  border: 1px solid rgba(106, 97, 111, 0.2);

  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: ${spacing.xsmall};
  outline: none;
  padding: ${spacing.xsmall};
`;
