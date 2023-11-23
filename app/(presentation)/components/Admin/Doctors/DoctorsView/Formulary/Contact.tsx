import { VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { IUser } from "domain/core/entities/userEntity";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface IFormularyProps {
  doctor: IUser | null;
}

export default function Contact({ doctor }: IFormularyProps) {
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">Contácto</p>
        </div>
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-semibold mb-2">
              Teléfono de contacto
            </p>
            {doctor?.phone && doctor?.phone.length > 0
              ? doctor?.phone
              : "No especificado"}
          </div>
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-semibold mb-2">
              Sitio web
            </p>
            {doctor?.websiteUrl && doctor?.websiteUrl.length > 0
              ? doctor?.websiteUrl
              : "No especificado"}
          </div>
        </div>
      </div>
    </div>
  );
}
