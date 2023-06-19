"use client";

import clsx from "clsx";
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
  subjectId: number;
}

export default function MedicalRecordCreateIndex({
  subjectId,
}: IMedicalRecordCreateIndexProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getSubjectById } = actions;
  const { data: subject, loading, successful, error } = state.subject;

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [popupSectionActive, setPopupSectionActive] = useState(0);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

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
    <>
      <div className="py-5">
        <Navigator
          setIsOpen={setIsOpen}
          setPopupSectionActive={setPopupSectionActive}
        />

        <div className="mt-10 grid grid-cols-12 gap-4">
          <div
            className={clsx([
              "col-span-12",
              screenSize.width <= 1866 ? "xl:col-span-0" : "xl:col-span-3",
            ])}
          >
            <LeftSide windowWidth={screenSize.width} />
          </div>

          <div
            className={clsx([
              "col-span-12",
              screenSize.width <= 1866 ? "xl:col-span-12" : "xl:col-span-9",
            ])}
          >
            <RightSide width={screenSize.width} />
          </div>
        </div>
      </div>

      {isOpen && (
        <MedicalRecordCreateProvider>
          <MainPopup
            subjectId={subjectId}
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
