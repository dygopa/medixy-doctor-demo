"use client";

import { MedicalRecordProvider } from "(presentation)/components/Patients/PatientsMedicalRecord/MedicalRecord/context/MedicalRecordProvider";

export default function Providers({ children }: { children: JSX.Element }) {
  return <MedicalRecordProvider>{children}</MedicalRecordProvider>;
}
