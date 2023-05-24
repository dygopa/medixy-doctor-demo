import clsx from "clsx";
import { useState } from "react";
import MedicalRecordNavigation from "./MedicalRecordNavigation/MedicalRecordNavigation";
import Patient from "./Patient/Patient";

export default function LeftSide() {
  const [showCompleteDetails, setShowCompleteDetails] = useState(false);

  return (
    <div className="sticky top-[155px] z-[99] xl:block hidden">
      <div
        className={clsx([
          "mb-8 h-[18vh]",
          showCompleteDetails ? "w-[1200px]" : "w-full",
        ])}
      >
        <Patient
          showCompleteDetails={showCompleteDetails}
          setShowCompleteDetails={setShowCompleteDetails}
        />
      </div>

      <div className="w-[385px]">
        <MedicalRecordNavigation />
      </div>
    </div>
  );
}
