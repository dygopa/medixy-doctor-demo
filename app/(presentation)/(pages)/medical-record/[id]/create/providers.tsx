"use client";

import MedicalRecordCreateProvider from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <MedicalRecordCreateProvider>{children}</MedicalRecordCreateProvider>;
}
