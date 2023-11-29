/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import NotificationMessageView from "./Notification/Notification";
import {
  INotificationPopupContext,
  NotificationPopupContext,
} from "../context/NotificationPopupContext";
import Loading from "../../Loading/Loading";
import { INotification } from "domain/core/entities/notificationEntity";
import Button from "../../BaseComponents/Button";
import NotificationGrantedMessage from "../NotificationGrantedMessage/NotificationGrantedMessage";
import NotificationDeniedMessage from "../NotificationDeniedModal/NotificationDeniedModal";

const Popup = ({
  active,
  customActive,
  hasPermission,
}: {
  active: boolean;
  customActive: Function;
  hasPermission: boolean;
}) => {
  const { state } = useContext<INotificationPopupContext>(
    NotificationPopupContext
  );
  const { data, successful, error, loading } = state.notifications;

  const wrapperRef = useRef(null);

  const [notifications, setNotifications] = useState([] as INotification[]);

  const [showNotificationGrantedModal, setShowNotificationGrantedModal] =
    useState(false);
  const [showNotificationDeniedModal, setShowNotificationDeniedModal] =
    useState(false);

  const onHandleNotificationPermissions = () => {
    if (!("Notification" in window)) return;

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setShowNotificationGrantedModal(true);
        return;
      }

      setShowNotificationDeniedModal(true);
    });
  };

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          customActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  const NotificationsGroup = ({
    type,
    list,
  }: {
    type: string;
    list: INotification[];
  }) => {
    return (
      <div className="w-full h-fit relative flex flex-col justify-start items-center">
        <div className="z-10 w-full py-2 text-left text-xs text-slate-500 font-light sticky -top-4 bg-white">
          {type}
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1">
          {list.map((data: INotification, i: number) => (
            <NotificationMessageView notification={data} key={i} />
          ))}
        </div>
      </div>
    );
  };

  const NotificationGroups = ({ list }: { list: INotification[] }) => {
    let fromToday: any[] = [list[0], list[1], list[0], list[1], list[2]];
    let fromYesterday: any[] = [
      list[0],
      list[1],
      list[2],
      list[0],
      list[1],
      list[2],
    ];
    let fromPastDays: any[] = list;

    return (
      <div className="w-full h-fit relative flex flex-col justify-start items-center">
        <NotificationsGroup type="Hoy" list={list} />
        {/* {fromToday.length > 0 && <NotificationsGroup type='Hoy' list={fromToday} />}
                {fromYesterday.length > 0 && <NotificationsGroup type='Ayer' list={fromYesterday} />}
                {fromPastDays.length > 0 && <NotificationsGroup type='Más antiguas' list={fromPastDays} />} */}
      </div>
    );
  };

  useMemo(() => {
    if (successful) {
      console.log(data);
      setNotifications(data);
    }
  }, [loading]);

  return (
    <>
      <div
        ref={wrapperRef}
        className={twMerge([
          "absolute top-[4rem] w-[22rem] shadow-lg bg-white min-h-[30vh] h-fit max-h-[70vh] overflow-y-auto border rounded flex flex-col justify-start items-center p-4 gap-2",
          active ? "visible" : "hidden",
        ])}
      >
        <div className="w-full h-fit pb-2 border-b bg-white flex items-center justify-start">
          <p className="text-slate-900 font-normal text-base">Notificaciones</p>
        </div>
        {hasPermission ? (
          successful && notifications.length > 0 ? (
            <NotificationGroups list={notifications} />
          ) : (
            <div className="w-full h-fit flex flex-col justify-center items-center py-3 text-center">
              <p className="font-normal text-slate-900 text-base">
                Nada por aqui aún
              </p>
              <p className="font-light text-slate-500 text-sm">
                No tienes notificaciones todavia.
              </p>
            </div>
          )
        ) : (
          <div className="text-center mt-4 pb-3">
            <div className="mb-3">
              <p>Mejora tu experiencia activando las notificaciones</p>
            </div>

            <div>
              <Button
                onClick={onHandleNotificationPermissions}
                type="button"
                variant="primary"
              >
                Activar notificaciones
              </Button>
            </div>
          </div>
        )}
      </div>

      <NotificationGrantedMessage
        showNotificationGrantedModal={showNotificationGrantedModal}
      />

      <NotificationDeniedMessage
        showNotificationDeniedModal={showNotificationDeniedModal}
        setShowNotificationDeniedModal={setShowNotificationDeniedModal}
      />
    </>
  );
};

export default Popup;
