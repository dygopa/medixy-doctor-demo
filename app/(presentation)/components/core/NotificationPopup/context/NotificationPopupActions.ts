import { INotification } from "domain/core/entities/notificationEntity";
import NotificationUseCase from "domain/useCases/notification/notificationUseCase";
import { Dispatch } from "react";
import AuthUseCase from "domain/useCases/auth/authUseCase";

export interface INotificationPopupActions {
    getNotifications: Function;
    updateUserFCMToken: Function;
}

const getNotifications = (obj:{userId: string | number}) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_NOTIFICATIONS_LOADING" });
  
        const res: INotification[] = await new NotificationUseCase().getNotifications(obj);

        dispatch({ type: "GET_NOTIFICATIONS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_NOTIFICATIONS_ERROR", payload: { error: error } });
    }
  }
  
  const updateUserFCMToken = (obj:{ token: string | number; userId: string | number; }) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "UPDATE_USER_FCM_TOKEN_LOADING" });
  
      const res: string = await new AuthUseCase().updateUserFCMToken(obj);
  
      dispatch({ type: "UPDATE_USER_FCM_TOKEN_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "UPDATE_USER_FCM_TOKEN_ERROR", payload: { error: error } });
    }
  }

export const actions: INotificationPopupActions = {
    getNotifications,
    updateUserFCMToken
}
  