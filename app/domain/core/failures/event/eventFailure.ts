import { Failure } from "../failure";

export class EventFailure extends Failure {}

export const enum eventFailuresEnum {
  eventsNotFound = "EVENTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
