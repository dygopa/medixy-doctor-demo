import Button from "(presentation)/components/core/BaseComponents/Button";
import React, { useContext, useMemo, useState } from "react";

import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { AppointmentEnum } from "(presentation)/(enum)/appointment/appointmentEnum";
import { IScheduleContext, ScheduleContext } from "(presentation)/components/Schedule/context/ScheduleContext";

function AppointmentDetail({
  cancelFuntion,
  customRef,
}: {
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state } = useContext<IScheduleContext>(ScheduleContext);
  const { data, loading, successful, error } = state.appointmentDetail;

  const [ageBirth, setAgeBirth] = useState(0);

  const DataSpan = ({ label, value }: { label: String; value: String }) => {
    return (
      <div className="flex flex-col justify-center items-start gap-1 text-left box-border">
        <p className="font-light text-sm text-slate-500">{label}</p>
        <p className="font-semibold text-base text-slate-900">{value}</p>
      </div>
    );
  };

  const StatusComponent = () => {
    let status = data["estado"];

    let color =
      status === AppointmentEnum.PENDING ||
      status === AppointmentEnum.NOT_AVAILABLE ||
      status === AppointmentEnum.APPROVED
        ? "bg-yellow-500"
        : "bg-green-500";
    let text =
      status === AppointmentEnum.PENDING ||
      status === AppointmentEnum.NOT_AVAILABLE ||
      status === AppointmentEnum.APPROVED
        ? "Por atender"
        : "Completada";

    return (
      <div className="w-full flex justify-start items-center gap-2">
        <p className="font-light text-sm text-gray-700">{text}</p>
        <span className={twMerge(["w-3 h-3 rounded-full", color])}></span>
      </div>
    );
  };

  function formatDateBirth() {
    var years = moment()
      .utc()
      .diff(moment(data["fechaNacimiento"], "YYYY-MM-DD"), "years");
    setAgeBirth(years);
  }

  useMemo(() => {
    if (successful) formatDateBirth();
  }, [successful]);

  return (
    <div
      ref={customRef}
      className="w-full md:w-[35%] lg:w-[35%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8"
    >
      <p className="font-bold text-2xl text-slate-900">Cita</p>
      <div className="w-full flex justify-between items-center gap-2">
        <div className="w-1/4 flex justify-center items-center">
          <div className="w-20 h-20 rounded-lg bg-primary/20 text-primary flex flex-col justify-center items-center text-lg overflow-hidden">
            <FiUser />
          </div>
        </div>
        <div className="w-3/4 flex flex-col justify-center items-start gap-1 text-left">
          <p className="font-semibold text-base text-slate-900">
            {data["nombres"]} {data["primerApellido"]} {data["segundoApellido"]}
          </p>
          <p className="font-light text-sm text-slate-500">
            Edad: {ageBirth} años
          </p>
          <p className="font-light text-sm text-slate-500">
            CURP: {data["curp"] ?? "-"}
          </p>
          <StatusComponent />
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-5">
        <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
          <DataSpan label={"Tipo de consulta"} value={data["nombre"]} />
          <DataSpan label={"Consultorio"} value={"-"} />
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
          <DataSpan label={"Tipo de cita"} value={"Primera vez"} />
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
          <DataSpan label={"Correo electrónico"} value={data["email"] ?? "-"} />
          <DataSpan label={"Teléfono"} value={data["telefono"] ?? "-"} />
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
          <DataSpan
            label={"Para cuando"}
            value={moment(data["fechaReserva"]).utc().format("DD-MM-YYYY")}
          />
          <DataSpan
            label={"A las"}
            value={moment(data["fechaReserva"]).utc().format("hh:mm a")}
          />
        </div>
        <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
          <DataSpan
            label={"Quien hizo la cita"}
            value={`${user.names} ${user.lastName}`}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <div className="w-full">
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
        </div>
        <p
          onClick={() => {
            cancelFuntion();
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Volver
        </p>
      </div>
    </div>
  );
}

export default AppointmentDetail;
