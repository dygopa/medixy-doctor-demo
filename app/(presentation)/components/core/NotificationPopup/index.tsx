import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import Popup from './Popup/Popup'
import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext'
import { IUser } from 'domain/core/entities/userEntity'
import { INotificationPopupContext, NotificationPopupContext } from './context/NotificationPopupContext'
import { onMessageListener } from 'infrastructure/config/firebase/FirebaseConfig'

const NotificationPopup = ({user}:{user:IUser}) => {

    const { actions, dispatch } = useContext<INotificationPopupContext>(NotificationPopupContext);
    const { getNotifications } = actions

    const [activeNotificationDropdown, setActiveNotificationDropdown] = useState(false)
    const [activeDot, setActiveDot] = useState(false)

    useMemo(()=>{
        if(user && user.accountId){
            getNotifications({
                userId: user.accountId
            })(dispatch);
        }
    },[user])

    useEffect(() => {
        const unsubscribe = onMessageListener().then((payload) => {
            setActiveDot(true);
            getNotifications({
                userId: user.accountId
            })(dispatch)
        });
    
        return () => {
          unsubscribe.catch((err) => console.log('failed: ', err));
        };
    }, []);

    return (
        <div className='w-fit h-[4rem] relative flex flex-col justify-center items-start'>
            <div
            onClick={()=>{ 
                setActiveNotificationDropdown(!activeNotificationDropdown);
                setActiveDot(false)
            }}
            className={twMerge([
                "transition relative w-fit h-fit cursor-pointer text-[1.2rem] text-slate-500 bg-white border rounded p-2",
                activeNotificationDropdown && "text-slate-900"
            ])}>
                {activeDot && <span className='bg-red-600 w-[10px] h-[10px] rounded-full absolute -top-1 -right-1'></span> }
                <FiBell/>
            </div>
            <Popup 
            customActive={setActiveNotificationDropdown} 
            active={activeNotificationDropdown}/>
        </div>
    )
}

export default NotificationPopup