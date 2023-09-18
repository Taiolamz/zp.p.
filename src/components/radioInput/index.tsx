import { IPropsRadioData } from '../../atoms/newNotification';
import { H5 } from '../../styles';
import { RadioInputContainer, Radio } from './style';

export interface RadioIPropsIprops {
  label: string;
  value: string;
}

export interface RadioIProps {
  data?: IPropsRadioData[];
  selectedValue: any;
}

const RadioInput = ({ data, selectedValue }: RadioIProps) => {
  const onOptionChange = (e: any) => {
    selectedValue(e.target.value);
  };

  return (
    <RadioInputContainer>
      {data?.map((item, index) => {
        return (
          <Radio key={index}>
            <input type="radio" name="topping" value={item.value} id="regular" onChange={onOptionChange} />
            <label htmlFor="regular">
              <H5 bold> {item.label}</H5>
            </label>
          </Radio>
        );
      })}
    </RadioInputContainer>
  );
};

export default RadioInput;
