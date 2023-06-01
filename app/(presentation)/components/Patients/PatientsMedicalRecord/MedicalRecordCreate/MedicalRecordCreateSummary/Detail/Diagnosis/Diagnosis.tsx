import { useEffect, useState } from "react";

export default function Diagnosis() {
  const [diagnosis, setDiagnosis] = useState("");

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
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
        <h3 className="text-slate-400 text-lg">Diagnóstico</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {diagnosis.length > 0 ? diagnosis : "Desconocido"}
        </h1>
      </div>
    </div>
  );
}
