import { useEffect, useState } from "react";

export default function Title() {
  const [consultationDate, setConsultationDate] = useState<Date | null>(null);

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setConsultationDate(
      new Date(valuesJSON.currentConsultation.consultationDate)
    );
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <h1 className="text-slate-900 text-2xl font-bold">
          Resumen de la consulta
        </h1>
      </div>

      {consultationDate && (
        <div>
          <h1 className="text-slate-400 text-lg">
            {consultationDate.getDate() + 1}/{consultationDate.getMonth() + 1}/
            {consultationDate.getFullYear()}
          </h1>
        </div>
      )}
    </div>
  );
}
