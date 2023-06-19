import { useEffect, useState } from "react";
import CurrentConsultation from "./CurrentConsultation/CurrentConsultation";
import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Recipe from "./Recipe/Recipe";
import Records from "./Records/Records";
import VitalSigns from "./VitalSigns/VitalSigns";

interface IRightSideProps {
  width: number;
}

export default function RightSide({ width }: IRightSideProps) {
  const [isLoading, setIsLoading] = useState(true);

  const setValuesLocalStorage = () => {
    setIsLoading(true);

    let values: any = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    values = JSON.parse(values);

    if (
      !values ||
      typeof values?.currentConsultation?.diagnose === "string" ||
      typeof values?.vitalSigns === "undefined" ||
      typeof values?.physical === "undefined"
    ) {
      const valuesFormulary = {
        currentConsultation: {
          consultationDate: "",
          referredBy: "",
          consultationReason: "",
          sufferingDate: "",
          diagnose: [],
          observations: "",
        },
        physical: {
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
        },
        vitalSigns: {
          size: "",
          weight: "",
          temperature: "",
          respiratoryFrequency: "",
          oximetry: "",
          muscleMass: "",
          glicemy: "",
        },
        records: {
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
        },
        orders: [],
        recipes: [],
        isValid: false,
      };

      localStorage.setItem(
        "prosit.storage.medical-record-create",
        JSON.stringify(valuesFormulary)
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setValuesLocalStorage();
  }, []);

  if (isLoading) return <div />;

  return (
    <div className="w-full">
      <div className="w-full mb-8">
        <VitalSigns />
      </div>

      <div className="w-full mb-8">
        <Records />
      </div>

      <div className="w-full mb-8">
        <CurrentConsultation width={width} />
      </div>

      <div className="w-full mb-8">
        <Diagnosis />
      </div>

      <div className="w-full mb-8">
        <Orders />
      </div>

      <div className="w-full mb-8">
        <Recipe />
      </div>
    </div>
  );
}
