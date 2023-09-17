import React from 'react'
import numberFormat from '../../utils/numberFormat'

interface IProps {
    title: string,
    total: number | any,
    subTitle: string,
    totalColor?: string
}

const MetricCard = ({ title, total, subTitle, totalColor }: IProps) => {
    // let num  = "34,582,347.87"
    // console.log(num.length)
    return (
        <div>
            <span className='tw-text-[#7E7E96] md:tw-text-[1.1rem]'>{title}</span>
            <h2 className={`tw-text-[#7E7E96] tw-font-semibold tw-mt-1 tw-mb-1 font-family-2 tw-text-[1.3rem] md:tw-mt-3 md:tw-text-[1.9rem]`}
                style={{ color: totalColor }}
            >{numberFormat(total, true)}</h2>
            <span className='tw-text-[#7E7E96] tw-text-xs'>{subTitle}</span>
        </div>
    )
}

export default MetricCard