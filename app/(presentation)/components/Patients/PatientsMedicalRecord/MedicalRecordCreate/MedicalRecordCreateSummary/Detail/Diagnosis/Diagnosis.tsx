import { ICIE10 } from "domain/core/entities/cie10Entity";
import { useEffect, useState } from "react";

export default function Diagnosis() {
  const [diagnosis, setDiagnosis] = useState<ICIE10[]>([]);

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setDiagnosis(valuesJSON.currentConsultation.diagnose);
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Diagnósticos</h3>
      </div>

      <div>
        {diagnosis.length > 0 ? (
          diagnosis.map((diagnose: ICIE10) => (
            <div key={diagnose.id} className="mb-2">
              <h1 className="text-slate-900 font-bold text-lg">
                {diagnose.code4} - {diagnose.description4}
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
