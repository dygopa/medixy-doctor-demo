"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiBell } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import Popup from "./Popup/Popup";
import { IUser } from "domain/core/entities/userEntity";
import {
  INotificationPopupContext,
  NotificationPopupContext,
} from "./context/NotificationPopupContext";
import {
  getUserToken,
  onMessageListener,
} from "infrastructure/config/firebase/FirebaseConfig";
import { INotification } from "domain/core/entities/notificationEntity";
import NotificationToast from "../NotificationToast/NotificationToast";

const NotificationPopup = ({ user }: { user: IUser }) => {
  const { actions, dispatch } = useContext<INotificationPopupContext>(
    NotificationPopupContext
  );
  const { getNotifications, updateUserFCMToken } = actions;

  const [activeNotificationDropdown, setActiveNotificationDropdown] =
    useState(false);
  const [activeDot, setActiveDot] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    setHasPermission(Notification.permission === "granted");
  }, []);

  useEffect(() => {
    if (user && user.accountId) {
      if (hasPermission) {
        getUserToken()
          .then((value: string | undefined) => {
            if (value) {
              console.log(value);
              updateUserFCMToken({
                token: value,
                userId: user.accountId,
              })(dispatch);
            }
          })
          .catch((e: any) => console.log(e));
      }
    }
  }, [user]);

  const [notification, setNotification] = useState({
    show: false,
    data: {} as INotification,
  });

  useMemo(() => {
    if (user && user.accountId) {
      getNotifications({
        userId: user.accountId,
      })(dispatch);
    }
  }, [user]);

  const cancelNotificationFunction = () =>
    setNotification({ ...notification, show: false });

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onMessageListener().then((payload) => {
      console.log(payload);
      setActiveDot(true);
      setNotification({
        show: true,
        data: payload as INotification,
      });
      getNotifications({
        userId: user.accountId,
      })(dispatch);
    });

    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, [user]);

  return (
    <>
      {notification.show && (
        <NotificationToast
          notification={notification.data}
          cancelFunction={cancelNotificationFunction}
        />
      )}
      <div className="w-fit h-[4rem] relative flex flex-col justify-center items-start group">
        <div
          onClick={() => {
            setActiveNotificationDropdown(!activeNotificationDropdown);
            setActiveDot(false);
          }}
          className={twMerge([
            "transition relative w-fit h-fit cursor-pointer text-[1.2rem] text-slate-500 bg-white border rounded p-2",
            activeNotificationDropdown && "text-slate-900",
          ])}
        >
          {activeDot || !hasPermission ? (
            <span className="bg-red-600 w-[10px] h-[10px] rounded-full absolute -top-1 -right-1"></span>
          ) : (
            ""
          )}
          <FiBell />
        </div>

        <Popup
          customActive={setActiveNotificationDropdown}
          active={activeNotificationDropdown}
          hasPermission={hasPermission}
        />
      </div>
    </>
  );
};

export default NotificationPopup;
