"use client";

import ScheduleProvider from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AppointmentCreatePopup from "./AppointmentCreatePopup/AppointmentCreatePopup";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "./context/MedicalRecordContext";
import Navigator from "./Navigator/Navigator";
import PatientDetails from "./PatientDetail/PatientDetail";

interface IMedicalRecordIndexProps {
  user: IUser;
  id: string;
}

export default function MedicalRecordIndex({
  user,
  id,
}: IMedicalRecordIndexProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
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

  const edit = searchParams.get("edit_subject");

  const appointmentCreate = searchParams.get("appointment_create");

  const [showAppointmentCreatePopup, setShowAppointmentCreatePopup] =
    useState(false);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && type !== "appointment")
      getSubjectById(parseInt(id, 10))(dispatch);

    if (isCleanup && type === "appointment") getAppointmentById(id)(dispatch);

    return () => {
      isCleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  useEffect(() => {
    if (appointmentCreate && appointmentCreate === "true")
      setShowAppointmentCreatePopup(true);
  }, [appointmentCreate]);

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
    <>
      <div className="py-5">
        <ScheduleProvider>
          <Navigator user={user} />
        </ScheduleProvider>

        <div className="mt-10">
          <div className="mt-4">
            <PatientDetails
              user={user}
              subjectId={subject?.subjectId ?? 0}
              appointment={appointment}
            />
          </div>
        </div>
      </div>

      {showAppointmentCreatePopup && (
        <AppointmentCreatePopup
          showAppointmentCreatePopup={showAppointmentCreatePopup}
          setShowAppointmentCreatePopup={setShowAppointmentCreatePopup}
        />
      )}
    </>
  );
}
