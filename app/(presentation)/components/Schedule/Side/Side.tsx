import Lucide from '(presentation)/components/core/BaseComponents/Lucide'
import React, { MouseEventHandler, useContext } from 'react'
import { IScheduleContext, ScheduleContext } from '../context/ScheduleContext'
import moment from 'moment'
import 'moment/locale/es';

const AppointmentComponent = ({onClick}:{
  onClick: MouseEventHandler
}) => {
  return(
    <div onClick={onClick} className="relative w-full min-h-[10vh] h-fit max-h-[14vh] bg-white flex justify-between items-center p-3 gap-2 box-border rounded-md shadow-sm">
      <div className="w-[16%] h-full flex flex-col justify-center items-center">
        <div className='w-14 h-14 rounded-full bg-white overflow-hidden'>
          <img src='https://handsontek.net/images/SharePoint/ProfilePicture/Outlook.PNG' className='w-full h-full object-cover'/>
        </div>
      </div>
      <div className="w-[60%] h-full flex flex-col justify-between items-start overflow-hidden">
        <p className='font-semibold text-sm text-slate-900 w-full whitespace-nowrap text-ellipsis'>María Fernanda Rondón</p>
        <p className='font-medium text-sm text-slate-900 w-full whitespace-nowrap text-ellipsis'>Consulta general</p>
        <p className='font-light text-sm text-gray-700 w-full whitespace-nowrap text-ellipsis'>Dr. Ignacio Molina</p>
      </div>
      <div className="w-[24%] h-full flex flex-col justify-between items-end">
        <div className="w-full flex justify-end items-center gap-1 overflow-hidden">
          <p className='font-light text-[12px] text-gray-700 whitespace-nowrap text-ellipsis'>09:00 am</p>
          <Lucide icon="MoreVertical" className="w-5 h-5 text-slate-500" />
        </div>
        <div className="w-full flex justify-end items-center gap-2">
          <p className='font-light text-sm text-gray-700'>Atendido</p>
          <span className='w-3 h-3 rounded-full bg-green-500'></span>
        </div>
      </div>
    </div>
  )
}

const Side = () => {

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeStatusPopup, changeTypePopup } = actions;

  return (
    <div className='w-full lg:w-1/3 flex flex-col justify-start items-center gap-3'>
      <div className="w-full flex justify-between items-center">
        <p className='font-light text-xl text-slate-900'><span className='capitalize'>{moment().locale("es").format("dddd")}</span> - {moment().format("h:mm a")}</p>
      </div>
      <div className='w-full flex flex-col justify-start items-center gap-3'>
        <AppointmentComponent onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(2)(dispatch) }} />
        <AppointmentComponent onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(2)(dispatch) }} />
        <AppointmentComponent onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(2)(dispatch) }} />
        <AppointmentComponent onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(2)(dispatch) }} />
      </div>
    </div>
  )
}

export default Side