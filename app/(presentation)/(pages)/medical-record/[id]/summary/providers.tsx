"use client";

import MedicalRecordSummaryProvider from "(presentation)/components/MedicalRecord/MedicalRecordSummary/context/MedicalRecordSummaryContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return (
    <MedicalRecordSummaryProvider>{children}</MedicalRecordSummaryProvider>
  );
}
