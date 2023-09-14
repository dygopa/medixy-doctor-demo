import React from 'react'
import { INotification } from 'domain/core/entities/notificationEntity';
import { FiBell } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

const NotificationToast = ({
  cancelFunction,
  notification
}: {
  cancelFunction: Function;
  notification: INotification;
}) => {

  setTimeout(() => {
    cancelFunction();
  }, 3000)

  return (
    <div className='max-w-[30rem] w-fit min-w-[17rem] h-fit bg-white rounded border shadow-md fixed top-20 right-6 p-3 flex justify-between items-center gap-3'>
      <div className='w-1/6 relative flex flex-col justify-start items-center'>
        <div className={twMerge([
          "flex flex-col justify-center items-center",
          "w-[2.2rem] h-[2.2rem] text-[1rem] text-primary rounded bg-primary/20 p-[0.5rem]"
        ])}>
          <FiBell />
        </div>
      </div>
      <div className="w-5/6 relative flex flex-col justify-center items-start">
        <div className="w-full flex justify-between items-center">
          <p className='text-slate-900 font-normal text-sm'>{notification.title ?? "Nueva notificacion"}</p>
          <p className='text-slate-500 font-normal text-xs'>{notification.date ?? moment().format("DD/MM/YYYY")}</p>
        </div>
        <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap text-slate-500 font-light text-[0.8rem]'>{notification.body ?? "Sin mensaje de la notificacion"}</p>
      </div>
    </div>
  )
}

export default NotificationToast