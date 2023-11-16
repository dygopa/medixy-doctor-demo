import clsx from "clsx";
import { useState } from "react";
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
        "top-[180px] z-[95]",
        windowWidth <= 992 ? "static" : "sticky",
      ])}
    >
      <div
        className={clsx([
          "h-auto mb-8",
          windowWidth <= 992 && "hidden",
          showCompleteDetails && windowWidth >= 992
            ? "xl:w-[1000px] lg:w-[875px] md:w-[840px]"
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
          "xl:w-[325px] lg:w-[300px] w-[300px]",
          windowWidth <= 992 ? "hidden" : "block",
        ])}
      >
        <MedicalRecordNavigation />
      </div>
    </div>
  );
}
