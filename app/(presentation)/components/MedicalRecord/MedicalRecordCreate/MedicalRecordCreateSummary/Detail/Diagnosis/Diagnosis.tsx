import { IDiagnosis } from "domain/core/entities/diagnosis";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

interface IDiagnosisProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Diagnosis({ medicalConsulty }: IDiagnosisProps) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Diagnósticos</h3>
      </div>

      <div>
        {medicalConsulty.diagnose && medicalConsulty.diagnose.length > 0 ? (
          medicalConsulty.diagnose.map((diagnose: IDiagnosis) => (
            <div key={diagnose.id} className="mb-2">
              <h1 className="text-slate-900 font-bold text-lg">
                {diagnose.description}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-slate-900 font-bold text-lg">Desconocido</h1>
        )}
      </div>
    </div>
  );
}
