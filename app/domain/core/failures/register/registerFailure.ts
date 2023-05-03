import { Failure } from "../failure";

export class RegisterFailure extends Failure {}

export const enum registerFailuresEnum {
  wrongPassword = "WRONG_PASSWORD",
  tooManyRequest = "TOO_MANY_REQUEST",
  serverError = "SERVER_ERROR",
  curpNotFound = "CURP_NOT_FOUND",
}
