import { Failure } from "../failure";

export class NotificationFailure extends Failure {}

export const enum notificationFailuresEnum {
  notificationNotFound = "NOTIFICATIONS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
