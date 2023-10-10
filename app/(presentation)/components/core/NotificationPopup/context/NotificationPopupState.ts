import { INotification } from "domain/core/entities/notificationEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import { NotificationFailure } from "domain/core/failures/notification/notification";

export interface INotificationPopupState {
    notifications: IGetNotificationsState;
    userFCMToken: IAuthFCMTokenState;
}
  
interface IGetNotificationsState {
    data: INotification[];
    loading: boolean;
    successful: boolean;
    error: NotificationFailure | null; 
}

interface IAuthFCMTokenState {
    data: string | null;
    loading: boolean;
    successful: boolean;
    error: AuthFailure | null; 
  }
  
export const initialState: INotificationPopupState = {
    notifications: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    },
    userFCMToken: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
}