"use client";

import React, { useContext, useEffect } from "react";
import Navigator from "./Navigator/Navigator";
import ClientInformation from "./ClientInformation/ClientInformation";
import ActualService from "./ActualService/ActualService";
import ClientNotes from "./ClientNotes/ClientNotes";
import OwnerInformation from "./OwnerInformation/OwnerInformation";
import { twMerge } from "tailwind-merge";
import {
  AttentionContext,
  IAttentionContext,
} from "./context/AttentionContext";

interface IAttentionManagementIndexIndexProps {
  id: string;
}

function AttentionManagementIndex({ id }: IAttentionManagementIndexIndexProps) {
  const { state, actions, dispatch } =
    useContext<IAttentionContext>(AttentionContext);
  const { getAppointmentById } = actions;
  const { data: subject, loading, successful, error } = state.subject;
  const {
    data: appointment,
    loading: appointmentLoading,
    successful: appointmentSucessful,
    error: appointmentError,
  } = state.appointment;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getAppointmentById(id)(dispatch);

    return () => {
      isCleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || appointmentLoading)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          {loading ? "Cargando el paciente" : "Cargando la cita"}
        </p>
      </div>
    );

  if (error || appointmentError)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
      </div>
    );

  if (!appointment.data?.id && appointmentSucessful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">Esta cita no existe</p>
        <p className="font-light text-slate-500 text-base">
          La cita actual no existe para este servicio
        </p>
      </div>
    );
  }

  if (appointment.data?.id && appointmentSucessful && !subject?.subjectId) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Esta cita no esta disponible
        </p>
        <p className="font-light text-slate-500 text-base">
          La cita actual no se encuentra disponible
        </p>
      </div>
    );
  }

  if (!subject?.subjectId && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no se ha encontrado el paciente
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado el paciente
        </p>
      </div>
    );
  }

  if (!subject?.subjectId && !successful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="w-full relative flex flex-col justify-start items-start gap-3">
      <Navigator />
      <div
        className={twMerge([
          "w-full relative grid gap-3",
          "grid-cols-1 lg:grid-cols-3",
        ])}
      >
        <div
          className={twMerge([
            "h-auto flex flex-col justify-start items-center gap-3 relative lg:col-span-2",
          ])}
        >
          <ClientInformation />
          <ActualService />
          <ClientNotes />
        </div>
        {/* <div className="h-auto flex flex-col justify-start items-center relative">
          <OwnerInformation />
        </div> */}
      </div>
    </div>
  );
}

export default AttentionManagementIndex;
