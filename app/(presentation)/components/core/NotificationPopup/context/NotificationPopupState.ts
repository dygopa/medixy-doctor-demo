import { NotificationFailure } from "domain/core/failures/notification/notification";

export interface INotificationPopupState {
    notifications: IGetNotificationsState;
}
  
interface IGetNotificationsState {
    data: any[];
    loading: boolean;
    successful: boolean;
    error: NotificationFailure | null; 
}
  
export const initialState: INotificationPopupState = {
    notifications: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    }
}