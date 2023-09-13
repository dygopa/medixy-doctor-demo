import { INotification, INotificationLang } from "domain/core/entities/notificationEntity";
import { NotificationFailure } from "domain/core/failures/notification/notification";
import { IGetNotificationsResponse } from "domain/core/response/notificationsResponse";
import { NotificationRepository } from "infrastructure/repositories/notification/notificationRepository";

export default class NotificationUseCase {
  private _repository: NotificationRepository = new NotificationRepository();

  async getNotifications(obj: { userId?: number | string | undefined; }): Promise<INotification[]> {
    try {
      const response = await this._repository.getNotifications(obj);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

}
