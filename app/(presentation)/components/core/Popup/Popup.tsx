import React, { useContext, useEffect, useRef } from "react";
import CreateAgenda from "./CreateAgenda/CreateAgenda";
import CreateAppointment from "./CreateAppointment/CreateAppointment";
import { twMerge } from "tailwind-merge";
import AppointmentDetail from "./AppointmentDetail/AppointmentDetail";
import CreateAgendaHelp from "./CreateAgendaHelp/CreateAgendaHelp";
import FiltersComponent from "./FiltersComponent/FiltersComponent";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import AttentionWindowDetail from "./AttentionWindowDetail/AttentionWindowDetail";
import StepByStepAppointment from "./StepByStepAppointment/StepByStepAppointment";
import { IUser } from "domain/core/entities/userEntity";

interface IPopupProps {
  user: IUser;
}

function Popup({ user }: IPopupProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { changeStatusPopup, cancelAppointment } = actions;
  const { data: type } = state.typePopupActive;
  const { data: status } = state.statusPopup;

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          changeStatusPopup(false)(dispatch);
          cancelAppointment(false)(dispatch);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div
      className={twMerge([
        "z-[100] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
        status ? "visible" : "hidden",
      ])}
    >
      {type === 0 && (
        <StepByStepAppointment
          user={user}
          customRef={wrapperRef}
          cancelFuntion={() => {
            changeStatusPopup(false)(dispatch);
          }}
        />
      )}
      {type === 1 && (
        <CreateAgenda
          user={user}
          customRef={wrapperRef}
          cancelFuntion={() => {
            changeStatusPopup(false)(dispatch);
          }}
        />
      )}
      {type === 2 && (
        <AppointmentDetail
          user={user}
          customRef={wrapperRef}
          cancelFuntion={() => {
            changeStatusPopup(false)(dispatch);
            cancelAppointment(false)(dispatch);
          }}
        />
      )}
      {type === 3 && (
        <CreateAgendaHelp
          customRef={wrapperRef}
          cancelFuntion={() => {
            changeStatusPopup(false)(dispatch);
          }}
        />
      )}
      {type === 4 && (
        <FiltersComponent
          user={user}
          customRef={wrapperRef}
          cancelFuntion={() => {
            changeStatusPopup(false)(dispatch);
          }}
        />
      )}
      {type === 5 && (
        <AttentionWindowDetail
          user={user}
          customRef={wrapperRef}
          cancelFuntion={() => {
            changeStatusPopup(false)(dispatch);
          }}
        />
      )}
    </div>
  );
}

export default Popup;
