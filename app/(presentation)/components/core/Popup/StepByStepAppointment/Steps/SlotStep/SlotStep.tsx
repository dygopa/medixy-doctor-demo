import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';
import React, { useContext, useMemo, useState, Dispatch, SetStateAction, useEffect} from 'react'
import { IStepByStepAppointmentContext, StepByStepAppointmentContext } from '../../context/StepByStepAppointmentContext';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';
import { FiCheck } from 'react-icons/fi';
import Loading from '(presentation)/components/core/Loading/Loading';
import Button from '(presentation)/components/core/BaseComponents/Button';
import { FormInput } from '(presentation)/components/core/BaseComponents/Form';

const SlotStep = ({
  appointment,
  setAppointment
}:{
  appointment: any;
  setAppointment: Dispatch<SetStateAction<{}>>
}) => {

  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IStepByStepAppointmentContext>(StepByStepAppointmentContext);
  const {
    setStep,
    getSlots
  } = actions;

  const {
    data: attentionWindows,
    loading: loadingWindows,
    successful: loadedWindows,
    error: errorWindows,
  } = state.slots;

  const [isNow, setIsNow] = useState(false);
  const [fromCalendar, setFromCalendar] = useState(false);

  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  const [windows, setWindows] = useState([]);

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

  const SlotComponent = ({ data }: { data: any }) => {

    let isSelected = appointment["attentionWindowId"] === data["id"];
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
          setAppointment({
            ...appointment, 
            attentionWindowId: data["id"],
            date: data
          }) 
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
            {isSelected && <FiCheck/>}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          {fromCalendar ? (
            <p>
              {`${data["horaInicio"]}`} - {`${data["horaFin"]}`}
            </p>
          ) : isActualHour ? (
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

  useMemo(() => {
    if (loadedWindows) setWindows(attentionWindows as []);
  }, [loadingWindows]);

  useMemo(()=>{
    if(appointment["serviceId"] !== undefined && selectedDate !== ""){
      console.log(appointment["serviceId"], selectedDate)
      getSlots({
        serviceId: appointment["serviceId"], 
        date: selectedDate
      })(dispatch)
    }
  },[appointment["serviceId"], selectedDate])

  return (
    <div className={"w-full h-fit relative flex flex-col gap-2"}>

      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="font-normal text-sm text-slate-600">Para cuando</p>
        <div className="w-full grid grid-cols-2 justify-between items-center gap-5">
          <div
            className={twMerge([
              "cursor-pointer border py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
              !isNow
                ? "bg-green-500 text-white border-green-500"
                : "bg-transparent text-secondary border-secondary",
            ])}
            onClick={() => {
              setAppointment({...appointment, isNow: false})
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
              setAppointment({...appointment, isNow: true});
              setIsNow(true);
            }}
          >
            Ahora mismo
            {isNow && <FiCheck />}
          </div>
        </div>
        {!isNow && (
          <FormInput
            type={"date"}
            min={moment().format("YYYY-MM-DD")}
            disabled={false}
            placeholder={""}
            value={selectedDate}
            className="form-control mt-3"
            onChange={(e:any) => {
              setSelectedDate(e.target.value);
            }}
          />
        )}
      </div>
      {!isNow && (
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className="font-normal text-sm text-slate-600">
            Ventanas de atención
          </p>
          <div className="w-full flex flex-col justify-start items-center gap-6">
            {!loadedWindows && !loadingWindows && (
              <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
                <p className="text-base text-slate-900 font-medium">
                  Nada por aquí
                </p>
                <p className="text-sm text-slate-500 font-light">
                  Seleccina una servicio seguido de una fecha para conocer
                  la disponibilidad
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
            {loadingWindows && <Loading />}
            {(loadedWindows && windows.length > 0) && windows.map((elem: any) => 
              <SlotComponent key={elem.id} data={elem} />
            )}
          </div>
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={false}
          onClick={() => { setStep(2)(dispatch) }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Continuar
        </Button>
        <p
          onClick={() => { setStep(0)(dispatch) }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Regresar
        </p>
      </div>
    </div>
  )
}

export default SlotStep