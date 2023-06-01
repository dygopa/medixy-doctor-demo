import { useEffect, useState } from "react";

export default function Title() {
  const [consultationDate, setConsultationDate] = useState<Date | null>(null);

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    const parts =
      valuesJSON.currentConsultation.consultationDate.match(/(\d+)/g);

    setConsultationDate(new Date(parts[0], parts[1] - 1, parts[2]));
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  return (
    <div className="lg:flex md:flex items-center justify-between py-3">
      <div>
        <h1 className="text-slate-900 text-2xl font-bold">
          Resumen de la consulta
        </h1>
      </div>

      {consultationDate && (
        <div>
          <h1 className="text-slate-400 text-lg">
            {consultationDate.getDate()}/{consultationDate.getMonth() + 1}/
            {consultationDate.getFullYear()}
          </h1>
        </div>
      )}
    </div>
  );
}
