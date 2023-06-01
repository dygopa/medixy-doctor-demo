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
        "top-[155px] z-[99]",
        windowWidth <= 1866 ? "static" : "sticky",
      ])}
    >
      <div
        className={clsx([
          "xl:h-[18vh] h-auto mb-8",
          windowWidth <= 1866 && "hidden",
          showCompleteDetails && windowWidth >= 1866
            ? "xl:w-[1200px]"
            : "w-full",
        ])}
      >
        <Patient
          showCompleteDetails={showCompleteDetails}
          setShowCompleteDetails={setShowCompleteDetails}
          windowWidth={windowWidth}
        />
      </div>

      <div
        className={clsx([
          "w-[385px]",
          windowWidth <= 1866 ? "hidden" : "block",
        ])}
      >
        <MedicalRecordNavigation />
      </div>
    </div>
  );
}
