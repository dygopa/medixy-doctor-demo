"use client";

import MedicalCentersCreateProvider from "./context/MedicalCentersCreateContext";
import Formulary from "./Formulary/Formulary";

export default function MedicalCentersCreateIndex() {
  return (
    <MedicalCentersCreateProvider>
      <div className="py-5">
        <div className="mt-5 md:mt-7">
          <div className="">
            <Formulary />
          </div>
        </div>
      </div>
    </MedicalCentersCreateProvider>
  );
}
