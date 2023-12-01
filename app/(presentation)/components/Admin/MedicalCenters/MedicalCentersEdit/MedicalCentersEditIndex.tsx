"use client";

import { useContext, useEffect } from "react";
import {
  IMedicalCentersEditContext,
  MedicalCentersEditContext,
} from "./context/MedicalCentersEditContext";
import Formulary from "./Formulary/Formulary";

interface IMedicalCentersEditIndexProps {
  medicalCenterId: number;
}

export default function MedicalCentersEditIndex({
  medicalCenterId,
}: IMedicalCentersEditIndexProps) {
  const { state, actions, dispatch } = useContext<IMedicalCentersEditContext>(
    MedicalCentersEditContext
  );
  const { getMedicalCenterById } = actions;
  const {
    data: medicalCenter,
    loading,
    successful,
    error,
  } = state.getMedicalCenter;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup)
      getMedicalCenterById({ supplierId: medicalCenterId })(dispatch);

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
          Cargando centro médico.
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

  if (!medicalCenter?.data?.supplierId && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no se ha encontrado el centro médico
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado el centro médico
        </p>
      </div>
    );
  }

  if (!medicalCenter?.data?.supplierId && !successful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="py-5">
      <div className="mt-5 md:mt-7">
        <div className="">
          <Formulary />
        </div>
      </div>
    </div>
  );
}
