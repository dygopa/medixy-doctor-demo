import { Failure } from "../failure";

export class AuthFailure extends Failure {}

export const enum authFailuresEnum {
  wrongPassword = "WRONG_PASSWORD",
  tooManyRequest = "TOO_MANY_REQUEST",
  userNotFound = "INVALID_CREDENTIALS",
  badGateway = "BAD_GATEWAY",
  serverError = "SERVER_ERROR"
}
