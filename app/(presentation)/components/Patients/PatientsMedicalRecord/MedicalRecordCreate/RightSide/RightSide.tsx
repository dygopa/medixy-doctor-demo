import { useEffect, useState } from "react";
import CurrentConsultation from "./CurrentConsultation/CurrentConsultation";
import Orders from "./Orders/Orders";
import Recipe from "./Recipe/Recipe";
import Records from "./Records/Records";

interface IRightSideProps {
  width: number;
}

export default function RightSide({ width }: IRightSideProps) {
  const [isLoading, setIsLoading] = useState(true);

  const setValuesLocalStorage = () => {
    setIsLoading(true);

    const values: any = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!values || typeof values?.diagnose === "string") {
      const valuesFormulary = {
        currentConsultation: {
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
          diagnose: [],
          observations: "",
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
        <Records />
      </div>

      <div className="w-full mb-8">
        <CurrentConsultation width={width} />
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
