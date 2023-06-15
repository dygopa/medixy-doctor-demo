import { useEffect, useState } from "react";
import AbnormalityDetail from "./AbnormalityDetail/AbnormalityDetail";

export type valuesTypes = {
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
  smokingPhysical: {
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
};

export default function Physical() {
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
    smokingPhysical: {
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
  });

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setValues(valuesJSON.physical);
  };

  useEffect(() => {
    setValuesFromLocalStorage();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Examen físico</h3>
      </div>

      {values.abnormalAppearance.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Anormalidad en su aspecto:
            {values.abnormalAppearance.value.length > 0
              ? ` ${values.abnormalAppearance.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.disnea.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Disnea:
            {values.disnea.value.length > 0 ? ` ${values.disnea.value}` : ""}
          </h1>
        </div>
      )}

      {values.deformity.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Deformidad:
            {values.deformity.value.length > 0
              ? ` ${values.deformity.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.amputation.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Falta de algún miembro o parte de él:
            {values.amputation.value.length > 0
              ? ` ${values.amputation.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.paralysis.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Parálisis o paresias:
            {values.paralysis.value.length > 0
              ? ` ${values.paralysis.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormalMovements.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Movimientos anormales:
            {values.abnormalMovements.value.length > 0
              ? ` ${values.abnormalMovements.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.normalGait.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Marcha anormal:
            {values.normalGait.value.length > 0
              ? ` ${values.normalGait.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.mentalDisorder.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Transtorno psíquico:
            {values.mentalDisorder.value.length > 0
              ? ` ${values.mentalDisorder.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.smokingPhysical.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            Dato que aliente a fumar:
            {values.smokingPhysical.value.length > 0
              ? ` ${values.smokingPhysical.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.isChecked && (
        <>
          <div>
            <h1 className="text-slate-900 font-bold text-lg flex">
              Anormalidades:
              {values.abnormality.value.length > 0
                ? ` ${values.abnormality.value}`
                : ""}
            </h1>
          </div>

          <div className="flex items-center">
            <div className="w-[155px]" />

            <div>
              <AbnormalityDetail values={values} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
