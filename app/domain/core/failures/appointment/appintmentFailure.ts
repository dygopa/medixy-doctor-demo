import { Failure } from "../failure";

export class AppointmentFailure extends Failure {}

export const enum appointmentFailuresEnum {
  serverError = "SERVER_ERROR"
}
