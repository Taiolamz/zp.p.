import { useRef } from 'react';
import Popup from 'reactjs-popup';
import { PopupContainer, CustomSelectContainer, ItemStyle, TriggerStyle } from './style';
import { colors } from '../../utils';
import { RxCaretDown } from 'react-icons/rx';

export interface CustomSelectOptionsIProps {
  key: string;
  value: string;
}

export interface CustomSelectIProps {
  value: string[];
  setValue: (value: [string, string]) => void;
  options: CustomSelectOptionsIProps[];
}

const CustomSelect = ({ value, setValue, options }: CustomSelectIProps) => {
  const divRef = useRef<any>(null);

  const closeTooltip = () => divRef.current.close();
  return (
    <CustomSelectContainer>
      <PopupContainer>
        <Popup
          ref={divRef}
          trigger={
            <TriggerStyle style={{ cursor: 'pointer' }}>
              {value[1]} <RxCaretDown size={20} />
            </TriggerStyle>
          }
          arrow={false}
          mouseLeaveDelay={50}
          mouseEnterDelay={0}
          position="bottom center"
          contentStyle={{
            marginTop: '6px',
            textAlign: 'center',
            backgroundColor: colors.secondary,
            borderRadius: '3.5px',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
            border: 0,
            minWidth: '88px',
            color: colors.primary,
            overflow: 'hidden',
          }}>
          <div style={{ cursor: 'pointer', borderBottom: 'border: 0.67px solid red' }}>
            {options.map(({ key, value }: any) => (
              <ItemStyle
                key={key}
                onClick={() => {
                  closeTooltip();
                  setValue([key, value]);
                }}>
                {value}
              </ItemStyle>
            ))}
          </div>
        </Popup>
      </PopupContainer>
    </CustomSelectContainer>
  );
};

export default CustomSelect;
