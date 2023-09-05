import { Dispatch } from "react";

export interface INotificationPopupActions {
    getNotifications: Function;
}

const getNotifications = (obj:any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_NOTIFICATIONS_LOADING" });
  
        //const res: string = await new AuthUseCase().signInUser({ email: obj.email, password: obj.password });
        const res:boolean = false

        dispatch({ type: "GET_NOTIFICATIONS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_NOTIFICATIONS_ERROR", payload: { error: error } });
    }
  }
  

export const actions: INotificationPopupActions = {
    getNotifications
}
  