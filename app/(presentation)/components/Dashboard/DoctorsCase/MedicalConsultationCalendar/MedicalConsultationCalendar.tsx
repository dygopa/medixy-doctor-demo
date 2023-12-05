import clsx from "clsx";
import {
  DashboardContext,
  IDashboardContext,
} from "../context/DashboardContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "domain/core/entities/userEntity";
import moment from "moment";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export default function MedicalConsultationCalendar({ user }: { user: IUser }) {
  const { state } = useContext<IDashboardContext>(DashboardContext);

  const { data: completedAppointments, loading: loadingCompletedAppointments } =
    state.getCompletedAppointments;
  const { data: patients, loading: loadingSubjects } = state.getSubjects;
  const { data: pendingAppointments, loading: loadingPendingAppointments } =
    state.getPendingAppointments;

  const StatComponent = ({
    children,
    value,
    label,
  }: {
    children: any;
    value: number;
    label: string;
  }) => {
    return (
      <div className="h-full flex flex-col  items-start gap-2">
        {children}
        <div className="mt-4">
          <p className="font-semibold text-2xl text-slate-900">{value}</p>
          <p className="font-light text-base text-slate-500">{label}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={clsx([
        "w-full lg:h-[320px] flex flex-col grid-cols-3 justify-start items-start px-5 py-2 gap-8 bg-white rounded-md shadow-md ",
      ])}
    >
      <div className="w-full flex flex-col justify-center gap-1">
        <p className="font-medium text-base text-slate-900">Resumen</p>
        <p className="font-light text-sm text-slate-500">
          Para mejorar tus estadísticas en la plataforma puedes configurar tus
          consultorios y asignarles servicios para de esa manera ser visible en
          el marketplace de pacientes
        </p>
      </div>
      <div
        className={clsx([
          "w-full h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 justify-between items-center mt-6",
        ])}
      >
        <StatComponent
          value={
            loadingPendingAppointments
              ? 0
              : (pendingAppointments as any[])?.length
          }
          label={"Citas pendientes hoy"}
        >
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-yellow-200 text-yellow-800 text-xl">
            <Lucide icon="medical-bag" />
          </div>
        </StatComponent>
        <StatComponent
          value={
            loadingCompletedAppointments
              ? 0
              : (completedAppointments as any[])?.length
          }
          label={"Citas completadas"}
        >
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-green-200 text-green-800 text-xl">
            <Lucide icon="calendar-clock-outline" />
          </div>
        </StatComponent>
        <StatComponent
          value={loadingSubjects ? 0 : (patients as any[])?.length}
          label={"Pacientes"}
        >
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-red-200 text-red-800 text-xl">
            <Lucide icon="account-group" />
          </div>
        </StatComponent>
      </div>
    </div>
  );
}
