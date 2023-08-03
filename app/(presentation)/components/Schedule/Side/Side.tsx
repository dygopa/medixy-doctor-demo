import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import React, { MouseEventHandler, useContext, useMemo } from "react";
import { IScheduleContext, ScheduleContext } from "../context/ScheduleContext";
import moment from "moment";
import "moment/locale/es";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Loading from "(presentation)/components/core/Loading/Loading";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FiUser } from "react-icons/fi";
import { AppointmentEnum } from "(presentation)/(enum)/appointment/appointmentEnum";

const StatusComponent = ({ data }: { data: any }) => {
  let status = data["estado"];

  let text = "";
  let color = "";

  if (status === AppointmentEnum.NOT_AVAILABLE) {
    text = "No disponible";
    color = "bg-yellow-500";
  }

  if (
    status === AppointmentEnum.APPROVED &&
    moment(data["fechaReserva"]).isBefore(moment().utc(true))
  ) {
    text = "No asistió";
    color = "bg-slate-200";
  }
  if (
    status === AppointmentEnum.PENDING &&
    moment(data["fechaReserva"]).isBefore(moment().utc(true))
  ) {
    text = "No asistió";
    color = "bg-slate-200";
  }

  if (
    status === AppointmentEnum.APPROVED &&
    moment(data["fechaReserva"]).isAfter(moment().utc(true))
  ) {
    text = "Aprovada";
    color = "bg-yellow-500";
  }
  if (
    status === AppointmentEnum.PENDING &&
    moment(data["fechaReserva"]).isAfter(moment().utc(true))
  ) {
    text = "Por atender";
    color = "bg-yellow-500";
  }

  if (status === AppointmentEnum.CANCELED) {
    text = "Cancelada";
    color = "bg-red-500";
  }
  if (status === AppointmentEnum.COMPLETE) {
    text = "Completada";
    color = "bg-green-500";
  }
  if (status === AppointmentEnum.PROCESSING) {
    text = "En curso";
    color = "bg-green-500";
  }

  return (
    <div className="w-full flex justify-end items-center gap-2">
      <p className="font-light text-[12px] text-gray-700">{text}</p>
      <span className={twMerge(["w-2 h-2 rounded-full", color])}></span>
    </div>
  );
};

const AppointmentComponent = ({
  onClick,
  data,
}: {
  onClick: MouseEventHandler;
  data: any;
}) => {
  let isPending = data["estado"] === 1;
  let hour = moment(data["fechaReserva"]).utc().format("hh:mm a").toString();

  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative w-full min-h-[11vh] h-fit max-h-[14vh] bg-white flex justify-between items-center p-3 gap-2 box-border rounded-md shadow-sm"
    >
      <div className="w-10 h-full flex flex-col justify-center items-start">
        <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex flex-col justify-center items-center text-lg overflow-hidden">
          <FiUser />
        </div>
      </div>
      <div className="w-[53%] h-full flex flex-col justify-between items-start overflow-hidden">
        <p className="font-semibold text-sm text-slate-900 w-full whitespace-nowrap text-ellipsis">
          {data["nombres"]} {data["primerApellido"]}
        </p>
        <p className="font-light text-[12px] text-slate-500 w-full whitespace-nowrap text-ellipsis">
          {data["nombre"]}
        </p>
      </div>
      <div className="w-[30%] h-full flex flex-col justify-between items-end">
        <div className="w-full flex justify-end items-center gap-1 overflow-hidden">
          <p className="font-semibold text-[12px] text-slate-900 whitespace-nowrap text-ellipsis">
            {hour}
          </p>
          {/* <Lucide icon="MoreVertical" className="w-5 h-5 text-slate-500" /> */}
        </div>
        <StatusComponent data={data} />
      </div>
    </div>
  );
};

const Side = () => {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    getAppointments,
    changeStatusPopup,
    changeTypePopup,
    appointmentDetail,
  } = actions;
  const { data, loading, successful, error } = state.getAppointments;
  const {
    successful: localitySuccessful,
    error: localityError,
    data: locality,
  } = state.activeLocality;
  const { data: activeDay, successful: changedActiveDay } = state.activeDay;
  const { data: actualDay } = state.actualDay;

  useMemo(()=>{
    if(localitySuccessful){
      getAppointments(user.userId, moment(activeDay["start"]).format("YYYY-MM-DD"), moment(activeDay["end"]).format("YYYY-MM-DD"), locality["id"])(dispatch)
    }
  },[activeDay, locality]) 

  useMemo(() => {
    if (actualDay)
      getAppointments(
        user.userId,
        moment(actualDay).format("YYYY-MM-DD"), 
        moment(actualDay).add(1, "day").format("YYYY-MM-DD"), 
        locality["id"]
      )(dispatch);
  }, [actualDay]);

  return (
    <div className="w-full lg:w-1/3 flex flex-col justify-start items-center gap-3">
      <div className="w-full flex justify-between items-center">
        {moment(actualDay).day() === moment().day() &&
        moment(actualDay).month() === moment().month() &&
        moment(actualDay).year() === moment().year() ? (
          <p className="font-light text-xl text-slate-900">
            <span className="capitalize">
              {moment().locale("es").format("dddd")}
            </span>{" "}
            - {moment().format("h:mm a")}
          </p>
        ) : (
          <p className="font-light text-xl text-slate-900">
            <span className="capitalize">
              {moment(actualDay).locale("es").format("dddd")}
            </span>
          </p>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-3">
        {loading && <Loading />}
        {successful &&
          data.length > 0 &&
          data.map((elem: any) => (
            <AppointmentComponent
              data={elem}
              onClick={() => {
                appointmentDetail({ ...elem, appoinmentId: elem["id"] })(
                  dispatch
                );
                changeStatusPopup(true)(dispatch);
                changeTypePopup(2)(dispatch);
              }}
            />
          ))}
        {successful && data.length === 0 && (
          <div className="w-full h-auto rounded-md overflow-y-auto text-center mt-8">
            <p className="font-medium text-lg text-slate-900 mb-3">
              Nada por aquí aún
            </p>
            <p className="font-light text-sm text-slate-500">
              No tienes citas para esta fecha aún en la plataforma, crea una
              consulta para hoy o revisa que tengas{" "}
              <Link href="/services" className="font-semibold text-primary">
                servicios
              </Link>{" "}
              creados para exponerte a tus pacientes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Side;
