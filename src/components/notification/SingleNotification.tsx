import React from 'react'
interface IProps {
    title: string,
    content: string,
    createdAt: string,
    onClick?: () => void,
    isRead?: boolean
}

const SingleNotification = ({ title, content, createdAt, onClick, isRead = false }: IProps) => {
    return (
        <div className={`${isRead ? 'tw-bg-[#F4F4F4] tw-border tw-border-[#E5E9EB]' : 'tw-bg-white tw-shadow-zojaShadowEight'} tw-p-3 tw-py-4 tw-rounded-lg tw-mt-4 tw-cursor-pointer`}
            onClick={onClick}
        >
            <div className="tw-flex tw-justify-between tw-items center">
                <h4 className="tw-text-[#323348] tw-text-sm">{title}</h4>
              {!isRead ?  <span className="tw-w-1.5 tw-h-1.5 tw-bg-red-600 tw-rounded-full tw-block"></span> : null}
            </div>
            <div className="tw-text-[#5E6366] tw-text-[11px] tw-w-[90%]">
                {content}
            </div>
            <span className="tw-text-[11px]">{createdAt},  <span className="tw-text-[#222B88]">2 mins ago</span></span>
        </div>
    )
}

export default SingleNotification