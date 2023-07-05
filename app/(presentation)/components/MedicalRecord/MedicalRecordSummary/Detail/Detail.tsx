import { useContext } from "react";
import {
  IMedicalRecordSummaryContext,
  MedicalRecordSummaryContext,
} from "../context/MedicalRecordSummaryContext";
import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Patient from "./Patient/Patient";
import Physical from "./Physical/Physical";
import Reason from "./Reason/Reason";
import Recipes from "./Recipes/Recipes";
import Records from "./Records/Records";
import Title from "./Title/Title";
import VitalSigns from "./VitalSigns/VitalSigns";

export default function Detail() {
  const { state } = useContext<IMedicalRecordSummaryContext>(
    MedicalRecordSummaryContext
  );
  const { data: medicalConsulty } = state.getMedicalConsultyById;

  return (
    <div>
      <div className="mb-4 border-b">
        <Title medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Patient medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Reason medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Diagnosis medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Records medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Physical medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <VitalSigns medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Recipes medicalConsulty={medicalConsulty} />
      </div>

      <div>
        <Orders medicalConsulty={medicalConsulty} />
      </div>
    </div>
  );
}