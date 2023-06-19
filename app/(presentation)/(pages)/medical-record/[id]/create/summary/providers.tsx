"use client";

import MedicalRecordCreateSummaryProvider from "(presentation)/components/MedicalRecord/MedicalRecordCreate/MedicalRecordCreateSummary/context/MedicalRecordCreateSummaryContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return (
    <MedicalRecordCreateSummaryProvider>
      {children}
    </MedicalRecordCreateSummaryProvider>
  );
}
