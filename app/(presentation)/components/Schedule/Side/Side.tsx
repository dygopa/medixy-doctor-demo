import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import React, {
  Fragment,
  MouseEventHandler,
  useContext,
  useMemo,
  useState,
} from "react";
import { IScheduleContext, ScheduleContext } from "../context/ScheduleContext";
import moment from "moment";
import "moment/locale/es";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Loading from "(presentation)/components/core/Loading/Loading";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FiUser } from "react-icons/fi";
import { AppointmentEnum } from "(presentation)/(enum)/appointment/appointmentEnum";
import { Menu, Transition } from "@headlessui/react";
import RescheduleModal from "./RescheduleModal/RescheduleModal";

const StatusComponent = ({ data }: { data: any }) => {
  let status = data["estado"];

  let text = "";
  let color = "";

  if (status === AppointmentEnum.NOT_AVAILABLE) {
    text = "No disponible";
    color = "bg-yellow-500";
  }

  if (
    status === AppointmentEnum.APPROVED &&
    moment(data["fechaReserva"]).isBefore(moment().utc(true))
  ) {
    text = "No asistió";
    color = "bg-slate-200";
  }
  if (
    status === AppointmentEnum.PENDING &&
    moment(data["fechaReserva"]).isBefore(moment().utc(true))
  ) {
    text = "No asistió";
    color = "bg-slate-200";
  }

  if (
    status === AppointmentEnum.APPROVED &&
    moment(data["fechaReserva"]).isAfter(moment().utc(true))
  ) {
    text = "Aprovada";
    color = "bg-yellow-500";
  }
  if (
    status === AppointmentEnum.PENDING &&
    moment(data["fechaReserva"]).isAfter(moment().utc(true))
  ) {
    text = "Por atender";
    color = "bg-yellow-500";
  }

  if (status === AppointmentEnum.CANCELED) {
    text = "Cancelada";
    color = "bg-red-500";
  }
  if (status === AppointmentEnum.COMPLETE) {
    text = "Completada";
    color = "bg-green-500";
  }
  if (status === AppointmentEnum.PROCESSING) {
    text = "En curso";
    color = "bg-green-500";
  }

  return (
    <div className="w-full flex justify-end items-center gap-2">
      <p className="font-light text-[12px] text-gray-700 w-full">{text}</p>
      <span className={twMerge(["w-2 h-2 rounded-full", color])}></span>
    </div>
  );
};

const AppointmentComponent = ({
  onClick,
  data,
  cancelAppointment,
}: {
  onClick: MouseEventHandler;
  data: any;
  cancelAppointment: MouseEventHandler;
}) => {
  let isPending = data["estado"] === 1;
  let hour = moment(data["fechaReserva"]).utc().format("hh:mm a").toString();

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  return (
    <>
      <div className="cursor-pointer relative w-full min-h-[11vh] h-fit max-h-[14vh] bg-white flex justify-between items-center p-3 gap-2 box-border rounded-md shadow-sm">
        <div className="w-full flex justify-end absolute top-1 right-1">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="rounded-lg hover:bg-gray-100 p-1">
              <Lucide icon="MoreVertical" className="h-5" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-15 mt-1 w-44 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                {data["estado"] === AppointmentEnum.PENDING && (
                  <Menu.Item>
                    {({ active }) => (
                      <div>
                        <button
                          type="button"
                          className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                          onClick={() => setShowRescheduleModal(true)}
                        >
                          <Lucide icon="CalendarClock" size={20} />
                          Reagendar cita
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                )}

                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <button
                        type="button"
                        className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                        onClick={cancelAppointment}
                      >
                        <div>
                          <Lucide icon="XSquare" size={20} />
                        </div>

                        <div>Cancelar cita</div>
                      </button>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div
          onClick={onClick}
          className="flex justify-between items-center gap-2 w-full"
        >
          <div className="w-10 h-full flex flex-col justify-center items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex flex-col justify-center items-center text-lg overflow-hidden">
              <FiUser />
            </div>
          </div>
          <div className="w-[53%] h-full flex flex-col justify-between items-start overflow-hidden">
            <p className="font-semibold text-sm text-slate-900 w-full whitespace-nowrap text-ellipsis">
              {data["nombres"]} {data["primerApellido"]}
            </p>
            <p className="font-light text-[12px] text-slate-500 w-full whitespace-nowrap text-ellipsis">
              {data["nombre"]}
            </p>
          </div>
          <div className="w-[30%] h-full flex flex-col justify-between items-end mt-2">
            <div className="w-full flex justify-end items-center gap-1 overflow-hidden">
              <p className="font-semibold text-[12px] text-slate-900 whitespace-nowrap text-ellipsis">
                {hour}
              </p>
              {/* <Lucide icon="MoreVertical" className="w-5 h-5 text-slate-500" /> */}
            </div>
            <StatusComponent data={data} />
          </div>
        </div>
      </div>

      {showRescheduleModal && (
        <RescheduleModal
          appointment={data}
          showRescheduleModal={showRescheduleModal}
          setShowRescheduleModal={setShowRescheduleModal}
        />
      )}
    </>
  );
};

const Side = () => {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    getAppointments,
    changeStatusPopup,
    changeTypePopup,
    appointmentDetail,
    cancelAppointment,
  } = actions;
  const { data, loading, successful, error } = state.getAppointments;
  const {
    successful: localitySuccessful,
    error: localityError,
    data: locality,
  } = state.activeLocality;
  const { data: activeDay, successful: changedActiveDay } = state.activeDay;
  const { data: actualDay } = state.actualDay;
  const { successful: deleteAppointmentSuccessful } = state.deleteAppointment;

  useMemo(() => {
    if (localitySuccessful) {
      getAppointments(
        user.userId,
        moment(activeDay["start"]).format("YYYY-MM-DD"),
        moment(activeDay["end"]).format("YYYY-MM-DD"),
        locality["id"],
        true
      )(dispatch);
    }
  }, [activeDay, locality, deleteAppointmentSuccessful]);

  useMemo(() => {
    if (actualDay)
      getAppointments(
        user.userId,
        moment(actualDay).format("YYYY-MM-DD"),
        moment(actualDay).add(1, "day").format("YYYY-MM-DD"),
        locality["id"],
        true
      )(dispatch);
  }, [actualDay]);

  return (
    <div className="w-full lg:w-1/3 flex flex-col justify-start items-center gap-3">
      <div className="w-full flex justify-between items-center">
        {moment(actualDay).day() === moment().day() &&
        moment(actualDay).month() === moment().month() &&
        moment(actualDay).year() === moment().year() ? (
          <p className="font-light text-xl text-slate-900">
            <span className="capitalize">
              {moment().locale("es").format("dddd")}
            </span>{" "}
            - {moment().format("h:mm a")}
          </p>
        ) : (
          <p className="font-light text-xl text-slate-900">
            <span className="capitalize">
              {moment(actualDay).locale("es").format("dddd")}
            </span>
          </p>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-3">
        {loading && <Loading />}
        {successful &&
          data.length > 0 &&
          data.map((elem: any) => (
            <AppointmentComponent
              data={elem}
              onClick={() => {
                appointmentDetail({ ...elem, appoinmentId: elem["id"] })(
                  dispatch
                );
                changeStatusPopup(true)(dispatch);
                changeTypePopup(2)(dispatch);
              }}
              cancelAppointment={() => {
                cancelAppointment(true)(dispatch);
                appointmentDetail({ ...elem, appoinmentId: elem["id"] })(
                  dispatch
                );
                changeStatusPopup(true)(dispatch);
                changeTypePopup(2)(dispatch);
              }}
            />
          ))}
        {successful && data.length === 0 && (
          <div className="w-full h-auto rounded-md overflow-y-auto text-center mt-8">
            <p className="font-medium text-lg text-slate-900 mb-3">
              Nada por aquí aún
            </p>
            <p className="font-light text-sm text-slate-500">
              No tienes citas para esta fecha aún en la plataforma, crea una
              consulta para hoy o revisa que tengas{" "}
              <Link href="/services" className="font-semibold text-primary">
                servicios
              </Link>{" "}
              creados para exponerte a tus pacientes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Side;
