import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  IStepByStepContext,
  StepByStepContext,
} from "./context/StepByStepContext";
import { IUser } from "domain/core/entities/userEntity";
import Lucide from "../BaseComponents/Lucide";

interface IStep {
  id: number;
  title: string;
  step_enum: string;
  completed: boolean;
  description: string;
  cta: string;
  cta_title: string;
}

export default function StepByStep({ user }: { user: IUser }) {
  const { state, actions, dispatch } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { getSteps, createUserSteps } = actions;
  const { data, error, successful, loading } = state.getSteps;

  const [activeHelper, setActiveHelper] = useState(false);
  const [canShowHelp, setCanShowHelp] = useState(false);

  let [steps, setSteps] = useState([
    {
      id: 0,
      title: "Completa tu perfil",
      step_enum: "PROFILE_COMPLETED",
      completed: false,
      description:
        "Completa la información que los pacientes verán en tu perfil de Prosit.",
      cta: "/account",
      cta_title: "Ir a completar el perfil",
    },
    {
      id: 1,
      title: "Servicios",
      step_enum: "SERVICE_CREATED",
      completed: false,
      description:
        "Crea el servicio que prestas para que los pacientes te puedan localizar fácilmente. En este paso ya serás visible en MedHaus.",
      cta: "/services/new-service",
      cta_title: "Crear mi servicio",
    },
    {
      id: 2,
      title: "Consultorios",
      step_enum: "LOCATION_CREATED",
      completed: false,
      description:
        "Crea el consultorio donde atenderás a tus pacientes. Sólo debes ingresar la torre médica y el número de consultorio.",
      cta: "/localities/create",
      cta_title: "Crear primer consultorio",
    },
  ]);

  const Step = ({ props }: { props: IStep }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative border-b border-slate-200 pb-2">
        <div className="cursor-pointer w-full relative flex justify-between items-center">
          <div className="relative flex justify-start items-center gap-2">
            <span
              className={twMerge([
                "rounded-md w-7 h-7 flex flex-col justify-center items-center border border-slate-300 bg-white overflow-hidden font-normal text-sm",
                props.completed && "bg-green-600 text-white",
              ])}
            >
              {props.completed ? (
                <Lucide icon="at" />
              ) : (
                <p className="text-primary">{props.id + 1}</p>
              )}
            </span>
            <p className="font-semibold text-sm text-slate-900">
              {props.title}
            </p>
          </div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="w-7 h-7 flex justify-center items-center text-base text-slate-900"
          >
            {!open ? <Lucide icon="at" /> : <Lucide icon="at" />}
          </div>
        </div>
        <div
          className={twMerge([
            "transition w-full relative overflow-hidden pl-9",
            open ? "h-fit" : "h-0",
          ])}
        >
          <p className="font-normal text-sm text-slate-900">
            {props.description}
          </p>
          <Link
            href={props.cta}
            className="underline decoration-primary text-primary cursor-pointer"
          >
            {props.cta_title}
          </Link>
        </div>
      </div>
    );
  };

  const ButtonStepByStep = () => {
    return (
      <div
        className={
          "cursor-pointer w-[20rem] h-[12vh] flex justify-between items-center gap-2 p-3 border border-slate-200 rounded-lg bg-white shadow-md overflow-hidden sticky z-[51]"
        }
        onClick={() => {
          setActiveHelper(!activeHelper);
        }}
      >
        <div className="flex flex-col justify-center items-start">
          <p className="text-base font-semibold text-slate-900">Paso-a-paso</p>
          <p className="text-sm font-light text-slate-500">
            Completa los pasos del tutorial
          </p>
        </div>
        <div className="w-14 h-14 rounded-lg flex justify-center items-center bg-primary text-white p-3">
          <p className="font-bold text-base">
            {steps.filter((elem) => elem["completed"] === true).length}
          </p>
          <p className="font-light text-base">/</p>
          <p className="font-light text-base">{steps.length}</p>
        </div>
      </div>
    );
  };

  function formatListOfSteps() {
    let list = data as any[];
    let mappedList = [...list].map((elem) => elem["evento"]);
    let l = steps.map((elem) => ({
      ...elem,
      completed: mappedList.includes(elem["step_enum"]),
    }));

    setSteps(l);
    setCanShowHelp(mappedList.length < 3);
  }

  useMemo(() => {
    if (successful) formatListOfSteps();
  }, [successful]);

  useEffect(() => {
    if (user?.accountId) getSteps(user?.accountId)(dispatch);
  }, [user]);

  return (
    <div
      className={twMerge([
        "w-fit h-fit fixed bottom-5 right-5 flex flex-col justify-end items-center gap-4 z-[100]",
        !canShowHelp && "hidden",
      ])}
    >
      {activeHelper && (
        <div className="w-[20rem] max-h-[50vh] h-fit p-4 flex flex-col justify-start items-center gap-3 border border-slate-200 rounded-lg bg-white shadow-md overflow-hidden relative overflow-y-auto">
          <div className="w-full bg-primary rounded-md flex flex-col justify-center items-center gap-2 p-3 sticky top-0 z-20">
            <p className="text-white text-center font-semibold text-base">
              Completemos tu cuenta
            </p>
            <div className="w-full grid grid-cols-3 gap-2 justify-center items-center">
              {steps.map((elem) => (
                <span
                  className={twMerge([
                    "h-2 relative block",
                    elem["completed"] ? "bg-green-500" : "bg-white/20",
                  ])}
                ></span>
              ))}
            </div>
          </div>
          {steps.map((elem, i) => (
            <Step key={i} props={elem} />
          ))}
        </div>
      )}
      <ButtonStepByStep />
    </div>
  );
}
