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

export default function CalendarIndex() {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    appointmentDetail,
    getAppointments,
    changeTypePopup,
    changeStatusPopup,
    predifinedReservationData,
    getCalendarEvents,
    activeService,
  } = actions;

  const {
    successful: createAppointmentSuccessful,
    error: createAppointmentError,
  } = state.createAppointment;
  const {
    successful: calendarEventsSuccessful,
    error: calendarEventsError,
    data: calendarEvents,
  } = state.getCalendarEvents;
  const {
    successful: serviceSuccessful,
    error: serviceError,
    data: service,
  } = state.activeService;
  const { successful: loadedCreationAppointment } = state.createAppointment;
  const {
    successful: servicesSuccessful,
    error: servicesError,
    data: services,
  } = state.getServices;

  const params = useSearchParams()

  const [appointments, setAppointments] = useState([]);
  const [loadedAppointments, setLoadedAppointments] = useState(false);

  function formatEvent(elem: any) {
    let object = {};

    //let type = elem["type"]
    let type = elem["sujetoId"] ? "APPOINMENT" : "FREE_SLOT";
    let text =
      type === "WINDOW"
        ? "Ventana de atención"
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
        : "#9f1239";
    let backgroundColor =
      type === "WINDOW"
        ? "#fde047"
        : type === "FREE_SLOT"
        ? "#6ee7b7"
        : "#fda4af";

    object = {
      title: text,
      start: moment(elem["fechaReserva"]).utc().format("YYYY-MM-DD HH:mm"),
      end: moment(elem["fechaFinReserva"]).utc().format("YYYY-MM-DD HH:mm"),
      textColor: textColor,
      type: type,
      borderColor: textColor,
      dateEvent: moment(elem["fechaReserva"]).toDate(),
      dateEndEvent: moment(elem["fechaFinReserva"]).toDate(),
      description: "-",
      attentionWindowId: elem["id"],
      serviceId: elem["servicioId"],
      sujetos: {
        ...elem["Sujetos"],
        nombre: elem["Servicios"]["nombre"],
        sujetoId: elem["sujetoId"],
        appoinmentId: elem["id"],
      },
      backgroundColor: backgroundColor,
    };
    return object;
  }

  function formatList() {
    let list: any[] = [];
    list = calendarEvents.map((elem: any) => formatEvent(elem));

    setAppointments(list as never[]);
  }

  function handleClickOnEvent(data: any) {
    if (
      moment(data["dateEvent"]).isBefore(moment().utc(true)) &&
      data["type"] !== "APPOINMENT"
    ) {
      return;
    }

    if (data["type"] === "WINDOW") {
      predifinedReservationData({
        attentionWindowId: data["attentionWindowId"],
        date: data["dateEvent"],
        dateEnd: data["dateEndEvent"],
        type: "WINDOW",
        serviceId: data["serviceId"],
      })(dispatch);
      changeStatusPopup(true)(dispatch);
      changeTypePopup(0)(dispatch);
    }
    if (data["type"] === "FREE_SLOT") {
      predifinedReservationData({
        attentionWindowId: data["attentionWindowId"],
        date: data["dateEvent"],
        dateEnd: data["dateEndEvent"],
        type: "FREE_SLOT",
        serviceId: data["serviceId"],
      })(dispatch);
      changeStatusPopup(true)(dispatch);
      changeTypePopup(0)(dispatch);
    }
    if (data["type"] === "APPOINMENT") {
      appointmentDetail({
        ...data["sujetos"],
        fechaReserva: data["dateEvent"],
      })(dispatch);
      changeStatusPopup(true)(dispatch);
      changeTypePopup(2)(dispatch);
    }

  }

  useMemo(() => {
    if (loadedCreationAppointment) {
      getCalendarEvents(user.userId, service.id, {}, {})(dispatch);
    }
  }, [loadedCreationAppointment]);

  useMemo(() => {
    if (calendarEventsSuccessful) formatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEventsSuccessful]);

  useMemo(() => {
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
  }, [loadedUser, services]);

  useMemo(() => {
    if (loadedUser && serviceSuccessful) {
      getCalendarEvents(user.userId, service.id, {}, {})(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser, service]);

  useMemo(()=>{
    if(params.get("service") && services > 0 ){
      let id = params.get("service")?.toString()
      let serviceFinded = [...services].find((elem:any)=> elem["id"] === parseInt(id!) )
      console.log(serviceFinded)
      if(serviceFinded){
        activeService({
          id: params.get("service"),
          title: serviceFinded["name"],
          description: serviceFinded["description"],
          type: "SERVICE",
        })(dispatch)
      }
      getCalendarEvents(user.userId, params.get("service"), {}, {})(dispatch);
    }
  },[params, services])

  return (
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
      <div className="w-full lg:w-2/3 h-[64vh]">
        <Calendar
          handleChangeInWeek={(param: DatesSetArg) => {
            console.log(param.start, " - ", param.end);
          }}
          events={appointments}
          initialEvent={""}
          handleClick={(param: EventClickArg) => {
            handleClickOnEvent(param.event._def.extendedProps);
          }}
        />
      </div>
      <Side />
    </div>
  );
}
