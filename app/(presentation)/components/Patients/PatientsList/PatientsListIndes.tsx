"use client";

import Filters from "./Filters/Filters";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import TableResponsive from "./Table/TableResponsive";
import PatientsListProvider from "./context/PatientsListContext";
import { IUser } from "domain/core/entities/userEntity";

interface IPatientsListIndexProps {
  user: IUser;
}

export default function PatientsListIndex({ user }: IPatientsListIndexProps) {
  return (
    <PatientsListProvider>
      <div className="py-5">
        <Navigator />

        <div className="mt-5 md:mt-7">
          <div className="">
            <Filters />
          </div>

          <div className="">
            <div className="md:block hidden">
              <Table user={user} />
            </div>

            <div className="lg:hidden md:hidden block">
              <TableResponsive user={user} />
            </div>
          </div>
        </div>
      </div>
    </PatientsListProvider>
  );
}
