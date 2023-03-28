import { memo, useState } from "react";
import { ReactElement } from "react";
import { ReactComponent as CalendarIcon } from "../../assets/svg/calender.svg";
import DatePicker from "react-datepicker";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "./style";
import { H2 } from "../../styles";
import { colors } from "../../utils";
import { ActivityIndicator } from "../";
import { DateIProps } from "../../types";

const date: Date = new Date();

interface IProps {
  selectedDate: any;
  onCalendarClose?: () => void;
  onCalendarOpen?: () => void;
  onClickOutside?: () => void;
  onFocus?: () => void;
  onSelect?: () => void;
  required?: boolean;
  placeholderText?: string;
  timeFormat?: string;
  wrapperClassName?: string;
  readOnly?: boolean;
  preventOpenOnFocus?: boolean;
  openToDate?: any;
  name?: string;
  minDate?: any;
}

function RDatePicker({ selectedDate, placeholderText, required }: IProps) {
  const [date, setDate] = useState<any>("");

  const onChange = (date: any) => {
    setDate(date);
    selectedDate(date);
  };
  return (
    <Container>
      <DatePicker
        className='wrapperClassName calendarClassName'
        placeholderText={placeholderText ? placeholderText : "DD-MM-YYYY"}
        selected={date}
        onChange={(date: any) => onChange(date)}
        required={required}
      />
      <CalendarIcon />
    </Container>
  );
}

export default memo(RDatePicker);
