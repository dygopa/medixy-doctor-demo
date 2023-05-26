import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BasicDetails from "./BasicDetails/BasicDetails";
import Diagnosis from "./Diagnosis/Diagnosis";
import PhysicalExploration from "./PhysicalExploration/PhysicalExploration";
import VitalSigns from "./VitalSigns/VitalSigns";

interface ICurrentConsultationProps {
  width: number;
}

export default function CurrentConsultation({
  width,
}: ICurrentConsultationProps) {
  const [values, setValues] = useState({
    consultationDate: "",
    referredBy: "",
    consultationReason: "",
    sufferingDate: "",
    generalInspection: "",
    respiratorySystem: "",
    digestiveSystem: "",
    cardiovascularSystem: "",
    reproductiveSystem: "",
    urinarySystem: "",
    ophthalmologicalSystem: "",
    locomotorSystem: "",
    earInspection: "",
    neurologicalInspection: "",
    skinInspection: "",
    size: "",
    weight: "",
    temperature: "",
    respiratoryFrequency: "",
    oximetry: "",
    muscleMass: "",
    glicemy: "",
    diagnose: "",
    observations: "",
  });

  const [errors, setErrors] = useState({
    consultationDate: "",
    consultationReason: "",
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
  const currentConsultationExpanded = params.get("currentConsultationExpanded");

  const [showBody, setShowBody] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let currentConsultation = valuesJSON.currentConsultation;
    currentConsultation = values;

    valuesJSON.currentConsultation = currentConsultation;

    localStorage.setItem(
      "noodus.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    valuesJSON.currentConsultation.consultationDate =
      valuesJSON.currentConsultation.consultationDate?.length === 0
        ? `${new Date().getFullYear()}-${
            new Date().getMonth() + 1 < 10
              ? `0${new Date().getMonth() + 1}`
              : new Date().getMonth() + 1
          }-${new Date().getDate()}`
        : valuesJSON.currentConsultation.consultationDate;

    setValues(valuesJSON.currentConsultation);
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
    if (currentConsultationExpanded === "true") setShowBody(true);
  }, [currentConsultationExpanded]);

  useEffect(() => {
    if (!view || view === "current-consultation") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view]);

  return (
    <div
      className={clsx([
        "h-auto relative z-40",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <button
          type="button"
          onClick={() => {
            setShowBody(!showBody);
            router.push(`${pathname}?view=current-consultation`);
          }}
          className="w-full"
        >
          <div className="w-full flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-bold text-lg text-slate-900">
                Consulta actual
              </p>
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
            <BasicDetails
              values={values}
              setValues={setValues}
              errors={errors}
              setErrors={setErrors}
            />
          </div>

          <div className="py-4">
            <PhysicalExploration
              values={values}
              setValues={setValues}
              width={width}
            />
          </div>

          <div className="py-4">
            <VitalSigns
              values={values}
              setValues={setValues}
              errors={errors}
              setErrors={setErrors}
            />
          </div>

          <div className="py-4">
            <Diagnosis values={values} setValues={setValues} />
          </div>
        </form>
      </div>
    </div>
  );
}
