import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

interface IPhysicalProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Physical({ medicalConsulty }: IPhysicalProps) {
  if (
    !medicalConsulty.generalInspection ||
    medicalConsulty.generalInspection?.length === 0
  )
    return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Examen físico</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {medicalConsulty.generalInspection}
        </h1>
      </div>
    </div>
  );
}
