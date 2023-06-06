import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RecordsFamily from "./RecordsFamily/RecordsFamily";
import RecordsNonPathological from "./RecordsNonPathological/RecordsNonPathological";
import RecordsPathological from "./RecordsPathological/RecordsPathological";
// import RecordsSpecialty from "./RecordsSpecialty/RecordsSpecialty";

export type valuesTypes = {
  allergiesPathological: {
    isChecked: boolean;
    values: string[];
  };
  surgicalInterventions: {
    isChecked: boolean;
    values: string[];
  };
  takeMedication: {
    isChecked: boolean;
    values: string[];
  };
  transfusions: {
    isChecked: boolean;
    value: string;
  };
  anemia: {
    isChecked: boolean;
    value: string;
  };
  arthritis: {
    isChecked: boolean;
    value: string;
  };
  asma: {
    isChecked: boolean;
    value: string;
  };
  cancer: {
    isChecked: boolean;
    value: string;
  };
  bloodClots: {
    isChecked: boolean;
    value: string;
  };
  colitis: {
    isChecked: boolean;
    value: string;
  };
  bloodTypeNonPathological: {
    isChecked: boolean;
    values: string[];
  };
  smokingNonPathological: {
    isChecked: boolean;
    value: string;
  };
  alcoholicBeveragesNonPathological: {
    isChecked: boolean;
    value: string;
  };
  drugsNonPathological: {
    isChecked: boolean;
    value: string;
  };
  exerciseNonPathological: {
    isChecked: boolean;
    value: string;
  };
  covidNonPathological: {
    isChecked: boolean;
    value: string;
  };
  diabetesFamily: {
    isChecked: boolean;
    values: string[];
  };
  cancerFamily: {
    isChecked: boolean;
    values: string[];
  };
  hypertensionFamily: {
    isChecked: boolean;
    values: string[];
  };
  sidaFamily: {
    isChecked: boolean;
    values: string[];
  };
  otherFamily: {
    isChecked: boolean;
    values: string[];
  };
};

export default function Records() {
  const [values, setValues] = useState<valuesTypes>({
    allergiesPathological: {
      isChecked: false,
      values: [],
    },
    surgicalInterventions: {
      isChecked: false,
      values: [],
    },
    takeMedication: {
      isChecked: false,
      values: [],
    },
    transfusions: {
      isChecked: false,
      value: "",
    },
    anemia: {
      isChecked: false,
      value: "",
    },
    arthritis: {
      isChecked: false,
      value: "",
    },
    asma: {
      isChecked: false,
      value: "",
    },
    cancer: {
      isChecked: false,
      value: "",
    },
    bloodClots: {
      isChecked: false,
      value: "",
    },
    colitis: {
      isChecked: false,
      value: "",
    },
    bloodTypeNonPathological: {
      isChecked: false,
      values: [],
    },
    smokingNonPathological: {
      isChecked: false,
      value: "",
    },
    alcoholicBeveragesNonPathological: {
      isChecked: false,
      value: "",
    },
    drugsNonPathological: {
      isChecked: false,
      value: "",
    },
    exerciseNonPathological: {
      isChecked: false,
      value: "",
    },
    covidNonPathological: {
      isChecked: false,
      value: "",
    },
    diabetesFamily: {
      isChecked: false,
      values: [],
    },
    cancerFamily: {
      isChecked: false,
      values: [],
    },
    hypertensionFamily: {
      isChecked: false,
      values: [],
    },
    sidaFamily: {
      isChecked: false,
      values: [],
    },
    otherFamily: {
      isChecked: false,
      values: [],
    },
  });

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");

  const [showBody, setShowBody] = useState(false);

  const [initialRender, setInitialRender] = useState(true);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let records = valuesJSON.records;
    records = values;

    valuesJSON.records = records;

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

    setValues(valuesJSON.records);
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
    if (view === "records") {
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
            router.push(`${pathname}?view=records`);
          }}
          className="w-full"
        >
          <div className="w-full flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-bold text-lg text-slate-900">Antecedentes</p>
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
            <RecordsPathological values={values} setValues={setValues} />
          </div>

          <div className="py-4">
            <RecordsNonPathological values={values} setValues={setValues} />
          </div>

          <div className="py-4">
            <RecordsFamily values={values} setValues={setValues} />
          </div>

          {/* <div className="py-4">
            <RecordsSpecialty values={values} setValues={setValues} />
    </div> */}
        </form>
      </div>
    </div>
  );
}
