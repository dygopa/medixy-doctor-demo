import { twMerge } from "tailwind-merge";
import { Transition } from "@headlessui/react";
import { FiCheckCircle } from "react-icons/fi";
import { useMemo, useState } from "react";
import Lucide from "../BaseComponents/Lucide";
import Button from "../BaseComponents/Button";
import { IUser } from "domain/core/entities/userEntity";

type Variant = "success" | "error" | "warning";

interface IAlertProps {
  user: IUser
}

const StepByStepPopup = ({ user }: IAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div className="w-[80%] md:w-[75%] h-auto overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
        <div className="w-full px-4">
          <div className="mb-14 w-full flex justify-between items-center">
              <p className="font-bold text-2xl text-slate-900">
                Bienvenido a Prosit, {user.names} {user.firstName}
              </p>
              <Lucide icon="X" size={25} onClick={(e) => {setIsVisible(false)}} className="cursor-pointer" />
          </div>

          <div className=" text-center mb-14">
            <p className="font-normal text-[18px] text-slate-900">
              El paso a paso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStepPopup;
