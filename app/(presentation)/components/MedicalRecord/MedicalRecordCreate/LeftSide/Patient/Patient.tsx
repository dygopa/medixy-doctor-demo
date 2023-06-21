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

  const getSizeCard = () => {
    if (windowWidth <= 992) return "w-full";

    if (windowWidth <= 1862) return "xl:w-[400px]";

    return "xl:w-[375px] w-full";
  };

  return (
    <div
      onClick={
        !showCompleteDetails
          ? () => setShowCompleteDetails(!showCompleteDetails)
          : () => {}
      }
      className={clsx([
        "relative h-auto transition-all z-50",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        !showCompleteDetails && "zoom-in",
        windowWidth <= 992
          ? "w-full"
          : showCompleteDetails
          ? "w-full"
          : getSizeCard(),
      ])}
    >
      <div className="p-4 box h-full">
        <div className="lg:flex md:flex block">
          <div className="text-center lg:border-r border-grey">
            <div className="flex w-full justify-center mb-4 mr-24">
              {subject && subject?.pictureUrl?.length > 0 ? (
                <Image
                  className="object-cover rounded-full"
                  src={subject.pictureUrl}
                  alt=""
                  width={100}
                  height={100}
                />
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
                <p className="font-medium p-[1.0%_7%] rounded text-sm text-yellow-800 bg-yellow-300">
                  Por atención
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8 w-full flex justify-between xl:mt-0 mt-4">
            <div
              className={clsx([
                windowWidth <= 992
                  ? "grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8"
                  : showCompleteDetails
                  ? "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8"
                  : "grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-8",
              ])}
            >
              <div>
                <p className="font-normal text-slate-500 mb-1">Nombre(s)</p>

                <span className="font-medium text-[16px]">
                  {subject?.name} {subject?.lastName}
                </span>
              </div>
              <div>
                <p className="font-normal text-slate-500 mb-1">Edad</p>

                <span className="font-medium text-[16px]">
                  {subject?.age
                    ? subject.age > 1
                      ? `${subject.age} ${
                          subject?.ageType === "years" ? "años" : "meses"
                        }`
                      : `${subject.age} ${
                          subject?.ageType === "years" ? "año" : "mes"
                        }`
                    : "No especificado"}{" "}
                </span>
              </div>

              <div
                className={clsx([
                  windowWidth <= 992
                    ? "block"
                    : showCompleteDetails
                    ? "block"
                    : "xl:hidden lg:hidden md:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">
                  Primer apellido
                </p>

                <span className="font-medium text-[16px]">
                  {subject?.lastName}
                </span>
              </div>

              <div
                className={clsx([
                  windowWidth <= 992
                    ? "block"
                    : showCompleteDetails
                    ? "block"
                    : "xl:hidden lg:hidden md:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">
                  Segundo apellido
                </p>

                <span className="font-medium text-[16px]">
                  {subject && subject.motherLastName?.length > 0
                    ? subject.motherLastName
                    : "No especificado"}
                </span>
              </div>

              <div
                className={clsx([
                  windowWidth <= 992
                    ? "block"
                    : showCompleteDetails
                    ? "block"
                    : "xl:hidden lg:hidden md:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">CURP</p>

                <span className="font-medium text-[16px]">
                  {subject && subject.curp?.length > 0
                    ? subject.curp
                    : "No especificado"}
                </span>
              </div>

              <div
                className={clsx([
                  windowWidth <= 992
                    ? "block"
                    : showCompleteDetails
                    ? "block"
                    : "xl:hidden lg:hidden md:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">Teléfono</p>

                <span className="font-medium text-[16px]">
                  {subject && subject.phoneNumber?.length > 0
                    ? subject.phoneNumber
                    : "No especificado"}
                </span>
              </div>

              <div
                className={clsx([
                  windowWidth <= 992
                    ? "block"
                    : showCompleteDetails
                    ? "block"
                    : "xl:hidden lg:hidden md:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">
                  Correo electrónico
                </p>

                <span className="font-medium text-[16px]">
                  {subject && subject.email?.length > 0
                    ? subject.email
                    : "No especificado"}
                </span>
              </div>
            </div>

            <div
              className={clsx([
                "h-full justify-center align-middle items-center -mr-6 hidden",
                windowWidth <= 992 ? "hidden" : "xl:flex lg:flex md:flex",
              ])}
            >
              <button
                type="button"
                className="rounded-full shadow-md bg-white hover:bg-primary hover:text-white"
                onClick={() => setShowCompleteDetails(!showCompleteDetails)}
              >
                <Lucide
                  icon={showCompleteDetails ? "ChevronLeft" : "ChevronRight"}
                  size={30}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
