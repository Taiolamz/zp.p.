import { ReactElement } from "react"
import { RiCalendar2Fill } from "react-icons/ri"
import DatePicker from "react-multi-date-picker"

interface DatePickerProps {
    value?: Date | null,
    onChange?: (date: any | null) => void,
    label?: string,
    icon?: ReactElement,
    extraClass?: string,
}

const ZojaDatePicker = ({value, onChange, label, icon, extraClass}: DatePickerProps) => {
    return (
        <div className="tw-relative">
            <span className="tw-block tw-text-[#6A616F] tw-mb-1">Select Delivery Date (Optional)</span>
            <div className="tw-flex tw-relative tw-w-fit">
                <DatePicker
                    // render={<InputIcon className="tw-w-fit"/>}
                    // value={new Date()}
                    placeholder="DD-MM-YYYY"
                    containerClassName="tw-border tw-p-3.5 tw-rounded-lg tw-pl-16 tw-pr-4 tw-w-[16rem] tw-text-md"
                    inputClass="tw-bg-inherit tw-outline-none"
                    containerStyle={{
                        // border: "1px solid red !important",
                    }}
                    format="DD-MM-YYYY"
                    onChange={onChange}
                />
                <span className="tw-text-isPrimary tw-absolute tw-right-12 tw-top-4"><RiCalendar2Fill size={20}/></span>
            </div>
        </div>
    )
}

export default ZojaDatePicker