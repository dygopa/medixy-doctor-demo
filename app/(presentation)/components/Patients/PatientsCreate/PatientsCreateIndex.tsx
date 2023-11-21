"use client";

import { IUser } from "domain/core/entities/userEntity";
import Steps from "./Steps/Steps";
import CreatePatientProvider from "./context/CreatePatientContext";

interface IPatientsCreateIndexProps {
  user: IUser;
}

export default function PatientsCreateIndex({
  user,
}: IPatientsCreateIndexProps) {
  return (
    <CreatePatientProvider>
      <div className="container mb-8">
        <div className="">
          <Steps user={user} />
        </div>
      </div>
    </CreatePatientProvider>
  );
}
