"use client";

import MedicalCentersListProvider from "./context/MedicalCentersListContext";
import Navigator from "./Navigator/Navigator";
import Table from "./Table/Table";
import TableResponsive from "./Table/TableResponsive";

export default function MedicalCentersListIndex() {
  return (
    <MedicalCentersListProvider>
      <div className="py-5">
        <Navigator />

        <div className="mt-5 md:mt-7">
          <div className="">
            <div className="md:block hidden">
              <Table />
            </div>

            <div className="lg:hidden md:hidden block">
              <TableResponsive />
            </div>
          </div>
        </div>
      </div>
    </MedicalCentersListProvider>
  );
}
