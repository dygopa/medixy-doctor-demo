import { useEffect, useState } from "react";
import CurrentConsultation from "./CurrentConsultation/CurrentConsultation";
import Orders from "./Orders/Orders";
import Recipe from "./Recipe/Recipe";
import Records from "./Records/Records";

export default function RightSide() {
  const [isLoading, setIsLoading] = useState(true);

  const setValuesLocalStorage = () => {
    setIsLoading(true);

    const values = localStorage.getItem("noodus.storage.medical-record-create");

    if (!values) {
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
          diagnose: "",
          observations: "",
        },
        records: {
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
        },
        orders: [],
        recipes: [],
        isValid: false,
      };

      localStorage.setItem(
        "noodus.storage.medical-record-create",
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
    <div>
      <div className="mb-8">
        <Records />
      </div>

      <div className="mb-8">
        <CurrentConsultation />
      </div>

      <div className="mb-8">
        <Orders />
      </div>

      <div className="mb-8">
        <Recipe />
      </div>
    </div>
  );
}
