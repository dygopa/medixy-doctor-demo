import Side from "../Side/Side";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Calendar from "(presentation)/components/core/Calendar";
import Loading from "(presentation)/components/core/Loading/Loading";
import moment from "moment";
import { IScheduleContext, ScheduleContext } from "../context/ScheduleContext";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import AppointmentEndModal from "./AppointmentEndModal/AppointmentEndModal";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { IUser } from "domain/core/entities/userEntity";

interface ICalendarIndexProps {
  user: IUser;
}

export default function CalendarIndex({ user }: ICalendarIndexProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    appointmentDetail,
    getAppointments,
    getLocalities,
    activeDay,
    changeTypePopup,
    changeStatusPopup,
    predifinedReservationData,
    getCalendarEvents,
    activeLocality,
    activeActualDay,
  } = actions;

  const {
    successful: createAppointmentSuccessful,
    error: createAppointmentError,
  } = state.createAppointment;
  const {
    successful: calendarEventsSuccessful,
    loading: calendarEventsLoading,
    error: calendarEventsError,
    data: calendarEvents,
  } = state.getCalendarEvents;
  const {
    successful: serviceSuccessful,
    error: serviceError,
    data: service,
  } = state.activeService;
  const {
    successful: deleteAppointmentSuccessful,
    error: deleteAppointmentError,
  } = state.deleteAppointment;
  const {
    successful: localitySuccessful,
    error: localityError,
    data: locality,
  } = state.activeLocality;
  const {
    successful: servicesSuccessful,
    error: servicesError,
    data: services,
  } = state.getServices;
  const {
    successful: localitiesSuccessful,
    error: localitiesError,
    data: localities,
  } = state.getLocalities;
  const {
    data: activeDayInCalendar,
    successful: changedActiveDayInCalendar,
    loading: changingDayInCalendar,
  } = state.activeDay;

  const params = useSearchParams();

  const [appointments, setAppointments] = useState([]);
  const [loadedAppointments, setLoadedAppointments] = useState(false);
  const [showAppointmentEndModal, setShowAppointmentEndModal] = useState(false);

  function formatEvent(elem: any) {
    let object = {};

    //console.log(elem);

    let isBlocked = elem["estado"] === 9;
    let type = elem["sujetoId"] ? "APPOINMENT" : "FREE_SLOT";
    let text =
      type === "WINDOW"
        ? "Ventana de atención"
        : isBlocked
        ? "Bloqueado"
        : type === "FREE_SLOT"
        ? "Disponible"
        : `${
            elem["Sujetos"]["nombres"] + " " + elem["Sujetos"]["primerApellido"]
          } - Ocupado`;
    let textColor =
      type === "WINDOW"
        ? "#854d0e"
        : type === "FREE_SLOT"
        ? "#065f46"
        : isBlocked
        ? "#9f1239"
        : "#9f1239";
    let backgroundColor =
      type === "WINDOW"
        ? "#fde047"
        : type === "FREE_SLOT"
        ? "#6ee7b7"
        : isBlocked
        ? "#fda4af"
        : "#fda4af";

    object = {
      appointmentId: elem["id"],
      title: text,
      createdByDoctor: elem["creadoPorDoctor"],
      start: moment(elem["fechaReserva"]).utc().format("YYYY-MM-DD HH:mm"),
      end: moment(elem["fechaFinReserva"]).utc().format("YYYY-MM-DD HH:mm"),
      isBlocked,
      textColor:
        moment(elem["fechaReserva"]).isBefore(moment().utc(true)) &&
        type === "FREE_SLOT"
          ? "#242424"
          : isBlocked
          ? "#242424"
          : textColor,
      backgroundColor:
        moment(elem["fechaReserva"]).isBefore(moment().utc(true)) &&
        type === "FREE_SLOT"
          ? "#CCCCCC30"
          : isBlocked
          ? "#CCCCCC30"
          : backgroundColor,
      borderColor:
        moment(elem["fechaReserva"]).isBefore(moment().utc(true)) &&
        type === "FREE_SLOT"
          ? "#CCCCCC30"
          : isBlocked
          ? "CCCCCC30"
          : textColor,
      type: type,
      dateEvent: moment(elem["fechaReserva"]).toDate(),
      dateEndEvent: moment(elem["fechaFinReserva"]).toDate(),
      description: "-",
      nombre: elem["Servicios"] ? elem["Servicios"]["nombre"] : null,
      Localidades:
        elem["Servicios"] && elem["Servicios"]["Localidades"]
          ? elem["Servicios"]["Localidades"]
          : null,
      attentionWindowId: elem["id"],
      attentionWindowBaseId: elem["VentanasAtencion"]
        ? elem["VentanasAtencion"]["ventanaAtencionBaseId"]
        : null,
      serviceId: elem["servicioId"],
      localityId: locality["id"],
      sujetos: {
        ...elem["Sujetos"],
        nombre: "-",
        sujetoId: elem["sujetoId"],
        appoinmentId: elem["id"],
      },
      estado: elem["estado"],
    };
    return object;
  }

  function formatList() {
    let list: any[] = [];
    list = calendarEvents.map((elem: any) => formatEvent(elem));

    setAppointments(list as never[]);
  }

  function handleClickOnEvent(data: any) {
    if (data["isBlocked"]) {
      return;
    }
    if (
      moment(data["dateEvent"]).isBefore(moment().utc(true)) &&
      data["type"] !== "APPOINMENT"
    ) {
      setShowAppointmentEndModal(true);
      return;
    }

    if (data["type"] === "WINDOW") {
      predifinedReservationData({
        attentionWindowId: data["attentionWindowId"],
        date: data["dateEvent"],
        dateEnd: data["dateEndEvent"],
        type: "WINDOW",
        serviceId: data["serviceId"],
        localityId: data["localityId"],
      })(dispatch);
      changeStatusPopup(true)(dispatch);
      changeTypePopup(0)(dispatch);
    }
    if (data["type"] === "FREE_SLOT") {
      predifinedReservationData({
        attentionWindowId: data["attentionWindowId"],
        attentionWindowBaseId: data["attentionWindowBaseId"],
        date: data["dateEvent"],
        dateEnd: data["dateEndEvent"],
        type: "FREE_SLOT",
        serviceId: data["serviceId"],
        localityId: data["localityId"],
      })(dispatch);
      changeStatusPopup(true)(dispatch);
      changeTypePopup(0)(dispatch);
    }
    if (data["type"] === "APPOINMENT") {
      //console.log(data);
      appointmentDetail({
        ...data["sujetos"],
        id: data["appointmentId"],
        fechaReserva: data["dateEvent"],
        nombre: data["nombre"],
        Localidades: data["Localidades"],
        estado: data["estado"],
        servicioId: data.serviceId,
        creadoPorDoctor: data["createdByDoctor"],
      })(dispatch);
      changeStatusPopup(true)(dispatch);
      changeTypePopup(2)(dispatch);
    }
  }

  /* useMemo(() => {
    if (loadedUser && servicesSuccessful) {
      if (services.length === 1) {
        activeService({
          id: services[0]["id"],
          title: services[0]["name"],
          description: services[0]["description"],
          type: "SERVICE",
        })(dispatch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser, services]); */

  const [checkedLocality, setCheckedLocality] = useState(false);

  useMemo(() => {
    if (!checkedLocality && localitiesSuccessful && localities.length > 0) {
      if (params.get("locality")) {
        let id = params.get("locality")?.toString();
        let localityFinded = [...localities].find(
          (elem: any) => elem["id"] === parseInt(id!)
        );
        if (localityFinded) {
          activeLocality({
            id: params.get("locality"),
            title: localityFinded["name"],
            description:
              localityFinded["address"] &&
              localityFinded["address"]["postal_code"]
                ? localityFinded["address"]["postal_code"]
                : "Sin dirección",
            type: "LOCALITY",
          })(dispatch);
        }
      } else {
        activeLocality({
          id: localities[0]["id"],
          title: localities[0]["name"],
          description:
            localities[0]["address"] && localities[0]["address"]["postal_code"]
              ? localities[0]["address"]["postal_code"]
              : "Sin dirección",
          type: "LOCALITY",
        })(dispatch);
      }
      setCheckedLocality(true);
    }
  }, [localitiesSuccessful]);

  useMemo(() => {
    if (calendarEventsSuccessful) formatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEventsLoading]);

  useMemo(() => {
    if (changedActiveDayInCalendar && checkedLocality) {
      getCalendarEvents(
        user.userId,
        locality["id"] ?? params.get("locality") ?? localities[0]["id"],
        moment(activeDayInCalendar["start"]).format("YYYY-MM-DD"),
        moment(activeDayInCalendar["end"], "YYYY-MM-DD").format("YYYY-MM-DD")
      )(dispatch);
    }
  }, [activeDayInCalendar, checkedLocality]);

  useMemo(() => {
    if (user) {
      getLocalities(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="mt-8 flex flex-col lg:flex-row justify-between flex-wrap lg:flex-nowrap items-start gap-5">
        <AlertComponent
          variant="error"
          show={createAppointmentError !== null}
          description={"Ha ocurrido un error creando la cita"}
        />
        <AlertComponent
          variant="success"
          show={createAppointmentSuccessful === true}
          description="Cita creada exitosamente"
        />
        <SuccessfulComponent
          tittle="Cita cancelada con exito"
          show={deleteAppointmentSuccessful}
          description={"La cita selecciodana ha sido cancelada con éxito."}
        />
        <AlertComponent
          variant="error"
          show={deleteAppointmentError !== null}
          description={"Ha ocurrido un error cancelando la cita"}
        />
        <div className="w-full lg:w-2/3 h-[64vh]">
          <Calendar
            handleChangeInWeek={(param: DatesSetArg) => {
              //console.log(param);
              activeDay({ start: param.start, end: param.end })(dispatch);
            }}
            events={appointments}
            initialEvent={""}
            handleClick={(param: EventClickArg) => {
              handleClickOnEvent(param.event._def.extendedProps);
            }}
            navLinkDayClick={(date: Date, jsEvent: UIEvent) => {
              jsEvent.preventDefault();
              activeActualDay(date)(dispatch);
            }}
          />
        </div>
        <Side user={user} />
      </div>

      {showAppointmentEndModal && (
        <div
          className={twMerge([
            "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
            showAppointmentEndModal ? "visible" : "hidden",
          ])}
        >
          <div className="w-full md:w-[60%] xl:w-[45%] lg:w-[60%] h-[325px] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
            <AppointmentEndModal
              setShowAppointmentEndModal={setShowAppointmentEndModal}
            />
          </div>
        </div>
      )}
    </>
  );
}
