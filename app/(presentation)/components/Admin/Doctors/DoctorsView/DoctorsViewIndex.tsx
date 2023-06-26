"use client";

import { useContext, useEffect } from "react";
import {
  DoctorViewContext,
  IDoctorViewContext,
} from "./context/DoctorViewContext";
import Formulary from "./Formulary/Formulary";

interface IDoctorViewIndexProps {
  doctorId: number;
}

export default function DoctorViewIndex({
  doctorId,
}: IDoctorViewIndexProps) {
  const { state, actions, dispatch } =
    useContext<IDoctorViewContext>(DoctorViewContext);
  const { getDoctorById, getUserMedicalSpecialities } = actions;
  const { data: doctor, loading, successful, error } = state.getDoctorById;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) { 
      getDoctorById(doctorId)(dispatch);
      getUserMedicalSpecialities(doctorId)(dispatch);
    };

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
          Cargando tel doctor.
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

  if (!doctor?.userId && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no se ha encontrado al doctor
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado al doctor
        </p>
      </div>
    );
  }

  if (!doctor?.userId && !successful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="py-5">
        <Formulary />
    </div>
  );
}
