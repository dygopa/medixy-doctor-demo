import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";
import { useContext } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "../context/MedicalRecordCreateSummaryContext";

export default function Navigator() {
  const { state } = useContext<IMedicalRecordCreateSummaryContext>(
    MedicalRecordCreateSummaryContext
  );
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;

  const getRedirectMedicalRecord = () => {
    if (appointment.data?.id) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointment.data.id +
        "?type=appointment"
      );
    }

    return MedicalRecordRoutesEnum.MedicalRecord + subject?.subjectId;
  };

  return (
    <>
      <div className="w-full">
        <div className="lg:flex items-center justify-between">
          <div>
            <div className="mb-2">
              <h2 className="font-bold text-2xl truncate">
                Resumen de la consulta médica
              </h2>
            </div>

            <div>
              <p className="text-slate-500 text-md">
                Resumen detallado de la consulta
              </p>
            </div>
          </div>

          <div className="lg:mt-0 mt-4 flex items-center">
            <div>
              <Link href={getRedirectMedicalRecord()}>
                <Button variant="primary">Ir al expediente médico</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
