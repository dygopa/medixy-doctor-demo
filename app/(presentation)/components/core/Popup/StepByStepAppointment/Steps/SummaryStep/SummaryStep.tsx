import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import {
  IStepByStepAppointmentContext,
  StepByStepAppointmentContext,
} from "../../context/StepByStepAppointmentContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import moment from "moment";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";
import {
  get12HoursFormat,
  getFullDate,
} from "(presentation)/(helper)/dates/datesHelper";

const SummaryStep = ({
  user,
  appointment,
  setAppointment,
  from,
}: {
  user: IUser;
  appointment: any;
  setAppointment: Dispatch<SetStateAction<{}>>;
  from: "SCHEDULE" | "MEDICAL_RECORD";
}) => {
  const {
    actions: actionsSchedule,
    state: scheduleState,
    dispatch: dispatchSchedule,
  } = useContext<IScheduleContext>(ScheduleContext);

  const { getAppointments, changeStatusPopup, getCalendarEvents } =
    actionsSchedule;

  const { state, actions, dispatch } =
    useContext<IStepByStepAppointmentContext>(StepByStepAppointmentContext);
  const { setStep, createAppointment } = actions;

  const { data, loading, successful, error } = state.appointmentCreation;
  console.log(data);
  console.log(appointment);

  const { data: activeLocality } = scheduleState.activeLocality;
  const { data: actualDay } = scheduleState.actualDay;
  const { data: activeDay } = scheduleState.activeDay;

  const GroupLabelValue = ({ label, value }: { label: any; value: any }) => {
    return (
      <div className="flex flex-col gap-1 text-left justify-center items-left">
        <p className="font-light text-sm text-slate-500">{label}</p>
        <p className="font-semibold text-base text-slate-900">{value}</p>
      </div>
    );
  };

  useMemo(() => {
    if (successful) {
      changeStatusPopup(false)(dispatchSchedule);
      setStep(0)(dispatch);
      if (from === "MEDICAL_RECORD" && !appointment["isNow"]) {
        console.log("redirect");
        console.log(data);
        window.location.href = `/medical-record/${data["id"]}?type=appointment&appointment_create=true`;
      }
      if (appointment["isNow"]) {
        setTimeout(() => {
          window.location.href = `/medical-record/${data["id"]}/create?type=appointment`;
        }, 1000);
      } else {
        getCalendarEvents(
          user.userId,
          activeLocality["id"],
          moment(activeDay["start"]).format("YYYY-MM-DD"),
          moment(activeDay["end"], "YYYY-MM-DD").format("YYYY-MM-DD")
        )(dispatchSchedule);
        getAppointments(
          user.userId,
          moment(actualDay).format("YYYY-MM-DD"),
          moment(actualDay).add(1, "day").format("YYYY-MM-DD"),
          appointment["localityId"]
        )(dispatchSchedule);
      }
      setAppointment({
        localityId: activeLocality.id,
      });
    }
  }, [successful]);

  console.log(appointment);

  return (
    <div className={"w-full h-fit relative flex flex-col gap-5"}>
      <div className="w-full grid grid-cols-2 justify-between items-start gap-2">
        <GroupLabelValue
          label={"Para el día"}
          value={
            appointment["isNow"]
              ? "En este momento"
              : getFullDate(new Date(appointment.date?.fechaInicio))
          }
        />
        <GroupLabelValue
          label={"A las"}
          value={
            appointment["isNow"]
              ? "Ahora mismo"
              : moment(appointment.date?.fechaInicio).utc().format("hh:mm a")
          }
        />
        <GroupLabelValue
          label={"Para el paciente"}
          value={
            appointment["patient"]["title"] ?? appointment["patient"]["name"]
          }
        />
        <GroupLabelValue
          label={"En"}
          value={appointment["locality"]["title"]}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={loading}
          onClick={() => {
            createAppointment(
              {
                id: appointment["attentionWindowId"],
                fechaReserva: appointment["isNow"]
                  ? ""
                  : appointment.date?.fechaInicio,
                servicioId: appointment["serviceId"],
                pacienteId: appointment["patient"]["patientId"],
                patient: appointment["patient"],
                doctorId: user.userId,
                doctor: user,
                nombreServicio: appointment["service"]["title"],
                direccion: appointment["locality"]["description"],
              },
              appointment["isNow"] ?? false
            )(dispatch);
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          {loading ? "Agendando..." : "Agendar"}
        </Button>
        <p
          onClick={() => {
            setStep(2)(dispatch);
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Regresar
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
