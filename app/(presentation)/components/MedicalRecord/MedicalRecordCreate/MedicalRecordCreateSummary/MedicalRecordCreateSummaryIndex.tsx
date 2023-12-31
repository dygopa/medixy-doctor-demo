"use client";

import { IUser } from "domain/core/entities/userEntity";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "./context/MedicalRecordCreateSummaryContext";
import Detail from "./Detail/Detail";
import Navigator from "./Navigator/Navigator";

interface IMedicalRecordCreateSummaryIndexProps {
  user: IUser;
  id: string;
}

export default function MedicalRecordCreateSummaryIndex({
  user,
  id,
}: IMedicalRecordCreateSummaryIndexProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordCreateSummaryContext>(
      MedicalRecordCreateSummaryContext
    );
  const { getSubjectById, getAppointmentById } = actions;
  const { data: subject, loading, successful, error } = state.subject;
  const {
    data: appointment,
    loading: appointmentLoading,
    successful: appointmentSucessful,
    error: appointmentError,
  } = state.appointment;

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && type !== "appointment")
      getSubjectById(parseInt(id, 10))(dispatch);

    if (isCleanup && type === "appointment") getAppointmentById(id)(dispatch);

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
          {loading ? "Cargando tu paciente" : "Cargando la cita"}
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
          La cita actual no existe en tu agenda
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
    <div className="py-5">
      <Navigator />

      <div className="mt-10 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Detail user={user} />
        </div>
      </div>
    </div>
  );
}
