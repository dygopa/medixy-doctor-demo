import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

interface IReasonProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Reason({ medicalConsulty }: IReasonProps) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Mótivo de la consulta</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {medicalConsulty.consultationReason}{" "}
          {medicalConsulty.referrerBy &&
            medicalConsulty.referrerBy.length > 0 &&
            `- Referido por ${medicalConsulty.referrerBy}`}
        </h1>
      </div>
    </div>
  );
}
