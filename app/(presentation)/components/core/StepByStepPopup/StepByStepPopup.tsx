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
import { usePathname, useRouter } from "next/navigation";

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
  const { state, actions, dispatch } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { getSteps, changeOpenPopup /* getService */ } = actions;
  const { data, error, successful, loading } = state.getSteps;
  const { data: openPopup } = state.openPopup;
  const { successful: createdStep, loading: creatingStep } =
    state.createUserSteps;
  // const { data: dataService, error: errorService, successful: successfulService } = state.getService;

  const pathname = usePathname();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  let [steps, setSteps] = useState([
    {
      id: 0,
      title: "Vamos a crear tu primer consultorio",
      step_enum: "LOCATION_CREATED",
      completed: false,
      description:
        "Agrega y edita los consultorios donde ofreceras todos tus servicios",
      cta: "/localities/create",
    },
    {
      id: 1,
      title: "Crea tu agenda",
      step_enum: "SCHEDULE_CREATED",
      completed: false,
      description:
        "Configura los posibles horarios de atención o ventanas de atención en tu consultorio",
      cta: "/schedule/configuration?openPopup=true",
    },
    {
      id: 2,
      title: "Administrar tus servicios",
      step_enum: "SERVICE_UPDATED",
      completed: false,
      description: "Actualiza tu servicio para empezar a operar",
      cta: "/services",
    },
  ]);

  const [formatList, setFormatList] = useState(false);

  const Step = ({ props, children }: { props: IStep; children: any }) => {
    return (
      <div className="">
        <div className="flex justify-center text-center mb-4">
          <div>
            <div className=" flex justify-center mb-3">
              <div
                className={twMerge([
                  "bg-transparent rounded-full w-[50px] h-[50px]",
                  props.completed ? "bg-green-500" : "bg-primary",
                ])}
              >
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
        <div className="text-center mt-5">
          {props.completed ? (
            <span className="bg-green-500 text-white text-center font-normal text-sm px-4 py-2 rounded-md">
              Completado
            </span>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                changeOpenPopup(false)(dispatch);
                router.push(props.cta);
              }}
            >
              Ir
            </Button>
          )}
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
    setFormatList(true);
  }

  console.log(isVisible);

  function knowIfCanShowPopup() {
    if (
      pathname!.includes("/dashboard") &&
      steps.every((elem: any) => elem["completed"])
    ) {
      setIsVisible(false);
      return;
    }
    if (pathname!.includes("/dashboard") && data?.length === 0) {
      setIsVisible(true);
      return;
    }

    if (data?.length > 0) {
      setIsVisible(true);
    }

    if (openPopup) setIsVisible(true);
  }

  useMemo(() => {
    knowIfCanShowPopup();
  }, [steps, data]);

  useMemo(() => {
    if (successful) formatListOfSteps();
  }, [loading, successful]);

  /* const setStepService = () => {
    if(dataService.length === 0) {
      return
    }
    if(dataService.length ===  1){
      let l = steps.map((elem) => ({
        ...elem,
        cta: elem.id === 2 ? `/services/${dataService[0].id}` : elem.cta,
      }));
      setSteps(l);
    }
  } 
  useMemo(() => {
    if(successfulService && formatList) setStepService();
  }, [successfulService, formatList, dataService]); */

  useMemo(() => {
    if (openPopup && user?.accountId) {
      getSteps(user?.accountId)(dispatch);
      // getService(user?.userId)(dispatch);
    }
  }, [openPopup, user]);

  return (
    <div
      className={twMerge([
        "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        isVisible ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full h-screen overflow-y-auto flex flex-col justify-between items-start bg-white p-6 gap-8",
          "md:w-[75%] md:h-auto",
          "lg:w-[80%] lg:h-auto lg:rounded-md",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-14 w-full flex justify-between items-center">
            <Lucide
              icon="X"
              size={25}
              onClick={(e) => {
                setIsVisible(false);
                changeOpenPopup(false)(dispatch);
              }}
              className="cursor-pointer"
            />
          </div>
          <Header user={user} />

          <div
            className={twMerge([
              "flex flex-col gap-10 mt-8 mb-12",
              "lg:grid lg:grid-cols-3",
            ])}
          >
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

          <Footer
            user={user}
            customClick={() => {
              setIsVisible(false);
              changeOpenPopup(false)(dispatch);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepByStepPopup;
