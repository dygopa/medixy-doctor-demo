import React, { useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import Popup from './Popup/Popup'

const NotificationPopup = () => {

    const [activeNotificationDropdown, setActiveNotificationDropdown] = useState(false)

    return (
        <div className='w-fit h-[4rem] relative flex flex-col justify-center items-start'>
            <div
            onClick={()=>{ setActiveNotificationDropdown(!activeNotificationDropdown) }}
            className={twMerge([
                "transition relative w-fit h-fit cursor-pointer text-[1.2rem] text-slate-500 bg-white border rounded p-2",
                activeNotificationDropdown && "text-slate-900"
            ])}>
                {/* <span className='bg-red-600 w-[10px] h-[10px] rounded-full absolute -top-1 -right-1'></span> */}
                <FiBell/>
            </div>
            <Popup customActive={setActiveNotificationDropdown} active={activeNotificationDropdown}/>
        </div>
    )
}

export default NotificationPopup