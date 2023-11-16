import clsx from "clsx";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../context/MedicalRecordCreateContext";
import { getFirstLetter } from "(presentation)/(helper)/strings/strings";

interface IPatientProps {
  showCompleteDetails: boolean;
  setShowCompleteDetails: Dispatch<SetStateAction<boolean>>;
  windowWidth: number;
}

export default function Patient({
  showCompleteDetails,
  setShowCompleteDetails,
  windowWidth,
}: IPatientProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: subject } = state.subject;

  return (
    <div
      className={clsx([
        "relative h-auto transition-all z-50",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        !showCompleteDetails && "zoom-in",
        windowWidth <= 992
          ? "w-[325px]"
          : showCompleteDetails
          ? "w-full"
          : "w-[325px]",
      ])}
    >
      <div className="p-4 box h-full">
        <div className="lg:flex md:flex block">
          <div className="text-center lg:border-r border-grey">
            <div className="flex w-full justify-center mb-4 mr-10">
              {subject && subject?.pictureUrl.length > 0 ? (
                <div className="relative w-[75px] h-[75px]">
                  <Image
                    className="object-cover rounded-full"
                    src={subject.pictureUrl}
                    alt=""
                    fill
                  />
                </div>
              ) : (
                <div className="w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center">
                  <span className="text-white font-semibold text-2xl">
                    {getFirstLetter(subject?.name ?? "").toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="w-full flex justify-center items-center gap-2">
                <p className="font-medium p-[1.0%_7%] rounded text-xs text-yellow-800 bg-yellow-300">
                  Por atención
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pl-4 w-full flex justify-between xl:mt-0 mt-4">
            <div
              className={clsx([
                windowWidth <= 992 &&
                  "grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8",
              ])}
            >
              <div className="mb-2">
                <p className="font-normal text-slate-500 mb-1 text-md">
                  Nombre(s)
                </p>

                <p className="font-medium text-[16px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.name}
                </p>
              </div>

              <div className="mb-2">
                <p className="font-normal text-slate-500 mb-1 text-md">Edad</p>

                <p className="font-medium text-[16px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.age
                    ? subject.age > 1
                      ? `${subject.age} ${
                          subject?.ageType === "years"
                            ? "años"
                            : subject.ageType === "days"
                            ? "días"
                            : "meses"
                        }`
                      : `${subject.age} ${
                          subject?.ageType === "years"
                            ? "año"
                            : subject.ageType === "days"
                            ? "día"
                            : "mes"
                        }`
                    : "No especificado"}
                </p>
              </div>

              <div>
                <p className="font-normal text-slate-500 mb-1 text-md">Sexo</p>

                <p className="font-medium text-[16px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.sex
                    ? subject.sex === 1
                      ? "Femenino"
                      : "Masculino"
                    : "No especificado"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
