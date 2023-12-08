import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { useEffect, useState } from "react";
import VitalSignsForm from "./VitalSignsForm/VitalSignForm";

type valuesTypes = {
  size: string;
  weight: string;
  temperature: string;
  respiratoryFrequency: string;
  oximetry: string;
  muscleMass: string;
  glicemy: string;
};

export default function VitalSigns() {
  const [values, setValues] = useState<valuesTypes>({
    size: "",
    weight: "",
    temperature: "",
    respiratoryFrequency: "",
    oximetry: "",
    muscleMass: "",
    glicemy: "",
  });

  const [errors, setErrors] = useState({
    size: "",
    weight: "",
    temperature: "",
    respiratoryFrequency: "",
    oximetry: "",
    muscleMass: "",
    glicemy: "",
  });

  const [showBody, setShowBody] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let vitalSigns = valuesJSON.vitalSigns;
    vitalSigns = values;

    valuesJSON.vitalSigns = vitalSigns;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setValues(valuesJSON.vitalSigns);
  };

  useEffect(() => {
    if (!initialRender) saveValuesInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    setValuesFromLocalStorage();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowBody(!showBody)}
        className="w-full flex justify-between items-center border-b mb-5 pb-2"
      >
        <div>
          <p className="font-bold text-lg text-slate-900">Signos vítales</p>
        </div>

        <div>
          <Lucide
            icon={showBody ? "minus" : "plus"}
            color="#22345F"
            size={30}
          />
        </div>
      </button>

      <div className={clsx([showBody ? "block" : "hidden"])}>
        <VitalSignsForm
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}
