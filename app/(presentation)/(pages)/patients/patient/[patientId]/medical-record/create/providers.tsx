"use client";

import MedicalRecordCreateProvider from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <MedicalRecordCreateProvider>{children}</MedicalRecordCreateProvider>;
}
