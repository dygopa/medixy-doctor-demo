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
import { scheduleFailuresEnum } from "domain/core/failures/schedule/scheduleFailure";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { IUser } from "domain/core/entities/userEntity";
import CompletedStepByStepPopup from "(presentation)/components/core/CompletedStepByStep/CompletedStepByStepPopUp";

interface ICalendarIndexProps {
  user: IUser;
}

export default function CalendarIndex({ user }: ICalendarIndexProps) {
  const {
    actions: actionsStep,
    state: stateSteps,
    dispatch: dispatchStep,
  } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps, changeOpenPopup } = actionsStep;
  const {
    error: stepNotCreated,
    loading: creatingStep,
    successful: createStepSuccessful,
  } = stateSteps.createUserSteps;

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    getServices,
    getAttentionWindows,
    activeLocality,
    changeTypePopup,
    changeStatusPopup,
    activeAttentionWindowId,
  } = actions;
  const { data, loading, successful, error } = state.getAttentionWindows;
  const { successful: successfulWindowCreated, error: errorWindowCreated } =
    state.createWindowAttention;
  const { successful: rescheduleSuccessful } = state.rescheduleAppointment;
  const { successful: successfulDelete } = state.deleteAppointment;
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

  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMessage, setErrorMessage] = useState("");

  const [windows, setWindows] = useState([]);
  const [showCompletedStepModal, setShowCompletedModal] = useState(false);

  const [showWindowModal, setShowWindowModal] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [hasLocalities, setHasLocalities] = useState(false);
  console.log(hasLocalities);

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
      attentionWindowId: elem["id"],
    };
    return object;
  }

  function formatList() {
    let list = [];
    list = data.map((elem: any) => formatEvent(elem));
    setWindows(list);
  }

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
    if (localitiesSuccessful && [...(localities as any[])].length > 0)
      setHasLocalities(true);
  }, [localitiesLoading, localities]);

  useMemo(() => {
    if (successful) formatList();
  }, [loading, successful]);

  useMemo(() => {
    if (user) {
      getServices(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  /* useMemo(() => {
    if (searchParams.get("attentionWindowId"))
      changeStatusPopup(true)(dispatch);
    changeTypePopup(5)(dispatch);
  }, [searchParams]); */

  useMemo(() => {
    if (
      searchParams.get("openPopup") &&
      localities &&
      [...(localities as any[])].length > 0
    ) {
      changeStatusPopup(true)(dispatch);
      changeTypePopup(1)(dispatch);
    }
  }, [searchParams.get("openPopup"), localitiesSuccessful]);

  useMemo(() => {
    if (stepNotCreated) {
      setSuccessfulPopup(true);
    }
  }, [stepNotCreated, createStepSuccessful]);

  useMemo(() => {
    if (successfulWindowCreated) {
      setShowCompletedModal(true);
      createUserSteps(user.accountId, "SCHEDULE_CREATED")(dispatchStep);
    }
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
        <SuccessfulComponent
          tittle="Ventana de atención creada con exito"
          show={successfulPopup}
          description={"La ventana de atención ha sido generada con éxito."}
        />
        <SuccessfulComponent
          tittle="Cita reagendada con exito"
          show={rescheduleSuccessful}
          description={"La cita seleccionada ha sido reagendada con éxito."}
        />
        <SuccessfulComponent
          tittle="Cita cancelada con exito"
          show={successfulDelete}
          description={"La cita seleccionada ha sido cancelada con éxito."}
        />
        {/* BEGIN: Calendar Content */}
        {user !== null && user.userId ? (
          <div className="w-full h-[64vh]">
            {!localitiesLoading && localitiesSuccessful && (
              <>
                {localities && [...(localities as any[])].length === 0 ? (
                  <div className="w-full h-full flex justify-center items-center flex-wrap gap-5">
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
                          Crea tu primer consultorio y empieza a crear los
                          servicios que prestas
                        </p>
                      </div>
                      <Link className="w-full block" href="/localities/create">
                        <Button className="w-full" variant="primary">
                          Crear consultorio
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </>
            )}
            {localitiesLoading && !localitiesSuccessful && !hasLocalities && (
              <Loading />
            )}
            {!localitiesLoading && localitiesSuccessful && hasLocalities && (
              <Calendar
                navLinkDayClick={(date: Date, jsEvent: UIEvent) => {
                  jsEvent.preventDefault();
                }}
                handleChangeInWeek={() => {}}
                events={windows}
                initialEvent={""}
                handleClick={(param: EventClickArg) => {
                  activeAttentionWindowId(
                    param.event._def.extendedProps["attentionWindowId"]
                  )(dispatch);
                  changeStatusPopup(true)(dispatch);
                  changeTypePopup(5)(dispatch);
                }}
              />
            )}
          </div>
        ) : (
          <div className="w-full h-[64vh]">
            <Loading />
          </div>
        )}
        {/* END: Calendar Content */}
      </div>

      <CompletedStepByStepPopup
        user={user}
        isVisible={showCompletedStepModal}
        setIsVisible={setShowCompletedModal}
      />
    </>
  );
}
