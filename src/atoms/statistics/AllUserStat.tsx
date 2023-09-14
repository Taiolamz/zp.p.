import { Link } from 'react-router-dom';
import StatLabel from '../labels/StatLabel';
import { routesPath } from '../../utils';

interface IProps {
    total_user: number,
    active_user: number,
    inactive_user: number,
    ios_download: number,
    android_download: number,
    conversion_rate: number
}

const AllUserStat = ({total_user, active_user, inactive_user, ios_download, android_download, conversion_rate}: IProps) => {
    const { USERS } = routesPath
    return (
        <Link to={USERS} className='tw-no-underline tw-bg-white tw-p-4 tw-rounded-md tw-shadow-zojaShadowOne tw-h-fit md:tw-w-[18rem]'>
            <div className='tw-flex tw-justify-between tw-mx-6 md:tw-mx-0'>
                <div>
                    <h2 className='tw-text-[#5E6366] tw-font-normal tw-text-xs tw-mb-1 md:tw-text-[1.1rem]'>All Users</h2>
                    <h1 className='tw-text-[#162082] tw-font-normal tw-text-xl md:tw-text-4xl'>{total_user}</h1>
                </div>
                <div className='tw-flex tw-gap-x-6 md:tw-gap-x-0 md:tw-flex-col'>
                    <StatLabel title='ACTIVE' total={active_user} titleStyle='tw-text-[#009968] tw-text-xs' totalStyle='tw-text-[#5E6366]' extraClass='md:tw-items-start '/>
                    <StatLabel title='INACTIVE' total={inactive_user} titleStyle='tw-text-[#FF0000] tw-text-xs' totalStyle='tw-text-[#5E6366]' extraClass='md:tw-items-start'/>
                </div>
            </div>
            <div className='tw-hidden tw-bg-[#FAFAFA] tw-rounded-lg tw-cursor-pointer tw-transition-all tw-duration-500 tw-ease-in-out tw-pt-2 tw-px-6 tw-mt-3 md:tw-px-3 hover:tw-shadow-zojaShadowSi w-h-20 md:tw-bloc'>
                {/* <div className="tw-flex tw-justify-between tw-items-center">
                    <StatLabel title='IOS Downloads' total={ios_download} titleStyle='tw-text-[#5E6366] tw-text-[10px] tw-font-normal md:tw-text-[8px]' totalStyle='tw-text-md tw-font-normal tw-text-[#263238] md:-tw-mt-1'/>
                    <StatLabel title='Android Downloads' total={android_download} titleStyle='tw-text-[#5E6366] tw-text-[10px] tw-font-normal md:tw-text-[8px]' totalStyle='tw-text-md tw-font-normal tw-text-[#263238] md:-tw-mt-1'/>
                </div>
                <div className="tw-mt-2 tw-flex tw-justify-around tw-items-center tw-mx-4 md:tw-justify-normal md:tw-mx-0 md:tw-gap-x-4 md:tw-mt-1">
                    <span className='tw-uppercase tw-text-[#009968] tw-text-xs md:tw-text-[10px]'>Conversion rate</span>
                    <h2 className='tw-text-[#162082] tw-font-normal tw-text-2xl'>{conversion_rate}%</h2>
                </div> */}
            </div>
        </Link>
    )
}

export default AllUserStat