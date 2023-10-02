import React, { useContext } from "react";
import {
  AttentionContext,
  IAttentionContext,
} from "../context/AttentionContext";
import { TextGroup } from "../TextGroup/TextGroup";

function OwnerInformation() {
  const { state } = useContext<IAttentionContext>(AttentionContext);
  const { data: subject } = state.subject;

  return (
    <div className="w-full h-fit relative bg-white flex flex-col justify-start items-start rounded-md shadow-xl">
      <div className="w-full pb-2 border-b flex justify-between items-center p-2">
        <p className="font-bold text-slate-900 text-sm">Contacto del dueño</p>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2 px-2 py-4">
        <TextGroup
          label={"Nombres"}
          data={`${subject?.owner.firstName ?? ""} ${
            subject?.owner.lastName ?? ""
          }`}
        />
        <TextGroup
          label={"Teléfono"}
          data={
            subject?.owner.phoneNumber && subject?.owner.phoneNumber.length > 0
              ? subject.owner.phoneNumber
              : "No especificado"
          }
        />
        <TextGroup label={"Correo"} data={subject?.owner.email ?? ""} />
      </div>
    </div>
  );
}

export default OwnerInformation;
