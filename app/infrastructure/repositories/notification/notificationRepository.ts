import { INotification } from 'domain/core/entities/notificationEntity';
import { NotificationFailure, notificationFailuresEnum } from 'domain/core/failures/notification/notification';
import { GET_NOTIFICATIONS } from 'infrastructure/config/api/dictionary';
import nookies from 'nookies';

export default interface INotificationRepository {
  getNotifications(obj: { userId?: number | string | undefined; }): Promise<INotification[] | NotificationFailure >;
}
  
export class NotificationRepository implements INotificationRepository {
  async getNotifications(obj: { userId?: number | string | undefined; }): Promise<INotification[] | NotificationFailure > {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_NOTIFICATIONS(obj.userId) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_NOTIFICATIONS", data["data"])

      return data["data"] as Array<INotification> ?? [];
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }
}
