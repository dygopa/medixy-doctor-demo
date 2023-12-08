import { Dispatch, SetStateAction, useState } from "react";
import CreateMedicalRecordsButton from "./CreateMedicalRecordsButton/CreateMedicalRecordsButton";
import RecordsFamily from "./RecordsFamily/RecordsFamily";
import RecordsNonPathological from "./RecordsNonPathological/RecordsNonPathological";
import RecordsPathological from "./RecordsPathological/RecordsPathological";

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

interface IRecordsForm {
  setShowRecordsForm: Dispatch<SetStateAction<boolean>>;
}

export default function RecordsForm({ setShowRecordsForm }: IRecordsForm) {
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

  return (
    <div>
      <div className="w-full flex justify-between items-center sticky top-[68px] py-4 z-[50] bg-white">
        <div className="flex items-center">
          <div className="mr-2">
            <button
              type="button"
              className="hover:bg-dark hover:bg-opacity-10 w-[35px] h-[35px] rounded-full"
              onClick={() => setShowRecordsForm(false)}
            >
              <i className="fa-solid fa-arrow-left text-xl" />
            </button>
          </div>

          <div>
            <p className="text-lg font-bold">Agregar antecedentes</p>
          </div>
        </div>

        <div>
          <CreateMedicalRecordsButton
            values={values}
            setShowRecordsForm={setShowRecordsForm}
          />
        </div>
      </div>

      <div>
        <form>
          <div className="py-4">
            <RecordsPathological values={values} setValues={setValues} />
          </div>

          <div className="py-4">
            <RecordsNonPathological values={values} setValues={setValues} />
          </div>

          <div className="py-4">
            <RecordsFamily values={values} setValues={setValues} />
          </div>
        </form>
      </div>
    </div>
  );
}
