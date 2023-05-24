"use client";

import { useContext, useEffect } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "./context/MedicalRecordCreateSummaryContext";
import Detail from "./Detail/Detail";
import Navigator from "./Navigator/Navigator";

interface IMedicalRecordCreateSummaryIndexProps {
  patientId: number;
}

export default function MedicalRecordCreateSummaryIndex({
  patientId,
}: IMedicalRecordCreateSummaryIndexProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordCreateSummaryContext>(
      MedicalRecordCreateSummaryContext
    );
  const { getPatientById } = actions;
  const { data: patient, loading, successful, error } = state.patient;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getPatientById(patientId)(dispatch);

    return () => {
      isCleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
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

  if (!patient?.patientId && successful) {
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

  if (!patient?.patientId && !successful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="py-5">
      <Navigator />

      <div className="mt-10 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Detail />
        </div>
      </div>
    </div>
  );
}
