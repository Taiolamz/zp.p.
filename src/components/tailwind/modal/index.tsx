import { useEffect } from "react"
import useClickOutside from "../../../utils/hooks/useClickOutside"

interface IProps {
    children: React.ReactElement,
    show: boolean,
    handleClose: () => void,
    closeOnClickOutside?: boolean,
    extraClass?: string,
    contentRef?: any,
    height: 'full' | 'auto',
    position: 'center' | 'left' | 'right' | 'custom',
    width?: string,
    borderRadius?: string
}

const ZojaModal = ({ children, show, handleClose, extraClass, closeOnClickOutside = false, contentRef, height, width, position, borderRadius }: IProps) => {
    const { isClickOutside } = useClickOutside(contentRef)
    // console.log(isClickOutside)
    return (
        <div className={`${(!show) ? 'tw-translate-x-full' : 'tw-translate-x-0'} tw-bg-black/50 tw-fixed tw-left-0 tw-top-0 tw-w-screen tw-h-screen tw-z-[9999999] tw-grid tw-place-content-center`}
        onClick={() => isClickOutside && closeOnClickOutside && handleClose()}
        >
            <div className={`${extraClass} tw-absolute tw-transition-all tw-duration-500 tw-ease-in-out ${ height !== 'full' && 'tw-mt-4'} tw-w-[95%] tw-ml-[.7rem] tw-z-[9999] tw-bg-white ${height === 'full' ? 'tw-h-screen' : 'tw-h-fit'} ${show ? (position === 'right' && height === 'full' && 'tw-right-0'): ''}`} style={{borderRadius: borderRadius}}>
                {children}
            </div>
        </div>
    )
}

export default ZojaModal

// tw-bg-white tw-transition-all tw-duration-500 tw-ease-in-out ${height === 'full' ? 'tw-h-screen' : 'tw-h-fit'} md:tw-w-[35rem] ${show ? (position === 'right' ? 'tw-right-0' : position === 'center' ? 'tw-right-0 tw-left-0 tw-inset-0 tw-m-auto' : 'tw-left-0 tw-top-0 ') : position === 'left' ? '-tw-translate-x-full' : (position === 'right' ? '-tw-translate-x-full md:tw-translate-x-[50%]' : '-tw-translate-y-full md:-tw-translate-y-full')}