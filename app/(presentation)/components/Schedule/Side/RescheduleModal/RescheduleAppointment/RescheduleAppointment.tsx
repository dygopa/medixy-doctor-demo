import {
  get12HoursFormat,
  getFullDate,
} from "(presentation)/(helper)/dates/datesHelper";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Loading from "(presentation)/components/core/Loading/Loading";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import AttentionWindow from "./AttentionWindow/AttentionWindow";

interface IRescheduleAppointmentProps {
  appointment: any;
  setNewAppointment: Function;
  setShowRescheduleModal: Function;
  setStep: Function;
}

export default function RescheduleAppointment({
  appointment,
  setNewAppointment,
  setShowRescheduleModal,
  setStep,
}: IRescheduleAppointmentProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { getAttentionWindowsByService, getNextAttentionWindow } = actions;

  const {
    data: attentionWindows,
    loading: loadingWindows,
    successful: loadedWindows,
    error: errorWindows,
  } = state.getAttentionWindowsByService;

  const {
    data: attentionWindow,
    loading: loadingAttentionWindow,
    successful: attentionWindowSuccessful,
  } = state.getNextAttentionWindow;

  const [isNow, setIsNow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }-${
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate()
    }`
  );
  const [windows, setWindows] = useState([]);

  const [formData, setFormData] = useState({
    service: "",
    curp: "",
    date: "",
    hour: "",
    windowId: 0,
  });

  useMemo(() => {
    if (attentionWindowSuccessful && attentionWindow?.fechaInicio) {
      setSelectedDate(moment(attentionWindow.fechaInicio).format("YYYY-MM-DD"));
      getAttentionWindowsByService(
        appointment.servicioId,
        moment(attentionWindow.fechaInicio).format("YYYY-MM-DD")
      )(dispatch);
    }

    if (attentionWindowSuccessful && !attentionWindow?.fechaInicio) {
      setSelectedDate(moment().format("YYYY-MM-DD"));
      getAttentionWindowsByService(
        appointment.servicioId,
        moment().format("YYYY-MM-DD")
      )(dispatch);
    }
  }, [attentionWindowSuccessful]);

  useMemo(() => {
    if (loadedWindows) setWindows(attentionWindows);
  }, [loadingWindows]);

  useMemo(() => {
    setWindows([]);
  }, []);

  useMemo(() => {
    getNextAttentionWindow({ serviceId: appointment.servicioId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let hour = moment(appointment["fechaReserva"])
    .utc()
    .format("hh:mm a")
    .toString();

  function formatHour(value: number) {
    let h: string = value.toString();
    let divided = h.split("");

    let hours =
      divided.length > 3 ? `${divided[0]}${divided[1]}` : `0${divided[0]}`;
    let minutes =
      divided.length > 3
        ? `${divided[2]}${divided[3]}`
        : `${divided[1]}${divided[2]}`;

    return { hours, minutes };
  }

  const ExampleComponent = ({ data }: { data: any }) => {
    let isSelected = formData["windowId"] === data["id"];
    let date = moment(data["fechaInicio"]).locale("es").format("dddd");
    let normalDate = moment(data["fechaInicio"]).format("DD-MM-YYYY");

    let { hours: startHour, minutes: startMinutes } = formatHour(
      data["horaInicio"]
    );
    let { hours: endHour, minutes: endMinutes } = formatHour(data["horaFin"]);
    let isActualHour = data["tipo"] === 2;

    return (
      <div
        onClick={() => {
          setFormData({ ...formData, windowId: data["id"] });
          setNewAppointment(data);
        }}
        className={twMerge([
          "transition cursor-pointer w-full border rounded-md p-3 flex flex-col justify-between items-start h-fit gap-3 relative",
          isSelected ? "border-green-500" : "border-slate-300",
        ])}
      >
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-medium text-slate-900 capitalize">
            {date} - {normalDate}
          </p>
          <span
            className={twMerge([
              "transition w-6 h-6  rounded-full flex justify-center items-center text-white text-sm relative border",
              isSelected
                ? "bg-green-500 border-green-500"
                : "bg-transparent border-slate-300",
            ])}
          >
            {isSelected && <Lucide icon="check-circle-outline" color="#fff" />}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          {isActualHour ? (
            <p>
              {`${moment(data["fechaInicio"]).utc().format("hh:mm a")}`} -{" "}
              {`${moment(data["fechaFin"]).utc().format("hh:mm a")}`}
            </p>
          ) : (
            <p>
              {`${startHour}:${startMinutes}`} - {`${endHour}:${endMinutes}`}
            </p>
          )}
          <span
            className={twMerge([
              "w-fit h-fit px-5 py-1 rounded font-medium text-xs",
              data["tipo"] === 2
                ? "bg-yellow-400/30 text-yellow-800"
                : "bg-green-400/30 text-green-800",
            ])}
          >
            {data["tipo"] === 2 ? "Por espacios" : "Libre"}
          </span>
        </div>
      </div>
    );
  };

  if (loadingAttentionWindow || loadingWindows)
    return (
      <div className="mt-20">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-start gap-2 mb-6">
        <p className="font-normal text-sm text-slate-600">
          Fecha y hora actual de la cita
        </p>

        <p className="font-bold text-sm text-slate-600">
          {getFullDate(new Date(appointment.fechaReserva))}, a las {hour}
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="font-normal text-sm text-slate-600">Para cuando</p>
        {/* <div className="w-full grid grid-cols-2 justify-between items-center gap-5">
          <div
            className={twMerge([
              "cursor-pointer border py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
              !isNow
                ? "bg-green-500 text-white border-green-500"
                : "bg-transparent text-secondary border-secondary",
            ])}
            onClick={() => {
              setIsNow(false);
            }}
          >
            En otro momento
            {!isNow && <FiCheck />}
          </div>

          <div
            className={twMerge([
              "cursor-pointer border py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
              isNow
                ? "bg-green-500 text-white border-green-500"
                : "bg-transparent text-secondary border-secondary",
            ])}
            onClick={() => {
              setIsNow(true);
            }}
          >
            Ahora mismo
            {isNow && <FiCheck />}
          </div>
        </div>*/}
        {!isNow && (
          <FormInput
            type={"date"}
            min={moment().format("YYYY-MM-DD")}
            disabled={isNow}
            placeholder={""}
            value={selectedDate}
            className="form-control mt-3"
            onChange={(e) => {
              getAttentionWindowsByService(
                appointment.servicioId,
                e.target.value
              )(dispatch);
              setSelectedDate(e.target.value);
            }}
          />
        )}
      </div>
      {!isNow && (
        <div className="w-full flex flex-col justify-center items-start gap-2 mt-8">
          <p className="font-normal text-sm text-slate-600">
            Ventanas de atención
          </p>
          {
            <div className="w-full flex flex-col justify-start items-center gap-6 max-h-[350px] overflow-y-auto">
              {!loadedWindows && !loadingWindows && (
                <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
                  <p className="text-base text-slate-900 font-medium">
                    Nada por aquí
                  </p>
                  <p className="text-sm text-slate-500 font-light">
                    Seleccina una fecha para conocer las disponibilidades
                  </p>
                </div>
              )}
              {loadedWindows && windows.length === 0 && (
                <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
                  <p className="text-base text-slate-900 font-medium">
                    Sin ventanas de atención
                  </p>
                  <p className="text-sm text-slate-500 font-light">
                    No hay ventanas de atención disponibles para esta fecha y
                    este servicio
                  </p>
                </div>
              )}

              {loadedWindows &&
                windows.length > 0 &&
                windows.map((elem: any) => (
                  <AttentionWindow
                    key={elem.id}
                    data={elem}
                    formData={formData}
                    setFormData={setFormData}
                    setNewAppointment={setNewAppointment}
                  />
                ))}
            </div>
          }
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 mt-36 bg-white">
        <Button
          disabled={formData.windowId === 0}
          onClick={() => setStep(1)}
          variant="primary"
          type="button"
          className="w-full"
        >
          Continuar
        </Button>
        <p
          onClick={() => {
            setShowRescheduleModal(false);
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Cancelar
        </p>
      </div>
    </div>
  );
}
