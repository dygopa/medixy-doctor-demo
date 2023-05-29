import { get12HoursFormat } from "(presentation)/(helper)/dates/datesHelper";
import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import Table from "(presentation)/components/core/BaseComponents/Table";
import clsx from "clsx";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { useState } from "react";

interface IMedicalConsultyProps {
  medicalConsulty: IMedicalConsulty;
}

export default function MedicalConsulty({
  medicalConsulty,
}: IMedicalConsultyProps) {
  const { setIsOpen } = useMedicalRecord();

  const [isHover, setIsHover] = useState(false);

  return (
    <Table.Tr
      key={medicalConsulty.id}
      className="intro-x cursor-pointer bg-white hover:bg-primary shadow-md"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setIsOpen(true)}
    >
      <Table.Td className="first:rounded-l-md last:rounded-r-md border-b-0 dark:bg-darkmode-600 py-5">
        <div>
          <div className="mb-2">
            <p
              className={clsx([
                " lg:text-lg",
                isHover ? "text-white" : "text-slate-900",
              ])}
            >
              {new Date(medicalConsulty.consultationDate).getDate()}/
              {new Date(medicalConsulty.consultationDate).getMonth()}/
              {new Date(medicalConsulty.consultationDate).getFullYear()}
            </p>
          </div>

          {/* <div>
            <p
              className={clsx([
                "lg:text-base",
                isHover ? "text-white" : "text-slate-500",
              ])}
            >
              {get12HoursFormat(new Date(medicalConsulty.consultationDate))}
            </p>
            </div> */}
        </div>
      </Table.Td>

      <Table.Td className="first:rounded-l-md last:rounded-r-md  border-b-0 dark:bg-darkmode-600 py-5">
        <div>
          <div>
            <p
              className={clsx([
                "lg:text-base",
                isHover ? "text-white" : "text-slate-500",
              ])}
            >
              Diagnóstico
            </p>
          </div>

          <div>
            <p
              className={clsx([
                "lg:text-lg",
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
      </Table.Td>

      <Table.Td className="first:rounded-l-md last:rounded-r-md  border-b-0 dark:bg-darkmode-600 py-5">
        <div>
          <div>
            <p
              className={clsx([
                "lg:text-base",
                isHover ? "text-white" : "text-slate-500",
              ])}
            >
              Servicio de atención
            </p>
          </div>

          <div>
            <p
              className={clsx([
                "lg:text-lg",
                isHover ? "text-white" : "text-slate-900",
              ])}
            >
              Consulta externa general
            </p>
          </div>
        </div>
      </Table.Td>
    </Table.Tr>
  );
}
