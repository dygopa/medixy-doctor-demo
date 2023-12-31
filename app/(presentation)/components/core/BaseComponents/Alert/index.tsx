import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import Lucide from "../Lucide";

type Variant = "success" | "error" | "warning";

interface IAlertProps {
  variant: Variant;
  show: boolean;
  description: string;
}

const AlertComponent = ({ variant, show, description }: IAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useMemo(() => {
    setIsVisible(show);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [show]);

  return (
    <div
      className={twMerge([
        "lg:w-[25rem] md:w-[25rem] w-[22rem] bg-white h-fit rounded-md border shadow-md fixed top-20 lg:right-20 md:right-20 right-6 z-[99] overflow-hidden",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div className="w-full h-full flex justify-between items-center gap-4 px-4 py-3 relative">
        <span
          className={twMerge([
            "w-1 h-full block absolute left-0 top-0",
            variant === "success" && "bg-green-500",
            variant === "warning" && "bg-yellow-500",
            variant === "error" && "bg-red-500",
          ])}
        ></span>
        <div
          className={twMerge([
            "relative flex justify-center items-center text-2xl",
            variant === "success" && "text-green-500",
            variant === "warning" && "text-yellow-500",
            variant === "error" && "text-red-500",
          ])}
        >
          {variant === "success" && (
            <Lucide icon="check-circle-outline" color="rgb(34 197 94)" />
          )}
          {variant === "warning" && (
            <Lucide icon="alert-circle-outline" color="rgb(234 179 8)" />
          )}
          {variant === "error" && (
            <Lucide icon="alert-circle-outline" color="rgb(239 68 68)" />
          )}
        </div>
        <div className="w-[85%] relative flex flex-col justify-center items-start">
          <p className="font-semibold text-base text-slate-900">
            {variant === "success" && "Exitos"}
            {variant === "warning" && "Alerta"}
            {variant === "error" && "Error"}
          </p>
          <p className="font-light text-sm text-slate-500">{description}</p>
        </div>
        <div
          onClick={() => {
            setIsVisible(false);
          }}
          className="cursor-pointer relative flex justify-center items-center text-base text-slate-500"
        >
          <Lucide icon="information-outline" />
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
