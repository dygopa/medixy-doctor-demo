"use client";

import Filters from "./Filters/Filters";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import TableResponsive from "./Table/TableResponsive";
import MedicalRecordsListProvider from "./context/MedicalRecordsListContext";
import { IUser } from "domain/core/entities/userEntity";
import ScheduleProvider from "(presentation)/components/Schedule/context/ScheduleContext";
import Popup from "(presentation)/components/core/Popup/Popup";

interface IMedicalRecordsListIndexProps {
  user: IUser;
}

export default function MedicalRecordsListIndex({
  user,
}: IMedicalRecordsListIndexProps) {
  return (
    <ScheduleProvider>
      <MedicalRecordsListProvider>
        <Popup user={user} />
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
      </MedicalRecordsListProvider>
    </ScheduleProvider>
  );
}
