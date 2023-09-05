import React, { createContext, Dispatch, useReducer } from "react";
import { actions, INotificationPopupActions } from "./NotificationPopupActions";
import { NotificationsPopupReducer } from "./NotificationPopupReducer";
import { INotificationPopupState, initialState } from "./NotificationPopupState";

export interface INotificationPopupContext {
  state: INotificationPopupState;
  actions: INotificationPopupActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const NotificationPopupContext = createContext<INotificationPopupContext>(
  {} as INotificationPopupContext
);

const NotificationPopupProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(NotificationsPopupReducer, initialState);

  return (
    <NotificationPopupContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </NotificationPopupContext.Provider>
  );
};

export default NotificationPopupProvider;
