"use client";

import Navigator from "./Navigator/Navigator";
import PatientDetails from "./PatientDetail/PatientDetail";

export default function MedicalRecordIndex() {
  return (
    <div className="container py-5">
      <Navigator />

      <div className="mt-10">
        <div className="mt-4">
          <PatientDetails />
        </div>

        <div></div>
      </div>
    </div>
  );
}
