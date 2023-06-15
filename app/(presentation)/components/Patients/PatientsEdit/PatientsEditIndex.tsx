"use client";

import { useContext, useEffect } from "react";
import {
  EditPatientContext,
  IEditPatientContext,
} from "./context/EditPatientContext";
import CompanionsListProvider from "./Formulary/Companion/context/companionListContext";
import Formulary from "./Formulary/Formulary";

interface IEditPatientIndexProps {
  patientId: number;
}

export default function EditPatientIndex({
  patientId,
}: IEditPatientIndexProps) {
  const { state, actions, dispatch } =
    useContext<IEditPatientContext>(EditPatientContext);
  const { getSubjectById } = actions;
  const { data: patient, loading, successful, error } = state.subject;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getSubjectById(patientId)(dispatch);

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

  if (!patient?.subjectId && successful) {
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

  if (!patient?.subjectId && !successful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="py-5">
      <CompanionsListProvider>
        <Formulary />
      </CompanionsListProvider>
    </div>
  );
}
