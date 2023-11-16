import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DiagnosisDetail from "./DiagnosisDetail/DiagnosisDetail";

type valuesTypes = {
  diagnose: ICIE10[];
  observations: string;
};

export default function Diagnosis() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const type = params.get("type");
  const diagnose = params.get("diagnose");

  const diagnosisExpanded = params.get("diagnose");

  const [values, setValues] = useState<valuesTypes>({
    diagnose: [],
    observations: "",
  });
  const [diagnoseError, setDiagnoseError] = useState(false);

  const [initialRender, setInitialRender] = useState(true);
  const [showBody, setShowBody] = useState(false);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let diagnose = valuesJSON.currentConsultation.diagnose;
    diagnose = values;

    valuesJSON.currentConsultation.diagnose = diagnose.diagnose;

    valuesJSON.currentConsultation.observations = diagnose.observations;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  useEffect(() => {
    if (!initialRender) saveValuesInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setValues({
      ...values,
      diagnose: valuesJSON.currentConsultation.diagnose,
      observations: valuesJSON.currentConsultation.observations,
    });
  };

  useEffect(() => {
    if (!initialRender) saveValuesInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    setValuesFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (diagnose === "true") {
      setDiagnoseError(true);
    }
  }, [diagnose]);

  useEffect(() => {
    if (view === "diagnosis" || diagnosisExpanded === "true") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view, diagnosisExpanded]);

  return (
    <div
      className={clsx([
        "h-auto relative z-40 w-full",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <button type="button" className="w-full">
          <div className="w-full flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-bold text-lg text-slate-900">Diagnóstico</p>
            </div>
          </div>
        </button>

        <form>
          <div className="py-4">
            <DiagnosisDetail
              values={values}
              setValues={setValues}
              diagnoseError={diagnoseError}
              setDiagnoseError={setDiagnoseError}
            />
          </div>
        </form>

        <div className="w-full flex justify-end">
          <div className="mr-2">
            <Button
              variant="outline-primary"
              className="h-[43px]"
              onClick={() => {
                router.replace(
                  `${pathname}?view=current-consultation&type=${
                    type ?? "medical-record"
                  }`
                );
              }}
            >
              Volver
            </Button>
          </div>

          <div>
            <Button
              variant="primary"
              onClick={() => {
                if (values.diagnose.length === 0) {
                  setDiagnoseError(true);
                  return;
                }

                router.replace(
                  `${pathname}?view=orders&type=${type ?? "medical-record"}`
                );
              }}
            >
              <div className="flex items-center">
                <div className="mr-2">Ordenes</div>

                <div>
                  <Lucide icon="ArrowRight" color="#fff" size={25} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
