import MedicalRecordProvider from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { Dispatch, SetStateAction } from "react";
import Formulary from "./Formulary/Formulary";

interface IAddCompanionProps {
  setShowAddCompanion: Dispatch<SetStateAction<boolean>>;
  patientId: number;
}

export default function AddCompanion({
  setShowAddCompanion,
  patientId,
}: IAddCompanionProps) {
  return (
    <MedicalRecordProvider>
      <div>
        <div>
          <Formulary
            patientId={patientId}
            setShowAddCompanion={setShowAddCompanion}
          />
        </div>
      </div>
    </MedicalRecordProvider>
  );
}
