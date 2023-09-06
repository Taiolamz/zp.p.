import React from 'react'

interface IProps {
    title: string,
    total: number,
    indicatorColor: string,
    hasBorderRight?: boolean
}

const LevelLabel = ({title, total, indicatorColor, hasBorderRight = true}: IProps) => {
    return (
        <div className={`tw-w-fit tw-pr-4 ${hasBorderRight && 'tw-border-r'} md:tw-pr-10`}>
            <span className='tw-flex tw-items-start tw-gap-x-1'>
                <span className={`tw-bg-gray-400 tw-w-[5px] tw-h-[5px] tw-block`} style={{backgroundColor: indicatorColor}}></span>
                <span className='tw-text-[#5E6366] tw-font-thin tw-text-xs md:tw-text-[.9rem]'>{title}</span>
            </span>
            <h3 className='tw-text-[#162082] tw-font-normal tw-pl-2 tw-mt-1 tw-text-[1.2rem] md:tw-text-4xl'>{total}</h3>
        </div>
    )
}

export default LevelLabel