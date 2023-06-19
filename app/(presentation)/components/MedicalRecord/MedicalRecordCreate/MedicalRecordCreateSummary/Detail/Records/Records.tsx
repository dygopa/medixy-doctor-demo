import { useEffect, useState } from "react";

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

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setValues(valuesJSON.records);
  };

  useEffect(() => {
    setValuesFromLocalStorage();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Antecedentes</h3>
      </div>

      {values.allergiesPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Alergias -{" "}
            {values.allergiesPathological.values.map((alergy, i) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {alergy}
              </p>
            ))}
          </h1>
        </div>
      )}

      {values.surgicalInterventions.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">
            Intervenciones quirúrgicas -
          </h1>

          {values.surgicalInterventions.values.length > 0 &&
            values.surgicalInterventions.values.map(
              (value: string, i: number) => (
                <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                  {value}
                </p>
              )
            )}
        </div>
      )}

      {values.takeMedication.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Medicamentos que consume -
            {values.takeMedication.values.map((medication, i) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {medication}
              </p>
            ))}
          </h1>
        </div>
      )}

      {values.transfusions.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Transfusiones
            {values.transfusions.value.length > 0
              ? ` - ${values.transfusions.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.anemia.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Anemia
            {values.anemia.value.length > 0 ? ` - ${values.anemia.value}` : ""}
          </h1>
        </div>
      )}

      {values.arthritis.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Artritis
            {values.arthritis.value.length > 0
              ? ` - ${values.arthritis.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.asma.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Asma
            {values.asma.value.length > 0 ? ` - ${values.asma.value}` : ""}
          </h1>
        </div>
      )}

      {values.cancer.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Cáncer
            {values.cancer.value.length > 0 ? ` - ${values.cancer.value}` : ""}
          </h1>
        </div>
      )}

      {values.bloodClots.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Coágulos sanguíneos
            {values.bloodClots.value.length > 0
              ? ` - ${values.bloodClots.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.colitis.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Colitis
            {values.colitis.value.length > 0
              ? ` - ${values.colitis.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.bloodTypeNonPathological.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">
            Grupo sanguineo y RH -
          </h1>

          {values.bloodTypeNonPathological.values.length > 0 &&
            values.bloodTypeNonPathological.values.map(
              (value: string, i: number) => (
                <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                  {value}
                </p>
              )
            )}
        </div>
      )}

      {values.smokingNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Tabaquismo
            {values.smokingNonPathological.value.length > 0
              ? ` - ${values.smokingNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.drugsNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Drogas
            {values.drugsNonPathological.value.length > 0
              ? ` - ${values.drugsNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.exerciseNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Realiza ejercicio
            {values.exerciseNonPathological.value.length > 0
              ? ` - ${values.exerciseNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.covidNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            COVID
            {values.covidNonPathological.value.length > 0
              ? ` - ${values.covidNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.diabetesFamily.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">
            Diabéticos en la familia -
          </h1>

          {values.diabetesFamily.values.length > 0 &&
            values.diabetesFamily.values.map((value: string, i: number) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {value}
              </p>
            ))}
        </div>
      )}

      {values.cancerFamily.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">
            Cáncer en la familia -
          </h1>

          {values.cancerFamily.values.length > 0 &&
            values.cancerFamily.values.map((value: string, i: number) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {value}
              </p>
            ))}
        </div>
      )}

      {values.hypertensionFamily.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">
            Hipertensión en la familia -
          </h1>

          {values.hypertensionFamily.values.length > 0 &&
            values.hypertensionFamily.values.map((value: string, i: number) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {value}
              </p>
            ))}
        </div>
      )}

      {values.sidaFamily.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">
            SIDA en la familia -
          </h1>

          {values.sidaFamily.values.length > 0 &&
            values.sidaFamily.values.map((value: string, i: number) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {value}
              </p>
            ))}
        </div>
      )}

      {values.otherFamily.isChecked && (
        <div className="flex">
          <h1 className="text-slate-900 font-bold text-lg flex">Otras -</h1>

          {values.otherFamily.values.length > 0 &&
            values.otherFamily.values.map((value: string, i: number) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-1">
                {value}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
