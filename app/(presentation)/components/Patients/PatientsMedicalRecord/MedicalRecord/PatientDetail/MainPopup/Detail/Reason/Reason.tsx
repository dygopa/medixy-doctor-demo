import { useEffect, useState } from "react";

export default function Reason() {
  const [reason, setReason] = useState("");
  const [referrer, setReferrer] = useState("");

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setReason(valuesJSON.currentConsultation.consultationReason);
    setReferrer(valuesJSON.currentConsultation.referredBy);
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Mótivo de la consulta</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {reason} {referrer.length > 0 && `- Referido por ${referrer}`}
        </h1>
      </div>
    </div>
  );
}
