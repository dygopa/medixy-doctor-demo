import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const vitalSignsExpanded = params.get("vitalSignsExpanded");

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

  useEffect(() => {
    if (vitalSignsExpanded === "true") setShowBody(true);
  }, [vitalSignsExpanded]);

  useEffect(() => {
    if (!view || view === "vital-signs") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view]);

  return (
    <div
      className={clsx([
        "h-auto relative z-40 w-full",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <button
          type="button"
          onClick={() => {
            setShowBody(!showBody);
            router.push(`${pathname}?view=vital-signs`);
          }}
          className="w-full"
        >
          <div className="w-full flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-bold text-lg text-slate-900">Signos vítales</p>
            </div>

            <div>
              <Lucide
                icon={showBody ? "Minus" : "Plus"}
                color="#22345F"
                size={30}
              />
            </div>
          </div>
        </button>

        <form className={clsx([showBody ? "block" : "hidden"])}>
          <div className="py-4">
            <VitalSignsForm
              values={values}
              setValues={setValues}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
