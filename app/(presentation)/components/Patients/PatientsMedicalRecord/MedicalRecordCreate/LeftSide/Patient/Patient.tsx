import clsx from "clsx";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../context/MedicalRecordCreateContext";
import { FiUser } from "react-icons/fi";

interface IPatientProps {
  showCompleteDetails: boolean;
  setShowCompleteDetails: Dispatch<SetStateAction<boolean>>;
}

export default function Patient({
  showCompleteDetails,
  setShowCompleteDetails,
}: IPatientProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: patient } = state.patient;

  return (
    <div
      className={clsx([
        "relative h-auto transition-all  z-50",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        showCompleteDetails ? "lg:w-[93%]" : "xl:w-[385px] w-full",
      ])}
    >
      <div className="p-4 box h-full">
        <div className="lg:flex block">
          <div className="text-center lg:border-r border-grey">
            <div className="flex w-full justify-center mb-4 mr-24">
              {patient && patient?.pictureUrl?.length > 0 ? (
                <Image
                  className="object-cover rounded-full"
                  src={patient.pictureUrl}
                  alt=""
                  width={100}
                  height={100}
                />
              ) : (
                <FiUser size={80} />
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

          <div className="lg:pl-8 lg:flex w-full lg:justify-between xl:mt-0 mt-4">
            <div
              className={clsx([
                showCompleteDetails
                  ? "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full"
                  : "grid xl:grid-cols-1 md:grid-cols-3 grid-cols-1 gap-8",
              ])}
            >
              <div>
                <p className="font-normal text-slate-500 mb-1">Nombre(s)</p>

                <span className="font-medium text-[16px]">
                  {patient?.name} {patient?.lastName}
                </span>
              </div>
              <div>
                <p className="font-normal text-slate-500 mb-1">Edad</p>

                <span className="font-medium text-[16px]">
                  {patient?.age
                    ? patient.age > 1
                      ? `${patient.age} ${
                          patient?.ageType === "years" ? "años" : "meses"
                        }`
                      : `${patient.age} ${
                          patient?.ageType === "years" ? "año" : "mes"
                        }`
                    : "No especificado"}{" "}
                </span>
              </div>

              <div
                className={clsx([
                  showCompleteDetails ? "block" : "xl:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">
                  Primer apellido
                </p>

                <span className="font-medium text-[16px]">
                  {patient?.lastName}
                </span>
              </div>

              <div
                className={clsx([
                  showCompleteDetails ? "block" : "xl:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">
                  Segundo apellido
                </p>

                <span className="font-medium text-[16px]">
                  {patient && patient.motherLastName?.length > 0
                    ? patient.motherLastName
                    : "No especificado"}
                </span>
              </div>

              <div
                className={clsx([
                  showCompleteDetails ? "block" : "xl:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">CURP</p>

                <span className="font-medium text-[16px]">
                  {patient && patient.curp?.length > 0
                    ? patient.curp
                    : "No especificado"}
                </span>
              </div>

              <div
                className={clsx([
                  showCompleteDetails ? "block" : "xl:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">Teléfono</p>

                <span className="font-medium text-[16px]">
                  {patient && patient.phoneNumber?.length > 0
                    ? patient.phoneNumber
                    : "No especificado"}
                </span>
              </div>

              <div
                className={clsx([
                  showCompleteDetails ? "block" : "xl:hidden block",
                ])}
              >
                <p className="font-normal text-slate-500 mb-1">
                  Correo electrónico
                </p>

                <span className="font-medium text-[16px]">
                  {patient && patient.email?.length > 0
                    ? patient.email
                    : "No especificado"}
                </span>
              </div>
            </div>

            <div className="h-full justify-center align-middle items-center -mr-6 xl:flex hidden">
              <button
                type="button"
                className="rounded-full shadow-md bg-white"
                onClick={() => setShowCompleteDetails(!showCompleteDetails)}
              >
                <Lucide
                  icon={showCompleteDetails ? "ChevronLeft" : "ChevronRight"}
                  color="#22345F"
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
