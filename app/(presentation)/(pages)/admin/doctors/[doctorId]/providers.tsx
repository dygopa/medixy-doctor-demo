"use client";

import DoctorViewProvider from "(presentation)/components/Admin/Doctors/DoctorsView/context/DoctorViewContext";
import EditPatientProvider from "(presentation)/components/Patients/PatientsEdit/context/EditPatientContext";

export default function Providers({ children }: { children: JSX.Element }) {
  return <DoctorViewProvider>{children}</DoctorViewProvider>;
}
