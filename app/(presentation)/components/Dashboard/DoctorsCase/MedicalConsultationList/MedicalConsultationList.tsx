import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import ErrorMessage from "(presentation)/components/core/Error/ErrorMessage/ErrorMessage";
import Loading from "(presentation)/components/core/Loading/Loading";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  IMedicalConsultationListContext,
  MedicalConsultationListContext,
} from "./context/MedicalConsultationListContext";
import Consultation from "./Consultation/Consultation";
import Link from "next/link";
import {
  DashboardContext,
  IDashboardContext,
} from "../context/DashboardContext";

export default function MedicalConsultationList() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getPendingAppointments } = actions;

  const {
    data: appointments,
    loading,
    successful,
    error,
  } = state.getPendingAppointments;

  const [loadedData, setLoadedData] = useState(false);

  const DateComponent = ({ data }: { data: any }) => {
    return (
      <div className="w-full h-[25%] cursor-pointer bg-white border border-slate-200 flex justify-between items-center gap-4 rounded-md p-4 overflow-hidden">
        <div className="rounded-md w-[42px] h-[42px] block overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={data["pic_profile"]}
            alt="profile-picture"
          />
        </div>
        <div className="relative w-[83%] h-full flex flex-col justify-center items-start">
          <div className="flex justify-between items-center w-full">
            <p className="font-medium text-md text-slate-900">{data["user"]}</p>
            <p className="font-light text-sm text-slate-900">
              {data["date"] + " - " + data["hour"]}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-light text-sm text-slate-400">
              {data["service"]}
            </p>
            <div className="flex justify-start items-center gap-2">
              <span className="rounded-full w-[12px] h-[12px] bg-warning"></span>
              <p className="text-sm font-medium text-slate-900">Por atender</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function loadData() {
    getPendingAppointments()(dispatch);
    setLoadedData(true);
  }

  useEffect(() => {
    loadData();
  }, [loadedData]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage />;

  if ([...(appointments as Array<any>)].length === 0 && successful)
    return (
      <div className="w-full h-fit flex flex-col justify-between items-center bg-white rounded-md shadow-md px-4">
        <div className="w-full h-[6vh] border-b flex justify-between items-center pb-1">
          <p className="font-semibold text-lg text-slate-900">
            Citas pendientes
          </p>
        </div>
        <div className="w-full h-[30vh] flex flex-col justify-center items-center gap-2 rounded-md overflow-y-auto text-center">
          <p className="font-medium text-lg text-slate-900">
            Nada por aquí aún
          </p>
          <p className="font-light text-sm text-slate-500">
            No tienes citas para esta fecha aún en la plataforma, te
            recomendamos crear{" "}
            <Link href="/services" className="font-semibold text-primary">
              servicios
            </Link>{" "}
            para exponerte a los pacientes
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-[58vh] flex flex-col justify-between items-center bg-white rounded-md shadow-md p-4">
      <div className="w-full h-[6vh] border-b flex justify-between items-center pb-1">
        <p className="font-semibold text-lg text-slate-900">Citas pendientes</p>
      </div>
      <div className="w-full h-[40vh] flex flex-col justify-between items-center gap-4 rounded-md overflow-y-auto">
        {[...(appointments as Array<any>)].map((date, i) => (
          <DateComponent data={date} key={i} />
        ))}
      </div>
      <Link
        href={"/dashboard"}
        className="w-full transition p-[10px_50px] rounded cursor-pointer text-[13px] text-center bg-white font-semibold text-primary hover:bg-primary hover:text-white"
      >
        Ver todo
      </Link>
    </div>
  );
}
