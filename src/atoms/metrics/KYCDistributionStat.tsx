import { Link } from 'react-router-dom'
import { LevelLabel } from '../../atoms'
import { routesPath } from '../../utils'
import { Dictionary } from '../../types'

interface IProps {
    data: Dictionary
}

const KYCDistributionStat = ({ data }: IProps) => {
    const {level_zero, level_one, level_two, level_three, pending_verification_count} = data
    const { KYC } = routesPath
    return (
        <Link to={KYC} className='tw-bg-white tw-no-underline tw-p-4 tw-rounded-lg tw-shadow-zojaShadowOne tw-w-full'>
            <h2 className='tw-text-[#5E6366] tw-text-[1rem] tw-mb-1 md:tw-text-[1.1rem]'>KYC Distribution</h2>
            <div className='tw-mt-4 tw-flex tw-justify-between'>
                <LevelLabel indicatorColor="#FD0000" title='LEVEL 0' total={Number(level_zero)} />
                <LevelLabel indicatorColor="#16B45E" title='LEVEL 1' total={Number(level_one)} />
                <LevelLabel indicatorColor="#FFAF56" title='LEVEL 2' total={Number(level_two)} />
                <LevelLabel indicatorColor="#222B88" title='LEVEL 3' total={Number(level_three)} hasBorderRight={false} />
            </div>
            <div className="tw-flex tw-justify-center tw-items-center tw-gap-x-2 tw-text-sm tw-mt-4 tw-cursor-pointer tw-transition-all tw-duration-300 tw-ease-in-out tw-rounded-lg tw-group hover:tw-shadow-zojaShadowSeven tw-p-2">
                <span className='tw-text-[#5E6366] tw-font-normal md:tw-text-[1rem]'>Pending Verification</span>
                <span className='tw-text-[#222B88] tw-font-medium'>{pending_verification_count}</span>
                <Link to={KYC} className='tw-text-[#FFD60A] tw-transition-all tw-duration-300 tw-ease-in-out tw-border tw-border-[#FFD60A] tw-p-1.5 tw-px-3 tw-no-underline tw-rounded-md tw-ml-3 group-hover:tw-bg-[#FFD60A] group-hover:tw-text-white md:tw-ml-8' >Resolve</Link>
            </div>
        </Link>
    )
}

export default KYCDistributionStat