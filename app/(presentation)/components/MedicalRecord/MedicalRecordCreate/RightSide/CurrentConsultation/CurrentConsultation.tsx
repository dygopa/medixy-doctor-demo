import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BasicDetails from "./BasicDetails/BasicDetails";
import PhysicalExploration from "./PhysicalExploration/PhysicalExploration";

interface ICurrentConsultationProps {
  width: number;
}

type valuesTypes = {
  consultationDate: string;
  referredBy: string;
  consultationReason: string;
  sufferingDate: string;
};

export default function CurrentConsultation({
  width,
}: ICurrentConsultationProps) {
  const [values, setValues] = useState<valuesTypes>({
    consultationDate: "",
    referredBy: "",
    consultationReason: "",
    sufferingDate: "",
  });

  const [errors, setErrors] = useState({
    consultationDate: "",
    consultationReason: "",
  });

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const type = params.get("type");
  const currentConsultationExpanded = params.get("currentConsultationExpanded");

  const [showBody, setShowBody] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let currentConsultation = valuesJSON.currentConsultation;
    currentConsultation = values;

    valuesJSON.currentConsultation = currentConsultation;

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

    valuesJSON.currentConsultation.consultationDate =
      valuesJSON.currentConsultation.consultationDate?.length === 0
        ? `${new Date().getFullYear()}-${
            new Date().getMonth() + 1 < 10
              ? `0${new Date().getMonth() + 1}`
              : new Date().getMonth()
          }-${
            new Date().getDate() < 10
              ? `0${new Date().getDate()}`
              : new Date().getDate()
          }`
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
    if (
      view === "current-consultation" ||
      currentConsultationExpanded === "true"
    ) {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view, currentConsultationExpanded]);

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
            router.push(
              `${pathname}?view=current-consultation&type=${
                type ?? "medical-record"
              }`
            );
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
            <PhysicalExploration />
          </div>
        </form>
      </div>
    </div>
  );
}
