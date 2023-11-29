import Button from "(presentation)/components/core/BaseComponents/Button";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import Link from "next/link";
import { AppointmentEnum } from "(presentation)/(enum)/appointment/appointmentEnum";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";
import {
  getFullDate,
  getSubjectAge,
  getSubjectAgeType,
} from "(presentation)/(helper)/dates/datesHelper";
import { Menu, Transition } from "@headlessui/react";
import Lucide from "../../BaseComponents/Lucide";
import RescheduleModal from "(presentation)/components/Schedule/Side/RescheduleModal/RescheduleModal";

function AppointmentDetail({
  user,
  cancelFuntion,
  customRef,
}: {
  user: IUser;
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    deleteAppointment,
    changeStatusPopup,
    changeTypePopup,
    appointmentDetail,
    cancelAppointment: cancelAppointmentAction,
  } = actions;
  const { data, loading, successful, error } = state.appointmentDetail;
  const { data: cancelAppointment } = state.cancelAppointment;
  const {
    data: deleteData,
    loading: deleteLoading,
    successful: successfulDelete,
    error: errorDelete,
  } = state.deleteAppointment;

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  useEffect(() => {
    setShowRescheduleModal(false);
  }, []);

  const DataSpan = ({ label, value }: { label: String; value: String }) => {
    return (
      <div className="flex flex-col justify-center items-start gap-1 text-left box-border">
        <p className="font-light text-sm text-slate-500">{label}</p>
        <p className="font-semibold text-base text-slate-900">{value}</p>
      </div>
    );
  };

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
      <div className="w-full flex items-center gap-2">
        <p className="font-light text-sm text-gray-500">{text}</p>
        <span className={twMerge(["w-2 h-2 rounded-full", color])}></span>
      </div>
    );
  };

  useMemo(() => {
    if (successfulDelete || errorDelete) cancelFuntion();
  }, [successfulDelete, errorDelete]);

  return (
    <>
      {showRescheduleModal && (
        <RescheduleModal
          user={user}
          appointment={data}
          showRescheduleModal={showRescheduleModal}
          setShowRescheduleModal={setShowRescheduleModal}
        />
      )}

      <div className="w-full md:w-[600px] lg:w-[700px] h-auto overflow-y-auto bg-white lg:rounded-md p-6 pb-0 gap-8">
        <div className="w-full flex justify-between gap-0">
          <div className="w-full flex">
            <div className="w-full flex gap-0">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex flex-col justify-center items-center text-lg overflow-hidden">
                  <Lucide icon="account" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-0 text-left ml-4">
                <p className="font-semibold text-base text-slate-900">
                  {data["nombres"]} {data["primerApellido"]}{" "}
                  {data["segundoApellido"]}
                </p>
                <p className="font-light text-sm text-slate-500">
                  Edad: {getSubjectAge(data["fechaNacimiento"])}{" "}
                  {getSubjectAgeType(data["fechaNacimiento"]) === "years"
                    ? "años"
                    : getSubjectAgeType(data["fechaNacimiento"]) === "days"
                    ? "días"
                    : "meses"}
                </p>
                <p className="font-light text-sm text-slate-500">
                  CURP: {data["curp"] ?? "-"}
                </p>
                <StatusComponent data={data} />
              </div>
            </div>

            {data["estado"] === AppointmentEnum.PENDING &&
              !cancelAppointment && (
                <div className="flex justify-end">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="rounded-lg hover:bg-gray-100 p-1">
                      <Lucide icon="dots-vertical" className="h-7" />
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
                        <Menu.Item>
                          {({ active }) => (
                            <div>
                              <button
                                type="button"
                                className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                                onClick={() => setShowRescheduleModal(true)}
                              >
                                <Lucide
                                  icon="calendar-clock-outline"
                                  size={20}
                                />
                                Reagendar cita
                              </button>
                            </div>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <div>
                              <button
                                type="button"
                                className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                                onClick={() => {
                                  cancelAppointmentAction(true)(dispatch);
                                  appointmentDetail({
                                    ...data,
                                    appoinmentId: data["appoinmentId"],
                                  })(dispatch);
                                  changeStatusPopup(true)(dispatch);
                                  changeTypePopup(2)(dispatch);
                                }}
                              >
                                <div>
                                  <Lucide icon="close-box-outline" size={20} />
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
              )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-5 mt-12">
          {cancelAppointment ? (
            <div>
              <div className="mb-4">
                <h2 className="text-center font-semibold text-base text-slate-900">
                  ¿Estás seguro que deseas cancelar esta cita?
                </h2>
              </div>

              <div>
                <p className="text-center">
                  Al cancelar la cita, la misma no podrá ser atendida y se
                  notificará al paciente de tu cancelación.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                <DataSpan label={"Servicio"} value={data["nombre"]} />
                <DataSpan
                  label={"Consultorio"}
                  value={
                    data["Localidades"] ? data["Localidades"]["nombre"] : "-"
                  }
                />
              </div>
              <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                <DataSpan label={"Tipo de cita"} value={"Primera vez"} />
              </div>
              <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                <DataSpan
                  label={"Correo electrónico"}
                  value={data["email"] ?? "-"}
                />
                <DataSpan label={"Teléfono"} value={data["telefono"] ?? "-"} />
              </div>
              <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                <DataSpan
                  label={"Para cuando"}
                  value={getFullDate(new Date(data["fechaReserva"]))}
                />
                <DataSpan
                  label={"A las"}
                  value={moment(data["fechaReserva"]).utc().format("hh:mm a")}
                />
              </div>
              <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                <DataSpan
                  label={"Quien hizo la cita"}
                  value={`${
                    data["creadoPorDoctor"]
                      ? `Dr/a ${user.names} ${user.firstName}`
                      : `${data["nombres"]} ${data["primerApellido"]}`
                  } `}
                />
              </div>
            </>
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white mt-12 mb-4">
          <div className="w-full">
            {cancelAppointment ? (
              <>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    deleteAppointment(data.appoinmentId)(dispatch);
                  }}
                >
                  {deleteLoading ? "Cancelando cita..." : "Cancelar cita"}
                </Button>
              </>
            ) : (
              <Link
                href={{
                  pathname: "/medical-record/" + data["appoinmentId"],
                  query: {
                    type: "appointment",
                  },
                }}
              >
                <Button variant="primary" className="w-full">
                  {data["estado"] === AppointmentEnum.COMPLETE
                    ? "Expediente del paciente"
                    : "Atender paciente"}
                </Button>
              </Link>
            )}
          </div>
          <p
            onClick={
              cancelAppointment
                ? () => {
                    cancelAppointmentAction(false)(dispatch);
                  }
                : () => {
                    cancelFuntion();
                  }
            }
            className="cursor-pointer font-normal text-sm text-primary text-center"
          >
            {cancelAppointment ? "Volver" : "Cerrar"}
          </p>
        </div>
      </div>
    </>
  );
}

export default AppointmentDetail;
