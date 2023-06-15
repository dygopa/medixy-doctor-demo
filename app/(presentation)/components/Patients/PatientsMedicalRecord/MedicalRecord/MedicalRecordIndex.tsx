"use client";

import { useContext, useEffect } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "./context/MedicalRecordContext";
import Navigator from "./Navigator/Navigator";
import PatientDetails from "./PatientDetail/PatientDetail";

interface IMedicalRecordIndexProps {
  subjectId: number;
}

export default function MedicalRecordIndex({
  subjectId,
}: IMedicalRecordIndexProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getSubjectById } = actions;
  const { data: subject, loading, successful, error } = state.subject;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getSubjectById(subjectId)(dispatch);

    return () => {
      isCleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tu paciente.
        </p>
      </div>
    );

  if (error)
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

  if (!subject?.subjectId && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, se ha encontrado el paciente
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

      <div className="mt-10">
        <div className="mt-4">
          <PatientDetails subjectId={subjectId} />
        </div>
      </div>
    </div>
  );
}
