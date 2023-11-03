import React from "react";
import { twMerge } from "tailwind-merge";

export default function Steps({
  steps,
  setSteps,
}: {
  steps: number;
  setSteps: any;
}) {
  let steps_list = [
    {
      title: "Localidad",
      value: 0,
      isProvider: false,
    },
    {
      title: "Servicios",
      value: 1,
      isProvider: true,
    },
  ];
  const StepComponentMobile = (data: {
    title: string;
    value: number;
    isProvider: boolean;
  }) => {
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
          <StepComponentMobile
            title={s.title}
            value={s.value}
            isProvider={s.isProvider}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
