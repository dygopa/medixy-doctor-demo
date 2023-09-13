import { INotification } from "domain/core/entities/notificationEntity";
import NotificationUseCase from "domain/useCases/notification/notificationUseCase";
import { Dispatch } from "react";

export interface INotificationPopupActions {
    getNotifications: Function;
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
  

export const actions: INotificationPopupActions = {
    getNotifications
}
  