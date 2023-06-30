"use client";

import LastDoctors from "./LastDoctors/LastDoctors";
import LastPatients from "./LastPatients/LastPatients";
import Summary from "./Summary/Summary";

export default function DashboardIndex() {
  return (
    <div className="py-5">
      <div className="mb-8">
        <p className="font-medium text-xl text-slate-900">Tablero</p>
      </div>

      <div className="mb-14">
        <Summary />
      </div>

      <div className="md:grid grid-cols-2 gap-4">
        <div className="my-6 md:my-0">
          <LastDoctors />
        </div>

        <div className="my-6 md:my-0">
          <LastPatients />
        </div>
      </div>
    </div>
  );
}
