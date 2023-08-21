import { twMerge } from "tailwind-merge";
import { Transition } from "@headlessui/react";
import { FiArrowDown, FiArrowUp, FiCheck, FiCheckCircle } from "react-icons/fi";
import { useContext, useEffect, useMemo, useState } from "react";
import Lucide from "../BaseComponents/Lucide";
import Button from "../BaseComponents/Button";
import { IUser } from "domain/core/entities/userEntity";
import Header from "./Header";
import Footer from "./Footer";
import {
  IStepByStepContext,
  StepByStepContext,
} from "./context/StepByStepContext";
import Link from "next/link";

interface IStep {
  id: number;
  title: string;
  step_enum: string;
  completed: boolean;
  description: string;
  cta: string;
}
interface IAlertProps {
  user: IUser;
}

const StepByStepPopup = ({ user }: IAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const { state, actions, dispatch } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { getSteps } = actions;
  const { data, error, successful, loading } = state.getSteps;

  const [activeHelper, setActiveHelper] = useState(false);
  const [canShowHelp, setCanShowHelp] = useState(false);

  let [steps, setSteps] = useState([
    {
      id: 0,
      title: "Vamos a crear tu primer consultorio",
      step_enum: "LOCATION_CREATED",
      completed: false,
      description:
        "Administra los servicios que ofrecerás a todos tus pacientes",
      cta: "/localities/create",
    },
    {
      id: 1,
      title: "Crea tu agenda",
      step_enum: "SERVICE_CREATED",
      completed: false,
      description:
        "Configura los posibles horarios de atención o ventanas de atención para un servicio o varios",
      cta: "/schedule/",
    },
    {
      id: 2,
      title: "Administrar tus servicios",
      step_enum: "SERVICE_CREATED",
      completed: false,
      description:
        "Agrega y edita los consultorios donde ofreceras todos tues servicios",
      cta: "/services/new-service",
    },
  ]);

  const Step = ({ props, children }: { props: IStep; children: any }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="">
        <div className="flex justify-center text-center mb-4">
          <div>
            <div className=" flex justify-center mb-3">
              <div className="bg-primary rounded-full w-[50px] h-[50px]">
                <div className="flex justify-center align-middle items-center h-full">
                  <p className="text-white text-xl">{props.id + 1}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <p className="text-center text-md" style={{ color: "#000066" }}>
                {props.title}
              </p>
            </div>
          </div>
        </div>

        <div className="cursor-pointer h-36 bg-white border rounded-2xl overflow-hidden p-5 flex justify-between items-start gap-4">
          <div className="w-12 h-[130px] flex flex-col justify-start items-center">
            <div className="w-12 h-12 bg-primary/20 text-primary text-lg flex flex-col justify-center items-center rounded-md overflow-hidden">
              {children}
            </div>
          </div>
          <div className="w-[80%] h-fit flex flex-col justify-start items-start gap-1">
            <p className="font-semibold text-md text-slate-900">
              {props.title}
            </p>
            <p className="font-light text-md text-slate-500">
              {props.description}
            </p>
          </div>
        </div>
        <div className="text-center mt-3">
          <Button variant="primary">Ir</Button>
        </div>
      </div>
    );
  };

  function formatListOfSteps() {
    console.log(data);
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
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div className="w-[80%] md:w-[75%] h-auto overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
        <div className="w-full px-4">
          <div className="mb-14 w-full flex justify-between items-center">
            <Lucide
              icon="X"
              size={25}
              onClick={(e) => {
                setIsVisible(false);
              }}
              className="cursor-pointer"
            />
          </div>
          <Header />

          <div className="grid gap-24 grid-cols-3 mt-8 mb-12">
            <Step props={steps[0]}>
              <Lucide icon="Building" />
            </Step>
            <Step props={steps[1]}>
              <Lucide icon="Briefcase" />
            </Step>
            <Step props={steps[2]}>
              <Lucide icon="Briefcase" />
            </Step>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StepByStepPopup;
