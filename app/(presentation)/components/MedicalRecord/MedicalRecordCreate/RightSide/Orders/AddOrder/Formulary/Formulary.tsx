import { Dispatch, SetStateAction } from "react";
import { valuesTypes } from "../AddOrder";
import Diagnosis from "./Diagnosis/Diagnosis";
import Hospitalization from "./Hospitalization/Hospitalization";
import Laboratory from "./Laboratory/Laboratory";
import MedicalCertificate from "./MedicalCertificate/MedicalCertificate";
import MedicalProof from "./MedicalProof/MedicalProof";
import Opening from "./Opening/Opening";
import Specialty from "./Specialty/Specialty";

interface IFormularyProps {
  orderType: number;
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function Formulary({
  orderType,
  values,
  setValues,
}: IFormularyProps) {
  const getFormularyByOrderType = () => {
    switch (orderType) {
      case 1:
        return <Laboratory values={values} setValues={setValues} />;
      case 2:
        return <Diagnosis values={values} setValues={setValues} />;
      case 3:
        return <Specialty values={values} setValues={setValues} />;
      case 4:
        return <MedicalProof values={values} setValues={setValues} />;
      case 5:
        return <MedicalCertificate values={values} setValues={setValues} />;
      case 6:
        return <Hospitalization values={values} setValues={setValues} />;
      case 7:
        return <Opening values={values} setValues={setValues} />;

      default:
        return <div />;
    }
  };

  return getFormularyByOrderType();
}
