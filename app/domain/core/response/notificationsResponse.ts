import { INotification } from "../entities/notificationEntity";

export interface IGetNotificationsResponse {
    data: INotification[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
