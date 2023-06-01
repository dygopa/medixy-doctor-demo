import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "../context/MedicalRecordCreateSummaryContext";
import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Physical from "./Physical/Physical";
import Reason from "./Reason/Reason";
import Recipes from "./Recipes/Recipes";
import Records from "./Records/Records";
import Title from "./Title/Title";
import VitalSigns from "./VitalSigns/VitalSigns";

export default function Detail() {
  const { state } = useContext<IMedicalRecordCreateSummaryContext>(
    MedicalRecordCreateSummaryContext
  );
  const { data: patient } = state.patient;

  const router = useRouter();

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) {
      router.push(
        PatientsRoutesEnum.PatientsView +
          patient?.patientId +
          PatientsMedicalRecordRoutesEnum.MedicalRecord +
          PatientsMedicalRecordRoutesEnum.MedicalRecordCreate
      );
      return;
    }

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    if (!valuesJSON.isValid) {
      router.push(
        PatientsRoutesEnum.PatientsView +
          patient?.patientId +
          PatientsMedicalRecordRoutesEnum.MedicalRecord +
          PatientsMedicalRecordRoutesEnum.MedicalRecordCreate
      );
    }
  };

  useEffect(() => {
    setValueFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-4 border-b">
        <Title />
      </div>

      <div className="mb-4">
        <Reason />
      </div>

      <div className="mb-4">
        <Records />
      </div>

      <div className="mb-4">
        <Diagnosis />
      </div>

      <div className="mb-4">
        <Physical />
      </div>

      <div className="mb-4">
        <VitalSigns />
      </div>

      <div className="mb-4">
        <Recipes />
      </div>

      <div>
        <Orders />
      </div>
    </div>
  );
}
