import { useEffect, useState } from "react";

export default function VitalSigns() {
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [respiratoryFrequency, setRespiratoryFrequency] = useState("");

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setWeight(valuesJSON.currentConsultation.weight);
    setTemperature(valuesJSON.currentConsultation.temperature);
    setRespiratoryFrequency(
      valuesJSON.currentConsultation.respiratoryFrequency
    );
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  if (
    weight.length === 0 &&
    temperature.length === 0 &&
    respiratoryFrequency.length === 0
  )
    return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Signos vitales</h3>
      </div>

      {weight.length > 0 && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg">
            Peso: {weight} kg
          </h1>
        </div>
      )}

      {temperature.length > 0 && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg">
            Temperatura: {temperature}°
          </h1>
        </div>
      )}

      {respiratoryFrequency.length > 0 && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg">
            Frecuencia respiratoria: {respiratoryFrequency}
          </h1>
        </div>
      )}
    </div>
  );
}
