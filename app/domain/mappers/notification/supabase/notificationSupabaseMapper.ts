import { INotification, INotificationLang } from "domain/core/entities/notificationEntity";

export function fromNotificationSupabaseMap(data: any): INotification {
  return {
    notificationId: data?.notificacionId ?? "",
    action: data?.accion ?? "",
    message: data?.mensaje ?? "",
    source: data?.fuente ?? "",
    sourceId: data?.fuenteId ?? "",
    trigger: data?.generar ?? "",
    triggerValue: data?.generarValor ?? 0,
    triggerMeasure: data?.generarMedida ?? "",
    status: data?.estado ?? "",
    whom: data?.aQuien ?? "",
    fromWhere: data?.aDonde ?? "",
    type: data?.tipo ?? "",
    isDelete: data?.eliminado ?? false,
    createdOn: data?.fechaCreacion ?? new Date(),
    updatedOn: data?.fechaActualizacion ?? new Date(),
  } as INotification;
}

export function fromNotificationSupabaseToDocumentData(notification: INotification): any {
  const documentData = {
    accion: notification.action,
    mensaje: notification.message,
    fuente: notification.source,
    fuenteId: notification.sourceId,
    generar: notification.trigger,
    generarValor: notification.triggerValue,
    generarMedida: notification.triggerMeasure,
    estado: notification.status,
    aQuien: notification.whom,
    aDonde: notification.fromWhere,
    tipo: notification.type,
    eliminacion: notification.isDelete,
    fechaCreacion: notification.createdOn,
    fechaActualizacion: notification.updatedOn,
  } as any;

  return documentData;
}

export function fromNotificationLangSupabaseMap(data: any): INotificationLang {
  return {
    langId: data?.lenguajeId ?? "",
    notificationId: data?.notificacionId,
    langCode: data?.lenguajeCodigo ?? "",
    message: data?.mensaje ?? "",
    createdAt: data?.fechaCreacion ?? null,
  } as INotificationLang;
}

export function fromNotificationLangSupabaseToDocumentData(notificationLang: INotificationLang): any {
  const documentData = {
    notificacionId: notificationLang.notificationId,
    lenguajeCodigo: notificationLang.langCode,
    mensaje: notificationLang.message,
    fechaCreacion: notificationLang.createdAt,
  } as any;

  return documentData;
}


