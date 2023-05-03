"use client";

import { IUser } from "domain/core/entities/userEntity";
import Filters from "./Filters/Filters";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";

export default function PatientsListIndex() {
  return (
    <div className="container py-5">
      <Navigator />

      <div className="mt-10">
        <div className="mt-4">
          <Filters/>
        </div>

        <div className="mt-8">
          <Table/>
        </div>
      </div>
    </div>
  );
}
