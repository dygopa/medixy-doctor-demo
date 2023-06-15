import clsx from "clsx";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import {
  DashboardContext,
  IDashboardContext,
} from "../context/DashboardContext";
import { useContext, useEffect, useState } from "react";

export default function MedicalConsultationCalendar() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getCompletedAppointments, getSubject, getPendingAppointments } =
    actions;

  const { data: completedAppointments, loading: loadingCompletedAppointments } =
    state.getCompletedAppointments;
  const { data: patients, loading: loadingSubjects } = state.getSubjects;
  const { data: pendingAppointments, loading: loadingPendingAppointments } =
    state.getPendingAppointments;

  const [loadedData, setLoadedData] = useState(false);

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

  function loadData() {
    getCompletedAppointments()(dispatch);
    getSubject()(dispatch);
    getPendingAppointments()(dispatch);
    setLoadedData(true);
  }

  useEffect(() => {
    loadData();
  }, [loadedData]);

  return (
    <div
      className={clsx([
        "w-full lg:h-[320px] flex flex-col grid-cols-3 justify-start items-start px-4 py-2 gap-8 bg-white rounded-md shadow-md ",
      ])}
    >
      <div className="w-full flex flex-col gap-1">
        <p className="font-semibold text-lg text-slate-900">Resumen</p>
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
          label={"Citas pendientes"}
        >
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-green-200 text-green-800 text-xl">
            <MdOutlineNotificationsActive />
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
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-yellow-200 text-yellow-800 text-xl">
            <BsCalendarDate />
          </div>
        </StatComponent>
        <StatComponent value={0} label={"Pacientes"}>
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-red-200 text-red-800 text-xl">
            <FiUser />
          </div>
        </StatComponent>
      </div>
    </div>
  );
}
