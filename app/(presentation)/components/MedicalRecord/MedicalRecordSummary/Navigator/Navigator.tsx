import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";
import { useContext } from "react";
import {
  IMedicalRecordSummaryContext,
  MedicalRecordSummaryContext,
} from "../context/MedicalRecordSummaryContext";

export default function Navigator() {
  const { state } = useContext<IMedicalRecordSummaryContext>(
    MedicalRecordSummaryContext
  );
  const { data: medicalConsulty } = state.getMedicalConsultyById;

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
              <Link
                href={
                  MedicalRecordRoutesEnum.MedicalRecord +
                  medicalConsulty.subjectId
                }
              >
                <Button variant="primary">Ir al expediente médico</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
