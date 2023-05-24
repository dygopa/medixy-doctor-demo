import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import MedicalRecordNavigation from "./MedicalRecordNavigation/MedicalRecordNavigation";
import Patient from "./Patient/Patient";

interface ILeftSideProps {
  windowWidth: any;
}

export default function LeftSide({ windowWidth }: ILeftSideProps) {
  const [showCompleteDetails, setShowCompleteDetails] = useState(false);

  return (
    <div
      className={clsx([
        "sticky top-[155px] z-[99]",
        windowWidth <= 1866 ? "hidden" : "block",
      ])}
    >
      <div
        className={clsx([
          "h-[18vh]",
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
