import firebase from "firebase/app";
import { INotification } from "domain/core/entities/notificationEntity";

export function fromNotificationFirebaseMap(data: any): INotification {
  return {
    notificationId: data?.notificationId ?? "",
    action: data?.action ?? "",
    message: data?.message ?? "",
    source: data?.source ?? "",
    sourceId: data?.sourceId ?? "",
    trigger: data?.trigger ?? "",
    triggerValue: data?.triggerValue ?? 0,
    triggerMeasure: data?.triggerMeasure ?? "",
    status: data?.status ?? "",
    whom: data?.whom ?? "",
    fromWhere: data?.fromWhere ?? "",
    type: data?.type ?? "",
    endPoints: data?.endPoints ?? [],
    isDelete: data?.isDelete ?? false,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
  } as INotification;
}

export function fromNotificationFirebaseToDocumentData(notification: INotification): firebase.firestore.DocumentData {
  const documentData = {
    notificationId: notification.notificationId,
    action: notification.action,
    message: notification.message,
    source: notification.source,
    sourceId: notification.sourceId,
    trigger: notification.trigger,
    triggerValue: notification.triggerValue,
    triggerMeasure: notification.triggerMeasure,
    status: notification.status,
    whom: notification.whom,
    fromWhere: notification.fromWhere,
    type: notification.type,
    endPoints: notification.endPoints,
    isDelete: notification.isDelete,
    createdOn: notification.createdOn,
    updatedOn: notification.updatedOn,
  } as firebase.firestore.DocumentData;

  return documentData;
}
