import { useEffect, useState } from "react";

export default function Physical() {
  const [physical, setPhysical] = useState("");

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setPhysical(valuesJSON.currentConsultation.generalInspection);
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  if (physical.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Examen físico</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">{physical}</h1>
      </div>
    </div>
  );
}
