"use client";

import { IUser } from "domain/core/entities/userEntity";
import Navigator from "./Navigator/Navigator";
import Steps from "./Steps/Steps";

export default function PatientsCreateIndex() {
  return (
    <div className="container py-5">
      <Navigator />

      <div className="flex mt-10">
        <Steps />
      </div>
    </div>
  );
}
