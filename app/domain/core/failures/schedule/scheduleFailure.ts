import { Failure } from "../failure";

export class ScheduleFailure extends Failure {}

export const enum scheduleFailuresEnum {
  tooManyRequest = "TOO_MANY_REQUEST",
  serverError = "SERVER_ERROR",
}
