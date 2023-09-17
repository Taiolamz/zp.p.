import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { StatLabel } from '../../atoms'

interface IProps {
    icon: any,
    title: string,
    subTitleOne: string,
    subTitleTwo: string,
    totalOne: number,
    totalTwo: number,
    hasMarginBottom?: boolean
}

const RightSideMetric = ({icon, title, subTitleOne, subTitleTwo, totalOne, totalTwo, hasMarginBottom = true}: IProps) => {
    return (
        <div className={`tw-bg-white tw-rounded-lg tw-p-2 tw-px-3 tw-shadow-zojaShadowOne ${hasMarginBottom && 'tw-mb-3'}`}>
            <div className="tw-flex tw-items-center tw-gap-x-2">
                <img src={icon} alt='icon' />
                <span className='tw-text-xs tw-text-[#5E6366]'>{title}</span>
            </div>
            <Link to="#" className="tw-flex tw-justify-between tw-items-center tw-px-1 hover:tw-shadow-zojaShadowSix tw-no-underline tw-text-[inherit] hover:tw-text-[inherit] tw-rounded-lg">
                <StatLabel title={subTitleOne} titleStyle='tw-font-thin' total={totalOne} totalStyle='-tw-mt-1 tw-text-[#222B88] tw-font-medium' />
                <StatLabel title={subTitleTwo} titleStyle='tw-font-thin' total={totalTwo} totalStyle='-tw-mt-1 tw-text-[#222B88] tw-font-medium' />
                <span className='tw-text-xs tw-text-[#222B88]'><FaChevronRight /></span>
            </Link>
        </div>
    )
}

export default RightSideMetric