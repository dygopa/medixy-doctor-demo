import React, { useEffect, useRef } from 'react'
import { FiBell, FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import Notification from './Notification/Notification';

const Popup = ({ active, customActive }:{ active: boolean; customActive: Function; }) => {

    let list:any[] = [{}, {}, {}]

    const wrapperRef = useRef(null);

    function useOutsideAlerter(ref:React.MutableRefObject<any>) {
        useEffect(() => {
          function handleClickOutside(event:MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
              customActive(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]); 
    }    

    useOutsideAlerter(wrapperRef);

    const NotificationsGroup = ({type, list}:{type:string; list: any[];}) => {

        return(
            <div className='w-full h-fit relative flex flex-col justify-start items-center'>
                <div className='z-10 w-full py-2 text-left text-xs text-slate-500 font-light sticky -top-4 bg-white'>{type}</div>
                <div className='w-full flex flex-col justify-start items-start gap-1'>
                    {list.map((data:any, i:number) => <Notification key={i} /> ) }
                </div>
            </div>
        )
    }

    const NotificationGroups = ({list}:{list: any[];}) => {

        let fromToday:any[] = [list[0], list[1], list[0], list[1], list[2]]
        let fromYesterday:any[] = [list[0], list[1], list[2], list[0], list[1], list[2]]
        let fromPastDays:any[] = list

        return(
            <div className='w-full h-fit relative flex flex-col justify-start items-center'>
                {fromToday.length > 0 && <NotificationsGroup type='Hoy' list={fromToday} />}
                {fromYesterday.length > 0 && <NotificationsGroup type='Ayer' list={fromYesterday} />}
                {fromPastDays.length > 0 && <NotificationsGroup type='Más antiguas' list={fromPastDays} />}
            </div>
        )
    }

    return(
        <div ref={wrapperRef} className={twMerge([
            "absolute top-[4rem] w-[22rem] shadow-lg bg-white min-h-[30vh] h-fit max-h-[70vh] overflow-y-auto border rounded flex flex-col justify-start items-center p-4 gap-2",
            active ? "visible" : "hidden"
        ])}>
            <div className="w-full h-fit pb-2 border-b bg-white flex items-center justify-start">
                <p className='text-slate-900 font-normal text-base'>Notificaciones</p>
            </div>
            {list.length > 0 ? 
                <NotificationGroups list={list} />
            : 
                <div className='w-full h-fit flex flex-col justify-center items-center py-3 text-center'>
                    <p className='font-normal text-slate-900 text-base'>Nada por aqui aún</p>
                    <p className='font-light text-slate-500 text-sm'>No tienes notificaciones todavia.</p>
                </div>
            }
        </div>
    )
}

export default Popup