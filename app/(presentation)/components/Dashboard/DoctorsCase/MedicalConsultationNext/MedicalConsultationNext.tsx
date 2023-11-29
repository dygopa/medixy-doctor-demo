import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";
import {
  DashboardContext,
  IDashboardContext,
} from "../context/DashboardContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "domain/core/entities/userEntity";
import moment from "moment";
import { actions } from "../MedicalConsultationList/context/MedicalConsultationListActions";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export default function MedicalConsultationNext({ user }: { user: IUser }) {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);

  const { data, loading, error, successful } = state.getLatestAppointment;
  const { getLatestAppointment } = actions;

  useMemo(() => {
    if (user.userId) getLatestAppointment(user.userId)(dispatch);
  }, [user.userId]);

  const LoadingAppointment = () => {
    return (
      <div className="w-full h-full lg:flex md:flex sm:flex block justify-between items-start gap-4 p-5 bg-white rounded-md shadow-md">
        <div className="w-[10%] flex flex-col justify-start items-start">
          <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
            <Lucide icon="at" />
          </span>
        </div>
        <div className="w-[90%] h-full flex flex-col justify-between items-center">
          <p>Cargando...</p>
        </div>
      </div>
    );
  };

  const LastOne = () => {
    let appointment: any = data !== null ? data : {};
    let hour = moment(appointment["fechaReserva"])
      .utc()
      .format("hh:mm a")
      .toString();

    return (
      <div className="w-full h-full lg:flex md:flex sm:flex block justify-between items-start gap-4 p-5 bg-white rounded-md shadow-md">
        <div className="w-[10%] flex flex-col justify-start items-start">
          <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
            <Lucide icon="at" />
          </span>
        </div>
        <div className="w-[90%] h-full flex flex-col justify-between items-start">
          <div className="w-full flex justify-start items-center gap-1">
            <p className="font-light text-sm text-slate-500">
              Próxima Consulta
            </p>
            <p className="font-light text-sm text-slate-500">-</p>
            <p className="font-medium text-base text-slate-900">{hour}</p>
          </div>
          <div className="mb-4 mt-2">
            <p className="font-medium text-lg text-slate-900 text-ellipsis overflow-hidden whitespace-nowrap xl:max-w-[400px] lg:max-w-[300px] md:max-w-[300px] max-w-[300px]">
              {appointment["nombres"]} {appointment["primerApellido"]}
            </p>
            <p className="font-light text-sm text-slate-500">
              {" "}
              {appointment["nombre"] ?? ""}
            </p>
          </div>
          <Link
            className="w-full"
            href={{
              pathname: "/medical-record/" + appointment["id"],
              query: {
                type: "appointment",
              },
            }}
          >
            <Button variant="primary" className="w-full">
              Atender
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const EmptyState = () => {
    return (
      <div className="w-full h-full lg:flex md:flex sm:flex block items-start gap-4 p-5 bg-white rounded-md shadow-md">
        <div className="w-[10%] flex flex-col justify-start items-start lg:mb-0 md:mb-0 sm:mb-0 mb-4">
          <span className="w-[2.5rem] h-[2.5rem] bg-yellow-200 text-yellow-500 rounded-md flex flex-col justify-center items-center text-xl">
            <Lucide icon="at" />
          </span>
        </div>
        <div className="w-[90%] h-full flex flex-col items-start text-left">
          <p className="font-light text-sm text-slate-500">Próxima consulta</p>
          <p className="font-medium text-lg text-slate-900">
            Nada por aquí aún
          </p>
          <p className="font-light text-sm text-slate-500">
            No tienes próximas citas aún en la plataforma.
          </p>
        </div>
      </div>
    );
  };

  return loading ? (
    <LoadingAppointment />
  ) : successful && data ? (
    <LastOne />
  ) : (
    <EmptyState />
  );
}
