import { MdOutlineClose } from "react-icons/md"
import { SingleNotification } from "../../../../components"

interface IProps {
  title: string,
  handleClose: () => void,
  contentRef?: any,
  children: React.ReactElement
}


const NotificationModal = ({ contentRef, title, handleClose, children }: IProps) => {
  return (
    <div ref={contentRef} className='tw-h-screen tw-bg-[#C4EAFF1F]'>
      <div className="tw-p-5 tw-bg-[#162238] tw-text-white tw-flex tw-justify-between tw-items-center">
        <span className="tw-font-normal tw-tracking-wide">{title}</span>
        <span className="tw-w-[1.30rem] tw-h-[1.30rem] tw-bg-white tw-rounded-full tw-grid tw-place-content-center tw-text-[#162238] tw-text-sm tw-font-extralight tw-cursor-pointer" onClick={handleClose}><MdOutlineClose /></span>
      </div>
      <div className="tw-h-[] tw-pt-2 tw-px-6">
        {children}
      </div>
    </div>
  )
}

export default NotificationModal