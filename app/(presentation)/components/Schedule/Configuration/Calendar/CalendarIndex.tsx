import Calendar from "(presentation)/components/core/Calendar";
import React, { useContext, useMemo, useState } from "react";
import {
  IScheduleContext,
  ScheduleContext,
} from "../../context/ScheduleContext";
import Loading from "(presentation)/components/core/Loading/Loading";
import moment from "moment";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";
import { FiBriefcase, FiHome } from "react-icons/fi";
import { AiFillBuild } from "react-icons/ai";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { EventClickArg } from "@fullcalendar/core";
import { twMerge } from "tailwind-merge";
import AttentionWindow from "./AttentionWindowModal/AttentionWindowModal";
import { useSearchParams } from "next/navigation";
import { scheduleFailuresEnum } from "domain/core/failures/schedule/scheduleFailure";
import { 
  IStepByStepContext, 
  StepByStepContext 
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";

export default function CalendarIndex() {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { actions: actionsStep, state: stateSteps, dispatch: dispatchStep } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps, changeOpenPopup } = actionsStep;
  const {error: stepNotCreated, loading: creatingStep} = stateSteps.createUserSteps

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { getServices, getAttentionWindows, activeLocality } = actions;
  const { data, loading, successful, error } = state.getAttentionWindows;
  const { successful: successfulWindowCreated, error: errorWindowCreated } =
    state.createWindowAttention;
  const {
    data: localities,
    successful: localitiesSuccessful,
    loading: localitiesLoading,
  } = state.getLocalities;
  const {
    data: services,
    successful: servicesSuccessful,
    loading: servicesLoading,
  } = state.getServices;
  const { data: listOfColors } = state.listOfColors;

  const [errorMessage, setErrorMessage] = useState("");

  const [windows, setWindows] = useState([]);

  const [showWindowModal, setShowWindowModal] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);

  const [eventSelected, setEventSelected] = useState<EventClickArg>(
    {} as EventClickArg
  );

  function formatHour(value: number) {
    let h: string = value.toString();
    let divided = h.split("");
    let hours =
      divided.length > 3 ? `${divided[0]}${divided[0]}` : `0${divided[0]}`;
    let minutes =
      divided.length > 3
        ? `${divided[2]}${divided[3]}`
        : `${divided[1]}${divided[2]}`;
    return { hours, minutes };
  }

  function formatEvent(elem: any) {
    let object = {};

    let { hours: startHour, minutes: startMinutes } = formatHour(
      elem["horaInicio"]
    );
    let { hours: endHour, minutes: endMinutes } = formatHour(elem["horaFin"]);

    let start = moment(elem["fechaInicio"]).utc();
    let end = moment(elem["fechaFin"]).utc();

    let color = "#216AD9";

    if (listOfColors) {
      let findedColor = listOfColors.find(
        (value: any) =>
          value["ventanaAtencionBaseId"] === elem["ventanaAtencionBaseId"]
      );
      color = findedColor !== undefined ? findedColor["color"] : "#216AD9";
    }

    object = {
      title: "Horario",
      start: start.format("YYYY-MM-DD HH:mm"),
      end: end.format("YYYY-MM-DD HH:mm"),
      textColor: "#FFF",
      backgroundColor: color,
    };
    return object;
  }

  function formatList() {
    let list = [];
    list = data.map((elem: any) => formatEvent(elem));
    setWindows(list);
  }

  const EmptyLocalities = () => {
    if (localitiesSuccessful && [...(localities as any[])].length === 0) {
      return (
        <div className="md:w-1/3 h-fit border rounded-md bg-white shadow-md p-5 flex flex-col justify-center items-center gap-4">
          <div className="w-full min-h-16 h-16 max-h-16 flex flex-col justify-center items-center">
            <span className="h-16 w-16 rounded-md bg-primary/20 text-primary text-xl overflow-hidden flex flex-col justify-center items-center">
              <Lucide icon="Building" />
            </span>
          </div>
          <div className="w-full h-fit flex flex-col justify-center items-center gap-1 text-center px-2">
            <p className="font-semibold text-slate-900 text-base">
              No hay consultorios
            </p>
            <p className="font-light text-slate-500 text-sm">
              Crea tu primer consultorio y empieza a crear los servicios que
              prestas
            </p>
          </div>
          <Link className="w-full block" href={"/localities/create"}>
            <Button className="w-full" variant="primary">
              Crear consultorio
            </Button>
          </Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const EmptyServices = () => {
    if (servicesSuccessful && [...(services as any[])].length === 0) {
      return (
        <div className="md:w-1/3 h-fit border rounded-md bg-white shadow-md p-5 flex flex-col justify-center items-center gap-4">
          <div className="w-full min-h-16 h-16 max-h-16 flex flex-col justify-center items-center">
            <span className="h-16 w-16 rounded-md bg-primary/20 text-primary text-xl overflow-hidden flex flex-col justify-center items-center">
              <Lucide icon="Building" />
            </span>
          </div>
          <div className="w-full h-fit flex flex-col justify-center items-center gap-1 text-center px-2">
            <p className="font-semibold text-slate-900 text-base">
              No hay servicios
            </p>
            <p className="font-light text-slate-500 text-sm">
              Crea tu primer servicio y empieza a crear los servicios que
              prestas
            </p>
          </div>
          <Link className="w-full block" href={"/services/new-service"}>
            <Button className="w-full" variant="primary">
              Crear servicio
            </Button>
          </Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  useMemo(() => {
    if (successful) formatList();
  }, [loading, successful]);

  useMemo(() => {
    if (loadedUser) {
      getServices(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);

  const handleErrors = () => {
    switch (errorWindowCreated?.code) {
      case scheduleFailuresEnum.localityServicesEmpty:
        setErrorMessage(
          "Este consultorio no posee servicios para crear ventanas de atención."
        );
        break;
      default:
        setErrorMessage(
          "El servidor ha demorado mucho tiempo en responder, Vuelve a intentarlo más tarde."
        );
        break;
    }
  };

  useMemo(()=>{
    if(stepNotCreated){
      setSuccessfulPopup(true)
    }else{
      changeOpenPopup(true)(dispatchStep)
    }
  },[creatingStep])

  useMemo(() => {
    if (successfulWindowCreated) createUserSteps(user.accountId, "SCHEDULE_CREATED")(dispatchStep);
  }, [successfulWindowCreated]);

  useMemo(() => {
    if (errorWindowCreated) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorWindowCreated]);

  return (
    <>
      <div className="mt-8 flex justify-between items-start gap-5">
        <AlertComponent
          variant="error"
          show={errorWindowCreated !== null}
          description={errorMessage}
        />
        <AlertComponent
          variant="success"
          show={successfulPopup}
          description="Ventana de atención creada exitosamente"
        />
        {/* BEGIN: Calendar Content */}
        <div className="w-full h-[64vh]">
          {user !== null && user.userId ? (
            <>
              {localitiesSuccessful &&
              [...(localities as any[])].length > 0 &&
              servicesSuccessful &&
              [...(services as any[])].length > 0 ? (
                <Calendar
                  navLinkDayClick={(date: Date, jsEvent: UIEvent) => {
                    jsEvent.preventDefault();
                  }}
                  handleChangeInWeek={() => {}}
                  events={windows}
                  initialEvent={""}
                  handleClick={(e: EventClickArg) => {
                    setEventSelected(e);
                    setShowWindowModal(true);
                  }}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center flex-wrap gap-5">
                  <EmptyLocalities />
                  <EmptyServices />
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
        {/* END: Calendar Content */}
      </div>

      {showWindowModal && (
        <div
          className={twMerge([
            "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
            showWindowModal ? "visible" : "hidden",
          ])}
        >
          <div className="w-full md:w-[60%] xl:w-[45%] lg:w-[60%] h-[500px] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
            <AttentionWindow
              setShowAttentionWindow={setShowWindowModal}
              eventSelected={eventSelected}
            />
          </div>
        </div>
      )}
    </>
  );
}
