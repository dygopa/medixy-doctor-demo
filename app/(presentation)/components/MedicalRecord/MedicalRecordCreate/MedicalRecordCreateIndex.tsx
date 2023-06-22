"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MedicalRecordCreateProvider, {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "./context/MedicalRecordCreateContext";
import LeftSide from "./LeftSide/LeftSide";
import MainPopup from "./MainPopup/MainPopup";
import Navigator from "./Navigator/Navigator";
import RightSide from "./RightSide/RightSide";

interface IMedicalRecordCreateIndexProps {
  id: string;
}

export default function MedicalRecordCreateIndex({
  id,
}: IMedicalRecordCreateIndexProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getSubjectById, getAppointmentById } = actions;
  const { data: subject, loading, successful, error } = state.subject;
  const {
    data: appointment,
    loading: appointmentLoading,
    successful: appointmentSucessful,
    error: appointmentError,
  } = state.appointment;

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [popupSectionActive, setPopupSectionActive] = useState(0);

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const getLeftSideColSpan = () => {
    if (screenSize.width <= 992) return "xl:col-span-0";

    if (screenSize.width <= 1500) return "xl:col-span-5";

    if (screenSize.width <= 1862) return "xl:col-span-4";

    return "xl:col-span-3";
  };

  const getRightSideColSpan = () => {
    if (screenSize.width <= 992) return "xl:col-span-12 col-span-12";

    if (screenSize.width <= 1500) return "xl:col-span-7 col-span-7";

    if (screenSize.width <= 1862) return "xl:col-span-8";

    return "xl:col-span-9";
  };

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };

    if (screenSize.width === 0 && screenSize.height === 0) updateDimension();

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

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
    <>
      <div className="py-5">
        <Navigator
          setIsOpen={setIsOpen}
          setPopupSectionActive={setPopupSectionActive}
        />

        <div className="mt-10 grid grid-cols-12 gap-4">
          <div className={clsx(["col-span-5", getLeftSideColSpan()])}>
            <LeftSide windowWidth={screenSize.width} />
          </div>

          <div className={clsx([getRightSideColSpan()])}>
            <RightSide width={screenSize.width} />
          </div>
        </div>
      </div>

      {isOpen && (
        <MedicalRecordCreateProvider>
          <MainPopup
            subjectId={subject?.subjectId ?? 0}
            appointmentId={appointment.data?.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            popupSectionActive={popupSectionActive}
            setPopupSectionActive={setPopupSectionActive}
          />
        </MedicalRecordCreateProvider>
      )}
    </>
  );
}