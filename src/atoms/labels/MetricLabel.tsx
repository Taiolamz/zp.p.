import React from 'react'
import numberFormat from '../../utils/numberFormat'
interface IProps {
    title: string,
    total: number,
    extraClass?: string,
    currencySymbol?: string
}

const MetricLabel = ({ title, total, extraClass, currencySymbol='' }: IProps) => {
    return (
        <div className='tw-text-[10px] tw-bg-white tw-p-2 tw-px-3 tw-shadow-zojaShadowOne md:tw-text-[1rem]'><span className='tw-text-[#7E7E96]'>{title}</span> <span className='tw-font-medium tw-text-[#162082]'>: {`${currencySymbol}${numberFormat(total)}`}</span></div>
    )
}

export default MetricLabel