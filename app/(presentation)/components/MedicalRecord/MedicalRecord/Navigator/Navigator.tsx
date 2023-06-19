import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";
import { useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../context/MedicalRecordContext";

export default function Navigator() {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: subject } = state.subject;

  return (
    <div className="w-full">
      <div className="lg:flex items-center justify-between">
        <div>
          <div className="mb-2">
            <h2 className="font-bold text-2xl truncate">
              Resumen del expediente
            </h2>
          </div>

          <div>
            <p className="text-slate-500 text-md">
              Información detallada del expediente del paciente
            </p>
          </div>
        </div>

        <div className="lg:mt-0 mt-4">
          <Link
            href={
              MedicalRecordRoutesEnum.MedicalRecord +
              subject?.subjectId +
              MedicalRecordRoutesEnum.MedicalRecordCreate
            }
          >
            <Button variant="primary">Nueva consulta</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
