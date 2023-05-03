import { INotification, INotificationLang } from 'domain/core/entities/notificationEntity';
import { NotificationFailure, notificationFailuresEnum } from 'domain/core/failures/notification/notification';
import { IGetNotificationsResponse } from 'domain/core/response/notificationsResponse';
import { fromNotificationLangSupabaseMap, fromNotificationLangSupabaseToDocumentData, fromNotificationSupabaseMap, fromNotificationSupabaseToDocumentData } from 'domain/mappers/notification/supabase/notificationSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface INotificationRepository {
  getNotifications(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, source?: string | undefined; sourceId?: string | undefined; isDelete?: boolean | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetNotificationsResponse | NotificationFailure >;
  createNotification(notification: INotification): Promise<INotification | NotificationFailure >;
  getNotificationById(notificationId: string): Promise<INotification | NotificationFailure >;
  editNotification(notification: INotification): Promise<INotification | NotificationFailure >;
  deleteNotification(notificationId: string): Promise<string | NotificationFailure >;
  getNotificationLangById(notificationId: string, langCode: string): Promise<INotificationLang | NotificationFailure >;
  createNotificationLang(notificationId: string, notificationLang: INotificationLang): Promise<INotificationLang | NotificationFailure >;
}
  
export class NotificationRepository implements INotificationRepository {
  async getNotifications(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, source?: string | undefined; sourceId?: string | undefined; isDelete?: boolean | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetNotificationsResponse | NotificationFailure > {
    try {
        let query = supabase.from("NotificacionPlantilla").select();

        if (typeof obj.isDelete === "boolean") {
          query = query.eq("eliminado", obj.isDelete);
        }

        if (obj.source) {
          query = query.eq("fuente", obj.source);
        }

        if (obj.sourceId) {
          query = query.eq("fuenteId", obj.sourceId);
        }

        if (obj.sort) {
          query = query.order(obj.sort.field, {
            ascending: obj.sort.ascending
          });
        }

        if (obj.searchQuery) {
          query = query.textSearch("nombre", obj.searchQuery);
        }

        if (obj.country) {
          query = query.eq('pais', obj.country);
        }

        if (obj.startDate) {
          query = query.gte("fechaCreacion", obj.startDate.toISOString());
        }

        if (obj.endDate) {
          query = query.lte("fechaCreacion", obj.endDate.toISOString());
        }

        if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
        }
  
        if (obj.limit) {
          query = query.limit(obj.limit);
        }

        const snapshots = await query;

        const notifications: INotification[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          snapshots.data.forEach((snapshot: any) => {
            const programActivityNotificationMap: INotification = fromNotificationSupabaseMap(snapshot);

            notifications.push(programActivityNotificationMap);
          });
        }

        const response: IGetNotificationsResponse = {
            data: notifications,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
        }
  
        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }

  async createNotification(notification: INotification): Promise<INotification | NotificationFailure > {
    try {
        notification.createdOn = new Date();

        const notificationData = await supabase.from("NotificacionPlantilla").insert(fromNotificationSupabaseToDocumentData(notification)).select();

        notification.notificationId = notificationData?.data && notificationData.data[0]?.notificacionId ? notificationData.data[0].notificacionId : "";

        const notificationLang: INotificationLang = {
          langCode: "es",
          message: notification.message,
          createdAt: new Date(),
          langId: '',
          notificationId: notification.notificationId
        }

        await supabase.from("NotificacionPlantillaLenguaje").insert(fromNotificationLangSupabaseToDocumentData(notificationLang));

        return notification;
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }

  async editNotification(notification: INotification): Promise<INotification | NotificationFailure > {
    try {
      notification.updatedOn = new Date();

      await supabase.from("NotificacionPlantilla").update(fromNotificationSupabaseToDocumentData(notification)).match({ notificacionId: notification.notificationId });

      return notification;
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }

  async getNotificationById(notificationId: string): Promise<INotification | NotificationFailure > {
    try {
        const snapshot = await supabase.from("NotificacionPlantilla").select().eq("notificacionId", notificationId).limit(1);

        let notification: INotification = {} as INotification;

        if (snapshot.data && snapshot.data.length > 0) notification = fromNotificationSupabaseMap(snapshot.data[0]);

        return notification;
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }

  async deleteNotification(notificationId: string): Promise<string | NotificationFailure > {
    try {
        await supabase.from("NotificacionPlantilla").update({
          eliminado: true,
          fechaEliminacion: new Date(),
        }).match({ notificacionId: notificationId });

        return notificationId;
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }

  async getNotificationLangById(notificationId: string, langCode: string): Promise<INotificationLang | NotificationFailure > {
    try {
        const snapshots = await supabase.from("NotificacionPlantillaLenguaje").select().eq("notificacionId", notificationId).eq("lenguajeCodigo", langCode).limit(1);

        let notificationLang: INotificationLang = {} as INotificationLang;

        if (snapshots.data && snapshots.data.length > 0) notificationLang = fromNotificationLangSupabaseMap(snapshots.data[0]);

        return notificationLang;
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }

  async createNotificationLang(notificationId: string, notificationLang: INotificationLang): Promise<INotificationLang | NotificationFailure > {
    try {
        const snapshots = await supabase.from("NotificacionPlantillaLenguaje").select().eq("notificacionId", notificationId).eq("lenguajeCodigo", notificationLang.langCode).limit(1);

        notificationLang.createdAt = new Date();

        if (snapshots.data && snapshots.data.length > 0) {
          const notificationLangId = snapshots.data[0].lenguajeId;

          notificationLang.langId = notificationLangId;

          await supabase.from("NotificacionPlantillaLenguaje").update(fromNotificationLangSupabaseToDocumentData(notificationLang)).match({ notificationId: notificationId, langId: notificationLangId });
        } else {
          await supabase.from("NotificacionPlantillaLenguaje").insert(fromNotificationLangSupabaseToDocumentData(notificationLang));
        }
       
        return notificationLang;
    } catch (error) { 
      const exception = error as any;
      return new NotificationFailure(notificationFailuresEnum.serverError);
    }
  }
}
