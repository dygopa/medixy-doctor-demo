import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";
import { FiUser } from "react-icons/fi";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";

export default function AboutPatient() {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: patient } = state.patient;

  return (
    <div
      className={clsx([
        "relative zoom-in lg:h-[27vh] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <div className="lg:flex block">
          <div className="text-center lg:border-r border-grey">
            <div className="flex w-full justify-center mb-4 mr-24">
              {patient && patient?.pictureUrl.length > 0 ? (
                <Image
                  className="object-cover rounded-full"
                  src={patient.pictureUrl}
                  alt=""
                  width={100}
                  height={100}
                />
              ) : (
                <FiUser size={60} />
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

          <div className="lg:pl-8 w-full">
            {/* <div className="w-full flex justify-end">
              <button
                type="button"
                className="hover:bg-dark rounded-md hover:bg-opacity-10 py-1 px-1"
              >
                <Lucide icon="MoreVertical" />
              </button>
              </div> */}

            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <p className="font-normal text-slate-500 mb-1">Nombre(s)</p>

                <span className="font-medium text-[16px]">
                  {patient?.name} {patient?.lastName}
                </span>
              </div>

              <div>
                <p className="font-normal text-slate-500 mb-1">
                  Primer apellido
                </p>

                <span className="font-medium text-[16px]">
                  {patient?.lastName}
                </span>
              </div>

              <div>
                <p className="font-normal text-slate-500 mb-1">
                  Segundo apellido
                </p>

                <span className="font-medium text-[16px]">
                  {patient && patient.motherLastName?.length > 0
                    ? patient?.motherLastName
                    : "-"}
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
                    : "-"}{" "}
                </span>
              </div>

              <div>
                <p className="font-normal text-slate-500 mb-1">CURP</p>

                <span className="font-medium text-[16px]">
                  {patient && patient.curp?.length > 0 ? patient?.curp : "-"}
                </span>
              </div>

              <div>
                <p className="font-normal text-slate-500 mb-1">Teléfono</p>

                <span className="font-medium text-[16px]">
                  {patient?.phoneNumber}
                </span>
              </div>

              <div>
                <p className="font-normal text-slate-500 mb-1">
                  Correo electrónico
                </p>

                <span className="font-medium text-[16px]">
                  {patient && patient.email?.length > 0 ? patient?.email : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
