"use client";

import { IUser } from "domain/core/entities/userEntity";
import Steps from "./Steps/Steps";
import CreatePatientProvider from "./context/CreatePatientContext";

export default function PatientsCreateIndex() {
  return (
    <CreatePatientProvider>
      <div className="container">

        <div className="">
          <Steps />
        </div>
      </div>
    </CreatePatientProvider>
  );
}
