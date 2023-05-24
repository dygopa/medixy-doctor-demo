import { MedicalRecordContext } from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { useContext } from "react";

const useMedicalRecord = () => useContext(MedicalRecordContext);

export default useMedicalRecord;
