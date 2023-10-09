import Button from "(presentation)/components/core/BaseComponents/Button";
import { IUser } from "domain/core/entities/userEntity";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function Steps({steps, setSteps, user} : {steps: number, setSteps: any, user: IUser}) {
  let steps_list = [
    {
      title: "Mi Cuenta",
      value: 0,
    },
    //{
    //  title: "Localidad",
    //  value: 1,
    //},
    {
      title: "Seguridad",
      value: 1,
    },
  ];
  const StepComponentMobile = (data: { title: string; value: number }) => {
    return (
      <button
        onClick={() => {
          setSteps(data.value);
        }}
        className={twMerge([
          "h-auto w-[200px] p-2 font-medium rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer",
          steps === data.value
            ? "text-white bg-primary"
            : "bg-dark bg-opacity-10",
        ])}
      >
        {data.title}
      </button>
    );
  };

  return (
    <div className="w-full h-fit mt-4">
      <div className="w-full flex justify-start items-center py-2 gap-4">
        {steps_list.map((s, i) => (
          <StepComponentMobile title={s.title} value={s.value} key={i} />
        ))}
      </div>
    </div>
  );
}
