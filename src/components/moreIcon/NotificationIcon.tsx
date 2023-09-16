import { VscBellDot } from "react-icons/vsc"

const NotificationIcon = (props: { onClick: () => void }) => {
    return (
        <span className='tw-block tw-text-2xl tw-mr-1 tw-cursor-pointer md:tw-mr-5' onClick={props.onClick}><VscBellDot /> </span>
    )
}

export default NotificationIcon