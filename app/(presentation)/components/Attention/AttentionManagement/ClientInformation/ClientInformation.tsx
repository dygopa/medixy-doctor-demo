import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { getFirstLetter } from "(presentation)/(helper)/strings/strings";
import Image from "next/image";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import {
  AttentionContext,
  IAttentionContext,
} from "../context/AttentionContext";
import { TextGroup } from "../TextGroup/TextGroup";
import Allergies from "./Allergies/Allergies";

function ClientInformation() {
  const { state } = useContext<IAttentionContext>(AttentionContext);
  const { data: appointment } = state.appointment;
  const { data: subject } = state.subject;

  const AvatarComponent = () => {
    const Status = () => (
      <span
        className={twMerge([
          "font-medium p-[1.0%_7%] rounded text-sm",
          appointment.data.status === MedicalRecordStatusEnum.COMPLETE
            ? "bg-green-400 text-white"
            : appointment.data.status === MedicalRecordStatusEnum.CANCELED
            ? "text-white bg-red-500"
            : "text-yellow-800 bg-yellow-300",
        ])}
      >
        {appointment.data.status === MedicalRecordStatusEnum.COMPLETE
          ? "Atendido"
          : appointment.data.status === MedicalRecordStatusEnum.CANCELED
          ? "Cancelada"
          : "En atención"}
      </span>
    );

    return (
      <div className="h-full flex flex-col justify-center items-center border-r px-3 gap-1">
        {subject && subject?.pictureUrl.length > 0 ? (
          <div className="relative w-[100px] h-[100px]">
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
        <Status />
      </div>
    );
  };

  return (
    <div
      className={twMerge([
        "w-full h-fit relative bg-white rounded-md shadow-xl p-3",
        "grid gap-2",
        "lg:grid-cols-5 md:grid-cols-5 grid-cols-1",
      ])}
    >
      <AvatarComponent />
      <div className="flex flex-col justify-center items-start gap-2 h-full relative">
        <TextGroup label={"Nombre"} data={subject?.name ?? ""} />
        <TextGroup
          label={"Primer apellido"}
          data={
            subject?.lastName && subject.lastName.length > 0
              ? subject.lastName
              : "No especificado"
          }
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-2 h-full relative">
        <TextGroup
          label={"Segundo apellido"}
          data={
            subject?.motherLastName && subject.motherLastName.length > 0
              ? subject.motherLastName
              : "No especificado"
          }
        />
        <TextGroup
          label={"Edad"}
          data={
            subject?.age
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
              : "No especificado"
          }
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-2 h-full relative">
        <TextGroup
          label={"CURP"}
          data={
            subject?.curp && subject.curp.length > 0
              ? subject.curp
              : "No especificado"
          }
        />
        <TextGroup
          label={"Teléfono"}
          data={
            subject?.phoneNumber && subject.phoneNumber.length > 0
              ? subject.phoneNumber
              : "No especificado"
          }
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-2 h-full relative">
        <Allergies />
        <TextGroup label={""} data={""} />
      </div>
    </div>
  );
}

export default ClientInformation;
