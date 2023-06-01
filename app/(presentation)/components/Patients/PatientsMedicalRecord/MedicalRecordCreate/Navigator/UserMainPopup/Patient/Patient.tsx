import Image from "next/image";
import { useContext } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../context/MedicalRecordCreateContext";
import { FiUser } from "react-icons/fi";

export default function Patient() {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: patient } = state.patient;

  return (
    <div className="py-8">
      <div className="text-center">
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

      <div className="w-full flex justify-between mt-12">
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-14">
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

          <div>
            <p className="font-normal text-slate-500 mb-1">Primer apellido</p>

            <span className="font-medium text-[16px]">{patient?.lastName}</span>
          </div>

          <div>
            <p className="font-normal text-slate-500 mb-1">Segundo apellido</p>

            <span className="font-medium text-[16px]">
              {patient && patient.motherLastName?.length > 0
                ? patient.motherLastName
                : "No especificado"}
            </span>
          </div>

          <div>
            <p className="font-normal text-slate-500 mb-1">CURP</p>

            <span className="font-medium text-[16px]">
              {patient && patient.curp?.length > 0
                ? patient.curp
                : "No especificado"}
            </span>
          </div>

          <div>
            <p className="font-normal text-slate-500 mb-1">Teléfono</p>

            <span className="font-medium text-[16px]">
              {patient && patient.phoneNumber?.length > 0
                ? patient.phoneNumber
                : "No especificado"}
            </span>
          </div>

          <div>
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
      </div>
    </div>
  );
}
