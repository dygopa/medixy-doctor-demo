import { getFullDate } from "(presentation)/(helper)/dates/datesHelper";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { FiUser } from "react-icons/fi";

interface ISummaryProps {
  patient: any;
  appointment: any;
  newAppointment: any;
  setStep: Function;
}

export default function Summary({
  patient,
  appointment,
  newAppointment,
  setStep,
}: ISummaryProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { rescheduleAppointment } = actions;
  const { loading, error, successful } = state.rescheduleAppointment;

  const [isBlockAppointment, setIsBlockAppointment] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ageBirth, setAgeBirth] = useState(0);

  function formatDateBirth() {
    var years = moment()
      .utc()
      .diff(moment(patient["fechaNacimiento"], "YYYY-MM-DD"), "years");
    setAgeBirth(years);
  }

  useMemo(() => {
    if (patient) formatDateBirth();
  }, [patient]);

  let hour = moment(appointment["fechaReserva"])
    .utc()
    .format("hh:mm a")
    .toString();

  let newHour = moment(newAppointment["fechaInicio"])
    .utc()
    .format("hh:mm a")
    .toString();

  useMemo(() => {
    if (successful === true){
      console.log(successful)
      //setStep(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useMemo(() => {
    if (error) {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      <div className="w-full flex justify-start items-center gap-2 mb-8">
        <div className="flex justify-center items-center">
          <div className="w-20 h-20 rounded-lg bg-primary/20 text-primary flex flex-col justify-center items-center text-lg overflow-hidden">
            <FiUser />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-1 text-left">
          <p className="font-semibold text-base text-slate-900">
            {patient["nombres"]} {patient["primerApellido"]}{" "}
            {patient["segundoApellido"]}
          </p>
          <p className="font-light text-sm text-slate-500">
            Edad: {ageBirth} años
          </p>
          <p className="font-light text-sm text-slate-500">
            CURP: {patient["curp"] ?? "-"}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2 mb-12">
        <p className="font-normal text-sm text-slate-600">
          Fecha y hora de la cita
        </p>
        <p className="font-bold text-sm text-slate-600">
          {getFullDate(new Date(newAppointment.fechaInicio))}, a las {newHour}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2 mb-12">
        <p className="font-normal text-sm text-slate-600">
          Fecha y hora de la cita anterior
        </p>
        <p className="font-bold text-sm text-slate-600">
          {getFullDate(new Date(appointment.fechaReserva))}, a las {hour}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 mt-36 bg-white">
        <Button
          disabled={loading}
          onClick={() =>{
            rescheduleAppointment({
              appointmentId: appointment.id,
              newAppointmentId: newAppointment.id,
              isBlockAppointment: isBlockAppointment,
            })(dispatch)
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Reagendar
        </Button>
        <p
          onClick={() => {
            setStep(0);
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Regresar
        </p>
      </div>
    </div>
  );
}
