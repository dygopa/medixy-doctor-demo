import { INotification, INotificationLang } from "domain/core/entities/notificationEntity";
import { NotificationFailure } from "domain/core/failures/notification/notification";
import { IGetNotificationsResponse } from "domain/core/response/notificationsResponse";
import { NotificationRepository } from "infrastructure/repositories/notification/notificationRepository";

export default class NotificationUseCase {
  private _repository: NotificationRepository = new NotificationRepository();

  async getNotifications(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, source?: string | undefined; sourceId?: string | undefined; isDelete?: boolean | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetNotificationsResponse> {
    try {
      const response = await this._repository.getNotifications({ skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, isDelete: obj.isDelete, source: obj.source, sourceId: obj.sourceId, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNotification(notification: INotification): Promise<INotification> {
    try {
      const response = await this._repository.createNotification(notification);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editNotification(notification: INotification): Promise<INotification> {
    try {
      const response = await this._repository.editNotification(notification);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getNotificationById(notificationId: string): Promise<INotification> {
    try {
      const response = await this._repository.getNotificationById(notificationId);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteNotification(notificationId: string): Promise<string> {
    try {
      const response = await this._repository.deleteNotification(notificationId);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getNotificationLangById(notificationId: string, langCode: string): Promise<INotificationLang> {
    try {
      const response = await this._repository.getNotificationLangById(notificationId, langCode);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNotificationLang(notificationId: string, notificationLang: INotificationLang): Promise<INotificationLang> {
    try {
      const response = await this._repository.createNotificationLang(notificationId, notificationLang);

      if (response instanceof NotificationFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
