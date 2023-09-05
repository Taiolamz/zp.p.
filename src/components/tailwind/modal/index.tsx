import { useEffect } from "react"
import useClickOutside from "../../../utils/hooks/useClickOutside"

interface IProps {
    children: React.ReactElement,
    show: boolean,
    handleClose: () => void,
    closeOnClickOutside?: boolean,
    contentRef?: any
}

const ZojaModal = ({ children, show, handleClose, closeOnClickOutside = false, contentRef }: IProps) => {
    const { isClickOutside } = useClickOutside(contentRef)

    return (
        <div className={`${(!show) && 'tw-hidden'} tw-bg-black/50 tw-fixed tw-left-0 tw-top-0 tw-w-screen tw-h-screen tw-z-[9999999]`}
        onClick={() => isClickOutside && closeOnClickOutside && handleClose()}
        >
            <div className='tw-p-6 tw-rounded-lg tw-bg-white tw-mt-4 md:tw-absolute tw-w-[95%] tw-mx-auto tw-z-[9999] md:tw-w-[33.5rem] md:tw-right-72 md:tw-mt-12'>
                {children}
            </div>
        </div>
    )
}

export default ZojaModal