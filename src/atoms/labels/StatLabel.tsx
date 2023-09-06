import React from 'react'

interface IProps {
    key?: string | number,
    title: string,
    total: number,
    extraClass?: string,
    titleStyle?: string,
    totalStyle?: string
}

const StatLabel = ({key, title, total, titleStyle, totalStyle, extraClass}: IProps) => {
    return (
        <div key={key} className={`${extraClass} tw-flex tw-flex-col tw-items-center`}>
            <span className={`${titleStyle} tw-text-sm md:tw-text-[10px]`}>{title}</span>
            <span className={`${totalStyle} tw-text-sm md:tw-text-[11px]`}>{total}</span>
        </div>
    )
}

export default StatLabel