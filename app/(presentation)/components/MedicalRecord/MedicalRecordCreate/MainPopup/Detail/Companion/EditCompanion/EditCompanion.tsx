import MedicalRecordCreateProvider from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
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
    <MedicalRecordCreateProvider>
      <div>
        <div>
          <Formulary
            companion={companion}
            patientId={patientId}
            setShowEditCompanion={setShowEditCompanion}
          />
        </div>
      </div>
    </MedicalRecordCreateProvider>
  );
}
