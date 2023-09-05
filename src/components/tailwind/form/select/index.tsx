import React, { ReactElement } from 'react'
import { FaChevronDown } from 'react-icons/fa'
interface SelectProps {
    id?: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    extraClass?: string,
    labelExtraClass?: string,
    setSelectedOption: (value: any) => void
    showArrown?: boolean,
    arrowDownClass?: string,
    marginTop?: string,
    label?: string,
    options: Array<{ label: string, value: string | number }>
    icon?: ReactElement,
    onBlur?: (e: any) => void,
    error?: any,
    touched?: any
}

const ZojaSelect = ({ id, name = '', options, touched = {}, showArrown = false, arrowDownClass, label, error, marginTop, extraClass, onChange, icon, labelExtraClass, setSelectedOption }: SelectProps) => {
    return (
        <div className={marginTop}>
            {label && <label htmlFor="" className={`${labelExtraClass} tw-text-md tw-text-[#6A616F] tw-mb-1`}>{label}</label>}
            <div className="tw-relative tw-w-fit">
                <select
                    name={name}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className={`${extraClass} tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-p-2.5 tw-dark:bg-gray-700 tw-dark:border-gray-600 tw-dark:placeholder-gray-[#5B6871] tw-dark:text-white tw-dark:focus:ring-blue-500 tw-dark:focus:border-blue-500
                focus:tw-outline-none ${touched[name] && error ? 'tw-border-red-400' : ''}`}>
                    {
                        options.map((option, index) => (
                            <option key={index} value={option.value} className=''>{option.label}</option>
                        ))
                    }
                </select>
                {showArrown && <span className={`${arrowDownClass} tw-absolute tw-text-isGreyVariantFour tw-text-xs tw-right-4`}><FaChevronDown /></span>}
            </div>
            {touched[name] && error && <span className='tw-text-xs tw-text-red-400'>{error}</span>}
        </div>
    )
}

export default ZojaSelect