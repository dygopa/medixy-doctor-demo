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
import { usePathname } from "next/navigation";

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
  const { getSteps, changeOpenPopup } = actions;
  const { data, error, successful, loading } = state.getSteps;
  const { data: openPopup } = state.openPopup;
  
  const pathname = usePathname()

  const [isVisible, setIsVisible] = useState(false);

  let [steps, setSteps] = useState([
    {
      id: 0,
      title: "Vamos a crear tu primer consultorio",
      step_enum: "LOCATION_CREATED",
      completed: false,
      description:
        "Agrega y edita los consultorios donde ofreceras todos tues servicios",
      cta: "/localities/create",
    },
    {
      id: 1,
      title: "Crea tu agenda",
      step_enum: "SCHEDULE_CREATED",
      completed: false,
      description:
        "Configura los posibles horarios de atención o ventanas de atención para un servicio o varios",
      cta: "/schedule/configuration",
    },
    {
      id: 2,
      title: "Administrar tus servicios",
      step_enum: "SERVICE_CREATED",
      completed: false,
      description:
        "Administra los servicios que ofrecerás a todos tus pacientes",
      cta: "/services/new-service",
    },
  ]);

  const Step = ({ props, children }: { props: IStep; children: any }) => {
    
    return (
      <div className="">
        <div className="flex justify-center text-center mb-4">
          <div>
            <div className=" flex justify-center mb-3">
              <div className={twMerge([
                "bg-transparent rounded-full w-[50px] h-[50px]",
                props.completed ? "bg-green-500" : "bg-primary"
              ])}>
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
          {props.completed ? 
            <span className="bg-green-500 text-white text-center font-normal text-sm px-4 py-2 rounded-md">Completado</span> 
          : 
            <Link href={props.cta}>
              <Button variant="primary" >Ir</Button>
            </Link>
          }
        </div>
      </div>
    );
  };
  
  function formatListOfSteps(){
    let list = data as any[]
    let mappedList = [...list].map(elem => elem["evento"])
    let l = steps.map(elem => ({
        ...elem,
        completed: mappedList.includes(elem["step_enum"]),
      })
    )

    setSteps(l)
  }

  function knowIfCanShowPopup(){
    if(openPopup && steps.every((elem:any)=> elem["completed"] === true )){
      setIsVisible(false)
    }else{
      if(pathname!.includes("/localities/create") && steps[0]["completed"]) setIsVisible(true)
      if(pathname!.includes("/schedule/configuration") && steps[1]["completed"]) setIsVisible(true)
      if(pathname!.includes("/services/new-service") && steps[2]["completed"]) setIsVisible(true)
      if(pathname!.includes("/dashboard")) setIsVisible(true)
    }
  }

  useMemo(()=>{
    if(openPopup){
      knowIfCanShowPopup()
    }else{
      setIsVisible(false)
    }
  },[openPopup])

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
                changeOpenPopup(false)(dispatch)
              }}
              className="cursor-pointer"
            />
          </div>
          <Header user={user} />

          <div className="grid gap-10 grid-cols-3 mt-8 mb-12">
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

          <Footer user={user} customClick={()=>{ changeOpenPopup(false)(dispatch) }} />
        </div>
      </div>
    </div>
  );
};

export default StepByStepPopup;
