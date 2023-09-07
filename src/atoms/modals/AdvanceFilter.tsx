import React, { useEffect, useRef, useState } from 'react'
import { ZojaButton, ZojaSelect } from '../../components/tailwind'
import { MdOutlineEditCalendar } from 'react-icons/md'
import DatePicker from 'react-multi-date-picker'
import { formatRMDatePicker } from '../../utils'
import { useFormik } from 'formik'
import { Dictionary } from '../../types'

interface IProps {
    handleClose: () => void,
    contentRef?: any
}

const transactionTypeOptions = [
    {
        label: "enter or select transaction type",
        value: ""
    },
    {
        label: "Cash requests/provision",
        value: "Cash requests/provision"
    },
    {
        label: "Transfer-Zojapay",
        value: "Transfer-Zojapay"
    },
    {
        label: "Airtime & Data Bills",
        value: "Airtime & Data Bills"
    },
    {
        label: "Electricity",
        value: "Electricity"
    },
    {
        label: "Transfer-other banks",
        value: "Transfer-other banks"
    },
    {
        label: "Other bills(cable,betting,etc)",
        value: "Other bills(cable,betting,etc)"
    },
    {
        label: "Contactless payment(NFC,QR)",
        value: "Contactless payment(NFC,QR)"
    },
]

const userTypeOptions = [
    {
        label: "select user platform",
        value: ""
    },
    {
        label: "Active Users",
        value: "Active Users"
    },
    {
        label: "Inactive Users",
        value: "Inactive Users"
    },
]

const AdvanceFilter = ({ handleClose, contentRef }: IProps) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const startDateRef = useRef<any>(null)
    const endDateRef = useRef<any>(null)

    // console.log(startDate)

    const initialValues: Dictionary = {
        transaction_type: '',
        user_type: '',
        start_date: '',
        end_date: '',
    }

    const { values, errors, touched, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        // tw-p-6 tw-rounded-lg tw-bg-white tw-mt-4 md:tw-absolute tw-w-[95%] tw-mx-auto tw-z-[9999] md:tw-w-[33.5rem] md:tw-right-72 md:tw-mt-12
        <div ref={contentRef} className='tw-p-6'>
            <h3 className='tw-text-[#252C32] tw-text-lg tw-font-normal'>Advance Filter</h3>
            <form action="" className='tw-mt-6' onSubmit={handleSubmit}>
                <div className='tw-flex tw-flex-col tw-justify-between md:tw-flex-row md:tw-gap-2 md:tw-items-center '>
                    <label htmlFor="transaction-type" className='tw-text-gray-500 tw-text-sm tw-font-normal'>Transaction Type</label>
                    <ZojaSelect options={transactionTypeOptions} setSelectedOption={(value) => {
                        values.transaction_type = value
                    }} extraClass={`tw-rounded-[4px] tw-text-[13px] tw-text-gray-400 tw-border-[#E7E7E7] tw-w-[21rem] tw-appearance-none tw-bg-gray-100/40 ${values.transaction_type && 'tw-text-gray-600 tw-font-normal'} `} showArrown={true} arrowDownClass='tw-top-4 tw-text-gray-300 tw-text-xs' />
                </div>
                <div className='tw-flex tw-flex-col tw-justify-between tw-mt-4 md:tw-flex-row md:tw-gap-2 md:tw-items-center '>
                    <label htmlFor="transaction-type" className='tw-text-[#5B6871] tw-text-sm'>User Type</label>
                    <ZojaSelect
                        name='user_type'
                        options={userTypeOptions} setSelectedOption={(value) => {
                            values.user_type = value
                        }} extraClass={`tw-rounded-[4px] tw-text-[13px] tw-text-gray-400 tw-border-[#E7E7E7] tw-w-[21rem] tw-appearance-none tw-bg-gray-100/40 ${values.user_type && 'tw-text-gray-600 tw-font-normal'}`} showArrown={true} arrowDownClass='tw-top-4 tw-text-gray-300'

                    />
                </div>
                <div className='tw-flex tw-flex-col tw-justify-between tw-mt-4 md:tw-flex-row md:tw-gap-2 md:tw-items-center '>
                    <label htmlFor="transaction-type" className='tw-text-[#5B6871] tw-text-sm'>Date Range</label>

                    <div className="tw-flex tw-flex-co tw-gap-x-6">
                        <div className='tw-border tw-text-[11.3px] tw-text-gray-400 tw-p-[9px] tw-px-7 tw-rounded-[4px] tw-flex tw-gap-5 tw-relative md:tw-px-8'>
                            <span className={`${startDate && 'tw-text-gray-600 tw-font-normal'}`}>{startDate !== null ? formatRMDatePicker(startDate) : 'Start Date'}</span> <span className='tw-text-lg tw-text-isPrimary tw-cursor-pointer' onClick={() => startDateRef.current.openCalendar()}><MdOutlineEditCalendar /> </span>
                            <DatePicker
                                value={startDate}
                                ref={startDateRef}
                                containerClassName="tw-absolute tw-bottom-2 tw-w-[1rem] tw-text-md tw-hidden -tw-mt-7"
                                inputClass="tw-bg-inherit tw-outline-none tw-hidden"
                                onChange={(date: any) => {
                                    setStartDate(date)
                                    values.start_date = formatRMDatePicker(startDate)
                                }}
                            />
                        </div>
                        <div className='tw-border tw-text-[11.3px] tw-text-gray-400 tw-p-[9px] tw-px-7 tw-rounded-[4px] tw-flex tw-gap-5 tw-relative md:tw-px-8'>
                            <span className={`${endDate && 'tw-text-gray-600 tw-font-normal'}`}>{endDate !== null ? formatRMDatePicker(endDate) : 'Start Date'}</span> <span className='tw-text-lg tw-text-isPrimary tw-cursor-pointer' onClick={() => endDateRef.current.openCalendar()}><MdOutlineEditCalendar /> </span>
                            <DatePicker
                                value={endDate}
                                ref={endDateRef}
                                containerClassName="tw-absolute tw-bottom-2 tw-w-[1rem] tw-text-md tw-hidden -tw-mt-7"
                                inputClass="tw-bg-inherit tw-outline-none tw-hidden"
                                onChange={(date: any) => {
                                    setEndDate(date)
                                    values.end_date = formatRMDatePicker(endDate)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="tw-mt-7 tw-flex tw-gap-6 tw-justify-end">
                    <ZojaButton text='Cancel' onClick={(e: any) => {
                        e.preventDefault()
                        handleClose()
                    }} extraClass='tw-font-medium tw-border tw-border-red-500 tw-text-red-500 tw-px-6 tw-text-sm tw-rounded-[0.25rem] hover:tw-bg-green-100 hover:tw-border-green-100' />
                    <ZojaButton text='Filter' onClick={() => null} extraClass='tw-font-medium tw-border tw-border-blue-900 tw-text-white tw-bg-blue-900 tw-px-6 tw-text-sm tw-rounded-[0.25rem] hover:tw-bg-[#DDDFF7] hover:tw-border-[#DDDFF7] hover:tw-text-blue-800' />
                </div>
            </form>
        </div>
    )
}

export default AdvanceFilter