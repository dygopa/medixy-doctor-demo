import { MedicalRecordCreateContext } from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { useContext } from "react";

const useMedicalRecordCreate = () => useContext(MedicalRecordCreateContext);

export default useMedicalRecordCreate;
