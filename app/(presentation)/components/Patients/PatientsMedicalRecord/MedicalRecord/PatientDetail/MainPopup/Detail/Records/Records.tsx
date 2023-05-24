import { useEffect, useState } from "react";

export type valuesTypes = {
  allergiesPathological: {
    isChecked: boolean;
    values: string[];
  };
  surgicalInterventions: {
    isChecked: boolean;
    value: string;
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
    value: string;
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
    value: string;
  };
  cancerFamily: {
    isChecked: boolean;
    value: string;
  };
  hypertensionFamily: {
    isChecked: boolean;
    value: string;
  };
  sidaFamily: {
    isChecked: boolean;
    value: string;
  };
  otherFamily: {
    isChecked: boolean;
    value: string;
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
      value: "",
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
      value: "",
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
      value: "",
    },
    cancerFamily: {
      isChecked: false,
      value: "",
    },
    hypertensionFamily: {
      isChecked: false,
      value: "",
    },
    sidaFamily: {
      isChecked: false,
      value: "",
    },
    otherFamily: {
      isChecked: false,
      value: "",
    },
  });

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "noodus.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

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
            Alergias{values.allergiesPathological.values.length > 0 ? "," : ""}
            {values.allergiesPathological.values.map((alergy, i) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-2">
                {alergy}
              </p>
            ))}
          </h1>
        </div>
      )}

      {values.surgicalInterventions.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Intervenciones quirúrgicas
            {values.surgicalInterventions.value.length > 0
              ? `, ${values.surgicalInterventions.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.takeMedication.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Medicamentos que consume
            {values.takeMedication.values.length > 0 ? "," : ""}
            {values.takeMedication.values.map((medication, i) => (
              <p key={i} className="text-slate-900 font-bold text-lg ml-2">
                {medication}
              </p>
            ))}
          </h1>
        </div>
      )}

      {values.anemia.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Anemia
            {values.anemia.value.length > 0 ? `, ${values.anemia.value}` : ""}
          </h1>
        </div>
      )}

      {values.arthritis.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Artritis
            {values.arthritis.value.length > 0
              ? `, ${values.arthritis.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.asma.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Asma
            {values.asma.value.length > 0 ? `, ${values.asma.value}` : ""}
          </h1>
        </div>
      )}

      {values.cancer.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Cáncer
            {values.cancer.value.length > 0 ? `, ${values.cancer.value}` : ""}
          </h1>
        </div>
      )}

      {values.bloodClots.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Coágulos sanguíneos
            {values.bloodClots.value.length > 0
              ? `, ${values.bloodClots.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.colitis.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Colitis
            {values.colitis.value.length > 0 ? `, ${values.colitis.value}` : ""}
          </h1>
        </div>
      )}

      {values.bloodTypeNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Grupo sanguíneo y RH
            {values.bloodTypeNonPathological.value.length > 0
              ? `, ${values.bloodTypeNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.smokingNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Tabaquismo
            {values.smokingNonPathological.value.length > 0
              ? `, ${values.smokingNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.drugsNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Drogas
            {values.drugsNonPathological.value.length > 0
              ? `, ${values.drugsNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.exerciseNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Realiza ejercicio
            {values.exerciseNonPathological.value.length > 0
              ? `, ${values.exerciseNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.covidNonPathological.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            COVID
            {values.covidNonPathological.value.length > 0
              ? `, ${values.covidNonPathological.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.diabetesFamily.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Diabetes
            {values.diabetesFamily.value.length > 0
              ? `, ${values.diabetesFamily.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.cancerFamily.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Cáncer
            {values.cancerFamily.value.length > 0
              ? `, ${values.cancerFamily.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.hypertensionFamily.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Hipertensión
            {values.hypertensionFamily.value.length > 0
              ? `, ${values.hypertensionFamily.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.sidaFamily.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Sida
            {values.sidaFamily.value.length > 0
              ? `, ${values.sidaFamily.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.otherFamily.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Otras
            {values.otherFamily.value.length > 0
              ? `, ${values.otherFamily.value}`
              : ""}
          </h1>
        </div>
      )}
    </div>
  );
}
