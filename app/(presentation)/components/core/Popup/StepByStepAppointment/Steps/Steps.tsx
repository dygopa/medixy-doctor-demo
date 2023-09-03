import React, { useContext, useEffect, useMemo, useState } from 'react'

import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';
import { IStepByStepAppointmentContext, StepByStepAppointmentContext } from '../context/StepByStepAppointmentContext';

import LocalityServiceStep from './LocalityServiceStep/LocalityServiceStep';
import SlotStep from './SlotStep/SlotStep';
import PatientStep from './PatientStep/PatientStep';
import SummaryStep from './SummaryStep/SummaryStep';
import { twMerge } from 'tailwind-merge';
import { IScheduleContext, ScheduleContext } from '(presentation)/components/Schedule/context/ScheduleContext';

const Steps = () => {

  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state: stateSchedule } = useContext<IScheduleContext>(ScheduleContext);

  const { data: status } = stateSchedule.statusPopup;
  const {
    successful: predifinedReservationSuccessful,
    data: predifinedReservation,
  } = stateSchedule.predifinedReservationData;

  const { state, actions, dispatch } =
    useContext<IStepByStepAppointmentContext>(StepByStepAppointmentContext);
  const { setStep } = actions
  const { data: step } = state.step

  const [appointment, setAppointment] = useState({})

  const ItemStep = ({ number, label }: { number: number; label: string; }) => {

    const [isHover, setIsHover] = useState(false)

    return (
      <div 
        onMouseEnter={()=>{ setIsHover(true) }}
        onMouseLeave={()=>{ setIsHover(false) }}
        onClick={() => { step > number && setStep(number)(dispatch) }} 
        className={twMerge([
        "transition relative h-fit flex flex-col items-center",
        step > number && "cursor-pointer"
      ])}>
        <div className={`shadow-xl w-[45px] h-[45px] rounded-full border 
          ${ step === number ? "shadow-primary/70 border-primary bg-primary" : "shadow-primary/0 "}
          ${ step > number ? "border-green-500 bg-green-500" : "border-slate-300"}
          flex flex-col justify-center items-center`
        }>
          <p className={`text-lg 
            ${step >= number ? "text-white font-bold" 
            : "text-slate-300 font-light"}
          `}>{number + 1}</p>
        </div>
        { isHover && <span className="w-max h-fit p-3 bg-slate-900 text-white font-medium text-xs rounded absolute -bottom-[45px] z-10">{label}</span>}
      </div>
    )
  }

  useMemo(()=>{
    if(predifinedReservation["attentionWindowId"]){
      console.log("predifinedReservation", predifinedReservation)
      setAppointment({
        ...appointment,
        attentionWindowId: predifinedReservation["attentionWindowId"],
      });
    }
  },[predifinedReservation])

  useEffect(()=> {
    setStep(0)(dispatch)
    setAppointment({})
  },[status])

  return (
    <div className='w-full h-fit flex flex-col justify-start items-center gap-6'>
      
      <div className={"w-full h-fit flex flex-col justify-start items-center gap-4 sticky -top-6 py-3 bg-white z-10"}>
        <div className='w-full h-fit flex flex-col text-left gap-1'>
          <p className="font-bold text-xl text-slate-900">Agendar cita</p>
        </div>
        <div className='relative flex justify-between items-center gap-1 w-full h-auto px-8'>
          <ItemStep label="Consultorio y servicio" number={0} />
          <span className={twMerge([
            "w-[140px] h-[2px] transition relative block",
            step === 0 && "bg-slate-300",
            step > 0 && "bg-green-500",
          ])}></span>
          <ItemStep label="Horario de atención" number={1} />
          <span className={twMerge([
            "w-[140px] h-[2px] transition relative block",
            (step < 1 || step === 1) && "bg-slate-300",
            step > 1 && "bg-green-500",
          ])}></span>
          <ItemStep label="Paciente" number={2} />
          <span className={twMerge([
            "w-[140px] h-[2px] transition relative block",
            (step < 2 || step === 2) && "bg-slate-300",
            step > 2 && "bg-green-500",
          ])}></span>
          <ItemStep label="Todo listo" number={3} />
        </div>
      </div>

      {step === 0 && <LocalityServiceStep setAppointment={setAppointment} appointment={appointment}/>}
      {step === 1 && <SlotStep setAppointment={setAppointment} appointment={appointment}/>}
      {step === 2 && <PatientStep setAppointment={setAppointment} appointment={appointment}/>}
      {step === 3 && <SummaryStep setAppointment={setAppointment} appointment={appointment}/>}
    </div>
  )
}

export default Steps