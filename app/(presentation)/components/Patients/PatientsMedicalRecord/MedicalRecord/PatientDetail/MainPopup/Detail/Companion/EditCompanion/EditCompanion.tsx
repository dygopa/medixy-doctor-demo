import MedicalRecordProvider from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { ISubject } from "domain/core/entities/subjectEntity";
import { Dispatch, SetStateAction } from "react";
import Formulary from "./Formulary/Formulary";

interface IEditCompanionProps {
  setShowEditCompanion: Dispatch<SetStateAction<ISubject | null>>;
  companion: ISubject | null;
  patientId: number;
}

export default function EditCompanion({
  setShowEditCompanion,
  companion,
  patientId,
}: IEditCompanionProps) {
  return (
    <MedicalRecordProvider>
      <div>
        <div>
          <Formulary
            companion={companion}
            patientId={patientId}
            setShowEditCompanion={setShowEditCompanion}
          />
        </div>
      </div>
    </MedicalRecordProvider>
  );
}
