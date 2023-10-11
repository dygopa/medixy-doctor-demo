"use client";

import { IUser } from "domain/core/entities/userEntity";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordSummaryContext,
  MedicalRecordSummaryContext,
} from "./context/MedicalRecordSummaryContext";
import Detail from "./Detail/Detail";
import Navigator from "./Navigator/Navigator";

interface IMedicalRecordSummaryIndexProps {
  user: IUser;
  id: number;
}

export default function MedicalRecordSummaryIndex({
  user,
  id,
}: IMedicalRecordSummaryIndexProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordSummaryContext>(
    MedicalRecordSummaryContext
  );
  const { getMedicalConsultyById } = actions;
  const {
    data: medicalConsulty,
    loading,
    successful,
    error,
  } = state.getMedicalConsultyById;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getMedicalConsultyById(id)(dispatch);

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
          Cargando la consulta.
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

  if (!medicalConsulty?.id && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no se ha encontrado la consulta
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado la consulta
        </p>
      </div>
    );
  }

  if (!medicalConsulty?.id && !successful)
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
