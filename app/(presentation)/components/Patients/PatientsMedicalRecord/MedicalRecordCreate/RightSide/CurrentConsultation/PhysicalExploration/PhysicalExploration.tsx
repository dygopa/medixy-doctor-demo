import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PhysicalExplorationForm from "./PhysicalExplorationForm/PhysicalExplorationForm";

type valuesTypes = {
  abnormalAppearance: {
    isChecked: boolean;
    value: string;
  };
  disnea: {
    isChecked: boolean;
    value: string;
  };
  deformity: {
    isChecked: boolean;
    value: string;
  };
  amputation: {
    isChecked: boolean;
    value: string;
  };
  paralysis: {
    isChecked: boolean;
    value: string;
  };
  abnormalMovements: {
    isChecked: boolean;
    value: string;
  };
  normalGait: {
    isChecked: boolean;
    value: string;
  };
  mentalDisorder: {
    isChecked: boolean;
    value: string;
  };
  abnormality: {
    isChecked: boolean;
    value: string;
    values: {
      anatomicalStateEyes: {
        isChecked: boolean;
        value: string;
      };
      eyeVision: {
        isChecked: boolean;
        value: string;
      };
      hearingEars: {
        isChecked: boolean;
        value: string;
      };
      buccalPharynx: {
        isChecked: boolean;
        value: string;
      };
      neck: {
        isChecked: boolean;
        value: string;
      };
      chest: {
        isChecked: boolean;
        value: string;
      };
      spine: {
        isChecked: boolean;
        value: string;
      };
      abdomen: {
        isChecked: boolean;
        value: string;
      };
      extremities: {
        isChecked: boolean;
        value: string;
      };
    };
  };
  smokingPhysical: {
    isChecked: boolean;
    value: string;
  };
};

export default function PhysicalExploration() {
  const [values, setValues] = useState<valuesTypes>({
    abnormalAppearance: {
      isChecked: false,
      value: "",
    },
    disnea: {
      isChecked: false,
      value: "",
    },
    deformity: {
      isChecked: false,
      value: "",
    },
    amputation: {
      isChecked: false,
      value: "",
    },
    paralysis: {
      isChecked: false,
      value: "",
    },
    abnormalMovements: {
      isChecked: false,
      value: "",
    },
    normalGait: {
      isChecked: false,
      value: "",
    },
    mentalDisorder: {
      isChecked: false,
      value: "",
    },
    abnormality: {
      isChecked: false,
      value: "",
      values: {
        anatomicalStateEyes: {
          isChecked: false,
          value: "",
        },
        eyeVision: {
          isChecked: false,
          value: "",
        },
        hearingEars: {
          isChecked: false,
          value: "",
        },
        buccalPharynx: {
          isChecked: false,
          value: "",
        },
        neck: {
          isChecked: false,
          value: "",
        },
        chest: {
          isChecked: false,
          value: "",
        },
        spine: {
          isChecked: false,
          value: "",
        },
        abdomen: {
          isChecked: false,
          value: "",
        },
        extremities: {
          isChecked: false,
          value: "",
        },
      },
    },
    smokingPhysical: {
      isChecked: false,
      value: "",
    },
  });

  const [errors, setErrors] = useState({
    consultationDate: "",
    consultationReason: "",
  });

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const physicalExpanded = params.get("physicalExpanded");

  const [showBody, setShowBody] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let physical = valuesJSON.physical;
    physical = values;

    valuesJSON.physical = physical;

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

    setValues(valuesJSON.physical);
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
    if (physicalExpanded === "true") setShowBody(true);
  }, [physicalExpanded]);

  useEffect(() => {
    if (view === "physical") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowBody(!showBody)}
        className="w-full flex justify-between items-center border-b mb-5 pb-2"
      >
        <div>
          <p className="font-bold text-lg text-slate-900">Exploración física</p>
        </div>

        <div>
          <Lucide
            icon={showBody ? "Minus" : "Plus"}
            color="#22345F"
            size={30}
          />
        </div>
      </button>

      <div className={clsx([showBody ? "block" : "hidden"])}>
        <PhysicalExplorationForm values={values} setValues={setValues} />
      </div>
    </div>
  );
}
