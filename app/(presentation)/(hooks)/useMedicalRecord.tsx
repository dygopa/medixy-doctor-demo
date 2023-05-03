import MedicalRecordContext from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/context/MedicalRecordProvider";
import { useContext } from "react";

const useMedicalRecord = () => useContext(MedicalRecordContext);

export default useMedicalRecord;
