import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

interface IPatientProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Patient({ medicalConsulty }: IPatientProps) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Paciente</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {medicalConsulty.subject.name} {medicalConsulty.subject.lastName}
        </h1>
      </div>
    </div>
  );
}
