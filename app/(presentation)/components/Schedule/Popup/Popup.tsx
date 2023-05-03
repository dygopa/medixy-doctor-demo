import React, { useContext, useEffect, useRef } from 'react'
import { IScheduleContext, ScheduleContext } from '../context/ScheduleContext';
import CreateAgenda from './CreateAgenda/CreateAgenda';
import CreateAppointment from './CreateAppointment/CreateAppointment';
import { twMerge } from 'tailwind-merge';
import AppointmentDetail from './AppointmentDetail/AppointmentDetail';

function Popup() {

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeStatusPopup } = actions;
  const { data: type } = state.typePopupActive;
  const { data: status } = state.statusPopup;

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref:React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event:MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("Click")
          changeStatusPopup(false)(dispatch)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className={twMerge([
      'z-[52] fixed top-0 left-0 w-full h-screen bg-gray-900/50 backdrop-blur-md flex flex-col justify-center items-center',
      status ? "visible" : "hidden"
    ])}>
      {type === 0 && <CreateAppointment cancelFuntion={()=>{}} />}
      {type === 1 && <CreateAgenda cancelFuntion={()=>{}} />}
      {type === 2 && <AppointmentDetail cancelFuntion={()=>{}} />}
    </div>
  )
}

export default Popup