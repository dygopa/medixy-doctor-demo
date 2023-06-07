import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Detail from "./Detail/Detail";
import Header from "./Header/Header";
import clsx from "clsx";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";
import { useSearchParams } from "next/navigation";

interface IMainPopupProps {
  patientId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  popupSectionActive: number;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

function MainPopup({
  patientId,
  isOpen,
  setIsOpen,
  popupSectionActive,
  setPopupSectionActive,
}: IMainPopupProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getPatientById } = actions;
  const { data: patient, loading, successful, error } = state.patient;

  const searchParams = useSearchParams();

  const viewMedicalRecord = searchParams.get("view_medical_record");
  const medicalRecordId = searchParams.get("medical_record_id");

  useEffect(() => {
    if (viewMedicalRecord === "true" && medicalRecordId) setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMedicalRecord, medicalRecordId]);

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
    <div
      className={clsx([
        "fixed w-full h-screen overflow-hidden z-[100] top-0 right-0 bg-slate-900/50 justify-end items-start box-border",
        isOpen ? "flex" : "hidden",
      ])}
    >
      <div className="bg-white xl:w-1/2 lg:w-1/2 md:w-[700px] w-full h-screen block relative box-border">
        <div>
          <Header patientId={patientId} setIsOpen={setIsOpen} />
        </div>

        <div className="p-4 overflow-y-auto h-screen">
          <Detail
            patientId={patientId}
            popupSectionActive={popupSectionActive}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>
      </div>
    </div>
  );
}
export default MainPopup;
