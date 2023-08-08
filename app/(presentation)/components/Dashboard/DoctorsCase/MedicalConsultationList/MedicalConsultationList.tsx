import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import ErrorMessage from "(presentation)/components/core/Error/ErrorMessage/ErrorMessage";
import Loading from "(presentation)/components/core/Loading/Loading";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { MouseEventHandler, useContext, useEffect, useMemo, useState } from "react";
import {
  IMedicalConsultationListContext,
  MedicalConsultationListContext,
} from "./context/MedicalConsultationListContext";
import Consultation from "./Consultation/Consultation";
import Link from "next/link";
import {
  DashboardContext,
  IDashboardContext,
} from "../context/DashboardContext";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import moment from "moment";
import { FiUser } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { IUser } from "domain/core/entities/userEntity";
import { IScheduleContext, ScheduleContext } from "(presentation)/components/Schedule/context/ScheduleContext";
import { AppointmentEnum } from "(presentation)/(enum)/appointment/appointmentEnum";

const StatusComponent = ({data}:{data:any})=>{
        
  let status = data["estado"]
  
  let text = ""
  let color = ""

  if(status === AppointmentEnum.NOT_AVAILABLE){
    text = "No disponible"
    color = "bg-yellow-500"
  }

  if(status === AppointmentEnum.APPROVED && moment(data["fechaReserva"]).isBefore(moment().utc(true))){
    text = "No asistió"
    color = "bg-slate-200"
  }
  if(status === AppointmentEnum.PENDING && moment(data["fechaReserva"]).isBefore(moment().utc(true))){
    text = "No asistió"
    color = "bg-slate-200"
  }

  if(status === AppointmentEnum.APPROVED && moment(data["fechaReserva"]).isAfter(moment().utc(true))){
    text = "Aprovada"
    color = "bg-yellow-500"
  }
  if(status === AppointmentEnum.PENDING && moment(data["fechaReserva"]).isAfter(moment().utc(true))){
    text = "Por atender"
    color = "bg-yellow-500"
  }

  if(status === AppointmentEnum.CANCELED){
    text = "Cancelada"
    color = "bg-red-500"
  }
  if(status === AppointmentEnum.COMPLETE){
    text = "Completada"
    color = "bg-green-500"
  }
  if(status === AppointmentEnum.PROCESSING){
    text = "En curso"
    color = "bg-green-500"
  }

  return(
    <div className="w-full flex justify-end items-center gap-2">
      <p className='font-light text-[12px] text-gray-700'>{text}</p>
      <span className={twMerge([
        "w-2 h-2 rounded-full",
        color
      ])}></span>
    </div>
  )
}

export default function MedicalConsultationList({ user }: { user: IUser }) {

  const { actions: actionsSchedule, dispatch: dispatchSchedule } = useContext<IScheduleContext>(ScheduleContext);
  const { changeStatusPopup, changeTypePopup, appointmentDetail, predifinedReservationData} = actionsSchedule;


  const { state } = useContext<IDashboardContext>(DashboardContext);
  const {
    data: appointments,
    loading,
    successful,
    error,
  } = state.getPendingAppointments;

  if (loading) return <Loading />;

  if (error) return <ErrorMessage />;

  if ([...(appointments as any[])].length === 0 && successful)
    return (
      <div className="w-full lg:h-[320px] bg-white rounded-md shadow-md px-5">
        <div className="w-full h-[6vh] flex justify-between items-center pb-1">
          <p className="font-medium text-base text-slate-900">
            Citas pendientes
          </p>
        </div>
        <div className="w-full h-auto rounded-md overflow-y-auto mt-10">
          <p className="font-medium text-lg text-slate-900">
            Nada por aquí aún
          </p>
          <p className="font-light text-sm text-slate-500">
            No tienes citas para esta fecha aún en la plataforma.
          </p>
          <Button
            onClick={() => {
              predifinedReservationData({})(dispatchSchedule);
              changeStatusPopup(true)(dispatchSchedule);
              changeTypePopup(0)(dispatchSchedule);
            }}
            variant="primary"
            type="button"
            className="w-[85%] lg:w-fit my-4"
          >
            <Lucide icon="Plus" className="w-5 h-5 mr-2" />
            Nueva consulta
          </Button>
        </div>
      </div>
    );

  return (
    <div className="w-full lg:h-[320px] flex flex-col justify-between items-center bg-white rounded-md shadow-md p-5">
      <div className="w-full border-b flex justify-between items-center pb-1">
        <p className="font-medium text-base text-slate-900">Citas pendientes</p>
      </div>
      <div className="w-full h-full py-3 flex flex-col justify-start items-start gap-4 rounded-md overflow-y-auto">
        {[...(appointments as Array<any>)].map((data, i) => {
          return(
            <div key={i}
            onClick={()=>{
              appointmentDetail({...data, appoinmentId: data["id"]})(dispatchSchedule); changeStatusPopup(true)(dispatchSchedule); changeTypePopup(2)(dispatchSchedule)
            }}
            className="transition cursor-pointer relative w-full min-h-[11vh] h-fit max-h-[14vh] bg-white hover:bg-slate-100 flex justify-between items-center p-2 gap-2 box-border rounded-md shadow-sm">
              <div className="w-10 h-full flex flex-col justify-center items-start">
                <div className='w-10 h-10 rounded-lg bg-primary/20 text-primary flex flex-col justify-center items-center text-lg overflow-hidden'>
                  <FiUser/>
                </div>
              </div>
              <div className="w-[53%] h-full flex flex-col justify-center items-start overflow-hidden">
                <p className='font-semibold text-sm text-slate-900 w-full whitespace-nowrap text-ellipsis'>{data["nombres"]} {data["primerApellido"]}</p>
                <p className='font-light text-sm text-slate-500 w-full whitespace-nowrap text-ellipsis'>{data["nombre"]}</p>
              </div>
              <div className="w-[40%] h-full flex flex-col justify-center items-end">
                <div className="w-full flex justify-end items-center gap-1 overflow-hidden">
                  <p className='font-semibold text-[12px] text-slate-900 whitespace-nowrap text-ellipsis'>{moment(data["fechaReserva"]).utc().format("DD/MM")} - {moment(data["fechaReserva"]).utc().format("hh:mm a")}</p>
                  {/* <Lucide icon="MoreVertical" className="w-5 h-5 text-slate-500" /> */}
                </div>
                <StatusComponent data={data} />
              </div>
            </div>
          )
        }
        )}
      </div>
      <Link
        href={"/schedule"}
        className="w-full transition p-[10px_50px] rounded cursor-pointer text-[13px] text-center bg-white font-semibold text-primary hover:bg-primary hover:text-white"
      >
        Ver todo
      </Link>
    </div>
  );
}
