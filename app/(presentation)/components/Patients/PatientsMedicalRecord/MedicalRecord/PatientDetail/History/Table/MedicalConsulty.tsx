import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import clsx from "clsx";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { useState } from "react";

interface IMedicalConsultyProps {
  medicalConsulty: IMedicalConsulty;
}

export default function MedicalConsulty({
  medicalConsulty,
}: IMedicalConsultyProps) {
  const { setIsOpen, setMedicalConsulty } = useMedicalRecord();
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      key={medicalConsulty.id}
      className="intro-x cursor-pointer lg:flex md:flex sm:flex justify-between rounded-md items-center p-4 bg-white hover:bg-primary shadow-[20px_3px_20px_#0000000b] "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        setMedicalConsulty(medicalConsulty);
        setIsOpen(true);
      }}
    >
      <div className="flex items-center overflow-y-hidden">
        <div className="mr-10">
          <p
            className={clsx([
              " lg:text-md",
              isHover ? "text-white" : "text-slate-900",
            ])}
          >
            {new Date(medicalConsulty.consultationDate).getDate()}/
            {new Date(medicalConsulty.consultationDate).getMonth()}/
            {new Date(medicalConsulty.consultationDate).getFullYear()}
          </p>
        </div>

        <div>
          <div>
            <p className={clsx([isHover ? "text-white" : "text-slate-500"])}>
              Diagnóstico
            </p>
          </div>

          <div>
            <p
              className={clsx([
                "lg:text-md",
                isHover ? "text-white" : "text-slate-900",
              ])}
              style={{
                display: "block",
                textOverflow: "ellipsis",
                wordWrap: "break-word",
                overflow: "hidden",
                maxHeight: "3.6rem",
                maxWidth: "450px",
              }}
            >
              {medicalConsulty.diagnose}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:mt-0 md:mt-0 sm:mt-0 mt-4">
        <div>
          <div>
            <p className={clsx([isHover ? "text-white" : "text-slate-500"])}>
              Servicio de atención
            </p>
          </div>

          <div>
            <p
              className={clsx([
                "lg:text-md",
                isHover ? "text-white" : "text-slate-900",
              ])}
            >
              Consulta externa general
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
