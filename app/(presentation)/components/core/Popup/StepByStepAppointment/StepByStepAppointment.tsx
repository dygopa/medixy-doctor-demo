import React from "react";
import StepByStepAppointmentProvider from "./context/StepByStepAppointmentContext";
import Steps from "./Steps/Steps";
import { twMerge } from "tailwind-merge";
import { IUser } from "domain/core/entities/userEntity";

const StepByStepAppointment = ({
  user,
  cancelFuntion,
  customRef,
}: {
  user: IUser;
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) => {
  return (
    <StepByStepAppointmentProvider>
      <div
        ref={customRef}
        className={twMerge([
          "w-full h-screen overflow-y-auto bg-white p-6 pb-0",
          "md:w-[60%] md:min-h-[50vh] md:h-fit md:max-h-[90vh]",
          "lg:w-[45%] lg:min-h-[50vh] lg:h-fit lg:max-h-[90vh] lg:rounded-md",
        ])}
      >
        <Steps user={user} />
      </div>
    </StepByStepAppointmentProvider>
  );
};

export default StepByStepAppointment;
