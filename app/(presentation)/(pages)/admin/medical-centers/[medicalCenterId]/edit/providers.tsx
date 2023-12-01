"use client";

import MedicalCentersEditProvider from "(presentation)/components/Admin/MedicalCenters/MedicalCentersEdit/context/MedicalCentersEditContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <MedicalCentersEditProvider>{children}</MedicalCentersEditProvider>;
}
