import Button from "(presentation)/components/core/BaseComponents/Button";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { IStepsContext, StepsContext } from "./context/StepsContext";

export default function Steps() {
  const { state, actions, dispatch } = useContext<IStepsContext>(StepsContext);
  const { changeStep } = actions;
  const { data: active } = state.step;

  let steps_list = [
    {
      title: "¿Cuál es tú CURP?",
      value: 0,
    },
    {
      title: "¿Qué tipo de proveedor eres?",
      value: 1,
    },
    {
      title: "Vamos a crear tu cuenta",
      value: 2,
    },
  ];

  const StepComponent = (data: { title: string; value: number }) => {
    return (
      <div
        onClick={() => {
          active > data.value && changeStep(data.value - 1)(dispatch);
        }}
        className="flex flex-col justify-center items-center gap-2 text-center"
      >
        <p
          className={twMerge([
            "lg:text-[18px] md:text-[15px] sm:text-[12px] text-[12px]",
            active > data.value && "cursor-pointer",
            "text-[12px] block relative text-gray-950",
            active === data.value ? "font-normal" : "font-light",
          ])}
        >
          {data.title}
        </p>
        <span
          className={twMerge([
            "w-full h-1 block transition",
            active === data.value
              ? "bg-primary"
              : active > data.value
              ? "bg-green-500"
              : "bg-slate-300",
          ])}
        ></span>
      </div>
    );
  };

  const StepComponentMobile = (data: { title: string; value: number }) => {
    return (
      <button
        type="button"
        className="text-center"
        onClick={() => {
          active > data.value && changeStep(data.value - 1)(dispatch);
        }}
      >
        <div className="mb-2 flex justify-center">
          <div
            className={twMerge([
              "rounded-full w-[25px] h-[25px]",
              active > data.value
                ? "bg-green-500"
                : active === data.value
                ? "bg-primary"
                : "bg-primary bg-opacity-30",
            ])}
          >
            <div className="w-full h-full flex items-center justify-center text-center">
              <span className="text-white text-md">
                {active > data.value ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 0 24 24"
                    width="22px"
                    fill="#fff"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </svg>
                ) : (
                  data.value + 1
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[60px]">
          <p
            className={twMerge([
              "lg:text-[18px] md:text-[15px] sm:text-[12px] text-[12px]",
              active > data.value && "cursor-pointer",
              "text-[12px] block relative text-gray-950",
              active === data.value ? "font-normal" : "font-light",
            ])}
          >
            {data.title}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="lg:w-[80%] md:w-[70%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="lg:text-xl md:text-xl">Paso {active + 1} de 3</h3>
        </div>

        <div>
          <Button
            onClick={() => changeStep(active - 2)(dispatch)}
            variant="outline-primary"
            size="sm"
            className="px-8 lg:text-[14px] md:text-[14px]"
            disabled={active === 0}
          >
            Paso anterior
          </Button>
        </div>
      </div>

      <div className="w-full  grid-cols-3 items-center gap-[2px] lg:grid md:grid sm:grid hidden">
        {steps_list.map((s, i) => (
          <StepComponent title={s.title} value={s.value} key={i} />
        ))}
      </div>

      <div className="lg:hidden md:hidden sm:hidden block">
        <div className="w-full  grid-cols-3 items-center gap-[2px]  grid">
          {steps_list.map((s, i) => (
            <StepComponentMobile title={s.title} value={s.value} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
