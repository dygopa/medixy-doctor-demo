"use client";

import EditPatientProvider from "(presentation)/components/Patients/PatientsEdit/context/EditPatientContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <EditPatientProvider>{children}</EditPatientProvider>;
}
