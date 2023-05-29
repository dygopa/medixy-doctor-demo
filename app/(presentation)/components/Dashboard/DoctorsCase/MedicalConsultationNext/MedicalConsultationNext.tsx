import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";
import { HiOutlineBell } from "react-icons/hi";
import { DashboardContext, IDashboardContext } from "../context/DashboardContext";
import { useContext, useEffect, useState } from "react";

export default function MedicalConsultationNext() {

  const { state, actions, dispatch } = useContext<IDashboardContext>(DashboardContext);
  const { getLatestAppointment } = actions;

  const { data, loading, error, successful } = state.getLatestAppointment;

  const [loadedAppointment, setLoadedAppointment] = useState(false);

  const LoadingAppointment = () => {
    return(
      <div className="w-full h-full lg:flex md:flex sm:flex block justify-between items-start gap-4 p-5 bg-white rounded-md shadow-md">
        <div className="w-[10%] flex flex-col justify-start items-start">
          <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
            <HiOutlineBell />
          </span>
        </div>
        <div className="w-[90%] h-full flex flex-col justify-between items-center">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  const LastOne = () => {
    return (
      <div className="w-full h-full lg:flex md:flex sm:flex block justify-between items-start gap-4 p-5 bg-white rounded-md shadow-md">
        <div className="w-[10%] flex flex-col justify-start items-start">
          <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
            <HiOutlineBell />
          </span>
        </div>
        <div className="w-[90%] h-full flex flex-col justify-between items-start">
          <div className="w-full flex justify-start items-center gap-1">
            <p className="font-light text-sm text-slate-500">
              Próxima Consulta
            </p>
            <p className="font-light text-sm text-slate-500">-</p>
            <p className="font-medium text-base text-slate-900">10:00 am</p>
          </div>
          <div className="mb-4 mt-2">
            <p className="font-medium text-lg text-slate-900">
              Fernando Suarez
            </p>
            <p className="font-light text-sm text-slate-500">
              {" "}
              Dolor de Hombro Izquierdo
            </p>
          </div>
          <Button className="w-full" variant="primary">
            Atender
          </Button>
        </div>
      </div>
    );
  };

  const EmptyState = () => {
    return (
      <div className="w-full h-full lg:flex md:flex sm:flex block items-start gap-4 p-5 bg-white rounded-md shadow-md">
        <div className="w-[10%] flex flex-col justify-start items-start lg:mb-0 md:mb-0 sm:mb-0 mb-4">
          <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
            <HiOutlineBell />
          </span>
        </div>
        <div className="w-[90%] h-full flex flex-col items-start text-left">
          <p className="font-light text-sm text-slate-500">Próxima consulta</p>
          <p className="font-medium text-lg text-slate-900">
            Nada por aquí aún
          </p>
          <p className="font-light text-sm text-slate-500">
            No tienes próximas citas aún en la plataforma, te recomendamos crear{" "}
            <Link href="/services" className="font-semibold text-primary">
              servicios
            </Link>{" "}
            para exponerte a los pacientes
          </p>
        </div>
      </div>
    );
  };

  function loadData(){
    getLatestAppointment()(dispatch)
    setLoadedAppointment(true)
  } 

  useEffect(()=>{
    loadData()
  },[loadedAppointment])

  return loading ? 
    <LoadingAppointment/> 
  : (successful && Object.keys(data as Object).length > 0) ? 
    <LastOne/> 
  : 
    <EmptyState/>;
}
