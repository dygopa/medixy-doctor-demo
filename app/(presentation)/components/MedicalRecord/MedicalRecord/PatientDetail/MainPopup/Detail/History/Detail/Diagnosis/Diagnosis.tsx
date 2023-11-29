import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
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
            <div key={diagnose.id} className="mb-2 flex items-center">
              <div className="mr-2">
                <h1 className="text-slate-900 font-bold text-lg">
                  {diagnose.description}
                </h1>
              </div>

              {diagnose.isPrincipal && (
                <div>
                  <Lucide
                    icon="at"
                    className="text-2xl cursor-pointer text-yellow-500"
                    title="Principal"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="text-slate-900 font-bold text-lg">Desconocido</h1>
        )}
      </div>

      {medicalConsulty.observations &&
        medicalConsulty.observations.length > 0 && (
          <>
            <div className="mb-2">
              <h3 className="text-slate-400 text-lg">Observación</h3>
            </div>

            <div>
              <h1 className="text-slate-900 font-bold text-lg">Se le vio</h1>
            </div>
          </>
        )}
    </div>
  );
}
